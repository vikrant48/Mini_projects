import React, { useState } from 'react';

const TicToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerX, setIsPlayerX] = useState(true);
  const [isBotMode, setIsBotMode] = useState(false);
  const [status, setStatus] = useState("Choose mode to start!");
  const [gameOver, setGameOver] = useState(false);

  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  const checkWinner = (b) => {
    for (let [a,bIdx,c] of lines) {
      if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) return b[a];
    }
    return b.every(cell => cell) ? "Draw" : null;
  };

  const handleMove = (i) => {
    if (board[i] || gameOver) return;

    const newBoard = [...board];
    newBoard[i] = isPlayerX ? "X" : "O";
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setGameOver(true);
      setStatus(result === "Draw" ? "It's a Draw!" : `${result} wins!`);
    } else {
      setIsPlayerX(!isPlayerX);
      if (isBotMode && !isPlayerX) {
        setTimeout(() => botMove(newBoard), 300);
      } else {
        setStatus(`${isPlayerX ? 'O' : 'X'}'s Turn`);
      }
    }
  };

  const minimax = (b, isMaximizing) => {
    const winner = checkWinner(b);
    if (winner === "O") return { score: 1 };
    if (winner === "X") return { score: -1 };
    if (winner === "Draw") return { score: 0 };

    const moves = [];

    b.forEach((cell, i) => {
      if (!cell) {
        const newBoard = [...b];
        newBoard[i] = isMaximizing ? "O" : "X";
        const result = minimax(newBoard, !isMaximizing);
        moves.push({ index: i, score: result.score });
      }
    });

    return isMaximizing
      ? moves.reduce((best, m) => (m.score > best.score ? m : best))
      : moves.reduce((best, m) => (m.score < best.score ? m : best));
  };

  const botMove = (b) => {
    const best = minimax(b, true);
    handleMove(best.index);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerX(true);
    setGameOver(false);
    setStatus(isBotMode ? "You are X, Bot is O" : "Player X's Turn");
  };

  const startGame = (mode) => {
    setIsBotMode(mode === "bot");
    setStatus(mode === "bot" ? "You are X, Bot is O" : "Player X's Turn");
    resetGame();
  };

  return (
    <div className="flex flex-col items-center p-4 text-center font-sans">
      <h1 className="text-2xl font-bold mb-4">Tic Tac Toe (with AI)</h1>
      
      <div className="mb-4 space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => startGame("2p")}
        >
          Two Player
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => startGame("bot")}
        >
          Play with Bot
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 w-48 mb-4">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleMove(i)}
            className="w-16 h-16 text-2xl font-bold border bg-white hover:bg-gray-100"
          >
            {cell}
          </button>
        ))}
      </div>

      <p className="mb-4 font-semibold">{status}</p>
      <button
        onClick={resetGame}
        className="bg-gray-500 text-white px-4 py-1 rounded"
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicToe;
