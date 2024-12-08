import React, { useCallback, useEffect, useRef, useState } from 'react'

function Password_generator() {
    const [length, setlength] = useState(8)
    const [ischar, setischar] = useState(false)
    const [isnum, setisnum] = useState(false)
    const [pass, setpass] = useState("")
    const passref = useRef(null)


    const passwordgenerator = useCallback(() => {
        let temppass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if (isnum) str += "0123456789"
        if (ischar) str += "!@#$%^&*-_+=[]{}~`"

        for (let i = 1; i <= length; i++) {
            let charindx = Math.floor(Math.random() * str.length + 1)
            temppass += str[charindx];
        }
        console.log(temppass)
        console.log(length)
        setpass(temppass)
    }, [length, ischar, isnum, setpass])

    useEffect(() => { passwordgenerator() }, [length, isnum, ischar, passwordgenerator])

    const copyclip = useCallback(() => {
        passref.current?.select()
        window.navigator.clipboard.writeText(pass)
    }, [pass])
    return (
        <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md max-w-md">
            <input
                type="text"
                value={pass}
                placeholder="password"
                readOnly
                ref={passref}
                className="w-full p-2 mb-4 border text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="space-y-4">
                <div className="flex items-center">
                    <input
                        type="range"
                        value={length}
                        min={6}
                        max={20}
                        onChange={(e) => {
                            setlength(e.target.value);
                        }}
                        className="w-full"
                    />
                    <label className="ml-2 text-gray-700">Length: {length}</label>
                </div>
                <div className="flex space-x-4 items-center">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            defaultChecked={isnum}
                            onChange={() => {
                                setisnum((prev) => !prev);
                            }}
                            className="mr-2"
                        />
                        <label className="text-gray-700">Number</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            defaultChecked={ischar}
                            onChange={() => {
                                setischar((prev) => !prev);
                            }}
                            className="mr-2"
                        />
                        <label className="text-gray-700">Character</label>
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-6">
                <button
                    onClick={passwordgenerator}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                >
                    Generate
                </button>
                <button
                    onClick={() => {
                        copyclip();
                        alert("Copied successfully!");
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
                >
                    Copy
                </button>
            </div>
        </div>
    )
}

export default Password_generator