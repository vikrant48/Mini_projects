import React, { useEffect, useState } from 'react'

function useFetch(Url) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(Url)
        .then((res)=>res.json())
        .then((res)=>setData(res))
        .catch((error)=>setError(error.message))
      
    }, [Url])

    return {data, error}

}

export default useFetch