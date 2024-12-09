import React, { useState } from "react";

function MovieApp() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const API_KEY = "31bde5d1";

    const fetchMovies = async (searchQuery) => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`);
            const data = await response.json();

            if (data.Response === "True") {
                setMovies(data.Search);
                setError("");
                setIsSearchVisible(true);
            } else {
                setError(data.Error);
                setMovies([]);
            }
        } catch (err) {
            console.error("Error fetching movies:", err);
            setError("Something went wrong!");
        }
    };

    const fetchMovieDetails = async (movieId) => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`);
            const data = await response.json();
            setSelectedMovie(data);
        } catch (err) {
            console.error("Error fetching movie details:", err);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            fetchMovies(query);
        }
    };

    const closeSearch = () => {
        setIsSearchVisible(false);
        setMovies([]);
        setError("");
    };

    const closeDetailsModal = () => {
        setSelectedMovie(null);
    };

    return (
        <div className="min-h-0 bg-gray-200 rounded-lg p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">Search Your Movies</h1>
            <form onSubmit={handleSearch} className="flex justify-center">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-2/3 sm:w-1/2 p-2 border text-gray-800 border-gray-300 rounded-l-lg focus:outline-none focus:ring-2"
                />
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 rounded-r-lg hover:bg-indigo-700"
                >
                    Search
                </button>
            </form>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            {isSearchVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex flex-col p-4 overflow-y-auto">
                    <button
                        onClick={closeSearch}
                        className="self-end mb-4 text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                    >
                        Close
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {movies.map((movie) => (
                            <div
                                key={movie.imdbID}
                                className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
                                onClick={() => fetchMovieDetails(movie.imdbID)}
                            >
                                <img
                                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
                                    alt={movie.Title}
                                    className=" px-20 w-120 h-80 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-bold">{movie.Title}</h3>
                                    <p className="text-gray-700">Year: {movie.Year}</p>
                                    <p className="text-gray-700">Type: {movie.Type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedMovie && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
                    onClick={closeDetailsModal}
                >
                    <div
                        className="bg-gray-300 p-4 rounded-lg max-w-md w-full relative sm:mx-4 max-h-[90vh] flex flex-col justify-between"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeDetailsModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-center">{selectedMovie.Title}</h2>
                        <div className="space-y-2 text-sm overflow-hidden px-2">
                            <p><strong>Released:</strong> {selectedMovie.Released}</p>
                            <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
                            <p><strong>Director:</strong> {selectedMovie.Director}</p>
                            <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
                            <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
                            <p><strong>imdbRating:</strong>{selectedMovie.imdbRating}</p>
                            <p><strong>BoxOffice:</strong>{selectedMovie.BoxOffice}</p>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}

export default MovieApp;
