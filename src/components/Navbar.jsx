import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex justify-between bg-indigo-900 py-3 text-white'>
        <div className="logo">
            <span className='font-bold text-xl mx-6'>iTask</span>
        </div>
        <ul className='flex gap-8 mx-9'>
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
            
        </ul>
      </nav>
    </div>
  )
}

export default Navbar