import React, { useState } from 'react'

function BG_color() {
    const [color, setcolor] = useState('gray')

    return (
        <>
            <div
                className={`element h-64 flex justify-center items-center rounded-lg shadow-lg`}
                style={{ backgroundColor: color }}
            >
                <div className="space-x-4">
                    <button
                        onClick={() => setcolor('red')}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                    >
                        Red
                    </button>
                    <button
                        onClick={() => setcolor('blue')}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                    >
                        Blue
                    </button>
                    <button
                        onClick={() => setcolor('yellow')}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
                    >
                        Yellow
                    </button>
                </div>
            </div>
        </>
    )
}

export default BG_color