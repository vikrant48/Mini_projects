import { useState } from 'react'
import './App.css'
import Git_detail from './Components/Git_detail';
import CustomHook_use from './Components/CustomHook_use';
import Date_time from './Components/Date_time';
import Password_generator from './Components/Password_generator';
import BG_color from './Components/BG_color';

function App() {
  const [selectoption, setSelectoption] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const options = [
    { name: 'youtube', url: 'https://www.youtube.com/' },
    { name: 'facebook', url: 'https://www.facebook.com/' }
  ]

  const handleopt = (e) => {
    const optvalue = e.target.value;

    setSelectoption(optvalue);

    if (optvalue) {
      window.open(optvalue, '_blank')
    }

  }

  return (
    <div className={darkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-gray-100 text-gray-900 min-h-screen'}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Mini Project Ideas</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white dark:bg-gray-500 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Dark/Light Mode</h2>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {darkMode ? 'Light' : 'Dark'} Mode
            </button>
          </div>

          {/* <div className="bg-white dark:bg-gray-500 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Future Project</h2>
            <p className="text-sm">This card is reserved for your upcoming mini project ideas.</p>
          </div> */}

          <div className="bg-white dark:bg-gray-500 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">API Fetch</h2>
            <Git_detail />
          </div>

          <div className="bg-white dark:bg-gray-500 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Custom HOOK</h2>
            <CustomHook_use />
          </div>

          <div className="bg-white dark:bg-gray-500 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Website Selector</h2>
            <select
              onChange={handleopt}
              value={selectoption}
              className="w-full p-2 border rounded-lg bg-white text-gray-900 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" className="text-gray-500">-- Select Option --</option>
              {options.map((paper, indx) => (
                <option key={indx} value={paper.url} className="text-gray-900 dark:text-white">
                  {paper.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white dark:bg-gray-500 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Date & Time</h2>
            <Date_time />
          </div>


          <div className="bg-white dark:bg-gray-500 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Future Project</h2>
            <p className="text-sm">This card is reserved for your upcoming mini project ideas.</p>
          </div>

          <div className="bg-white dark:bg-gray-500 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Password generator</h2>
            <Password_generator />
          </div>

          <div className="bg-white dark:bg-gray-500 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">bg-color</h2>
            <BG_color />
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
