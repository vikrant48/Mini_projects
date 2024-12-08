import React, { useState } from 'react'


function Git_detail() {

  const [isshow, setIsshow] = useState(false);
  const [data, setData] = useState(null)

  const fetchdata = async () => {
    try {
      const responce = await fetch('https://api.github.com/users/vikrant48');
      const res_data = await responce.json();

      setData(res_data);

    } catch (error) {
      console.log('error is ', error)
    }
  }

  const toggle = async () => {
    if (!isshow) {
      await fetchdata();
    }

    setIsshow(!isshow);


  }
  return (
    <div>
      <button className='px-4 py-2 rounded-lg text-base-100 text-white bg-indigo-600 hover:bg-orange-600 ' onClick={toggle}>Git Info</button>
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

export default Git_detail