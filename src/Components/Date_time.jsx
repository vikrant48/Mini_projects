import React, { useEffect, useState } from 'react'

function Date_time() {
  const [date, setDate] = useState(new Date());

  const formetedDate = () => {
    const option = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }
    return date.toLocaleDateString('en-us', option)
  }

  const formetTime = (date)=>{
    const hour = date.getHours().toString().padStart(2, '0')
    const Minute = date.getMinutes().toString().padStart(2, '0')
    const second = date.getSeconds().toString().padStart(2, '0')

    return `${hour} : ${Minute}: ${second}`
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
     setDate(new Date()) 
    }, 1000)

    return ()=>clearInterval(interval)
  },[])
  return (
    <div  className='px-4 py-2 bg-gray-100 rounded-lg text-lg font-semibold text-gray-900' >{formetedDate()} | {formetTime(date)}</div>
  )
}

export default Date_time