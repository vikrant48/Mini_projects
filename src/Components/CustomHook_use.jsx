import React, { useState } from 'react'
import useFetch from '../Custom_Hook/useFetch';

function CustomHook_use() {
    const [username, setUsername] = useState('');
    const [submitedusename, setSubmitedusername] = useState('')
    const [isshow, setIsshow] = useState(false);


    const handleuserinput = (e) => {
        setUsername(e.target.value)
    }

    const toggle = () => {
        setIsshow(!isshow);
        // if (!isshow) {
        //     const Url = `https://api.github.com/users/${username}`;
        //     const { data, error } = useFetch(Url);
        // }
    }

    const Url = `https://api.github.com/users/${username}`;
    const { data, error } = useFetch(Url);




    return (
        <div>
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    name="username"
                    placeholder="Enter GitHub Username"
                    onChange={handleuserinput}
                    value={username}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    className="px-4 py-2 rounded-lg text-base-100 text-white bg-indigo-600 hover:bg-orange-600"
                    onClick={toggle}
                >
                    Submit
                </button>
            </div>
            {isshow && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={toggle}
                >
                    <div
                        className="bg-gray-600 rounded-lg p-6 shadow-lg w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={toggle}
                            className="absolute top-2 right-2 text-white bg-red-500 rounded-full px-3 py-1 hover:bg-red-600"
                        >
                            close
                        </button>

                        {error && <p className="text-red-500">Error: {error}</p>}

                        {data ? (
                            <div>
                                <h2 className="text-xl font-bold mb-4">GitHub User Info</h2>
                                <p><strong>Name:</strong>{data.name}</p>
                                <p><strong>Username:</strong> {data.login}</p>
                                <p><strong>Followers:</strong>{data.followers}</p>
                                <p><strong>URL:</strong><a href={data.html_url} target='_blank'>{data.html_url}</a></p>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            )}

        </div>
    )
}

export default CustomHook_use