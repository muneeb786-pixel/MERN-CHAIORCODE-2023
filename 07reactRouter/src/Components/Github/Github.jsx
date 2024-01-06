import React from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
    const data = useLoaderData();
    console.log(data);
  return (
    <div className='flex flex-col max-w-screen-xl mx-auto gap-y-10 my-5'>
        <div className='flex flex-wrap items-center justify-between w-full'>
            <h1 className='text-4xl font-bold sm:text-5xl'>GitHub </h1>
            <h1 className='font-bold text-orange-700'>{data.name}</h1>
            <h1 className='text-base font-semibold text-gray-600'>Followers:{data.followers}</h1>
        </div>
        <div className='flex flex-col space-y-2'>
            <img src={data.avatar_url} className="w-24 h-24 rounded border-2 border-orange-700 object-cover" alt="" />
            <span className='text-sm text-gray-500'>{data.location}</span>
        </div>
    </div>
  )
}
export default Github

export const githubLoader= async() => {
    const response = await fetch('https://api.github.com/users/munib-ehman')
    return response;
}