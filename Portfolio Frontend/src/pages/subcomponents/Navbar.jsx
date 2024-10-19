import React from 'react'

const Navbar = () => {
  return (
    <div className=' h-10 w-full  text-black flex mt-8 gap-5 sm:justify-end justify-center  '>





       <div className='  flex  items-center sm:gap-10  gap-4  text-white'>
        <a className='border p-1 rounded-md font-serif hover:bg-cyan-500 shadow-md shadow-cyan-700 ' href="#about">About</a>
        <a className='border p-1 rounded-md font-serif hover:bg-cyan-500 shadow-md shadow-cyan-700 ' href="#skills">  Skills</a>
        <a className='border p-1 rounded-md font-serif hover:bg-cyan-500 shadow-md shadow-cyan-700 ' href="#projects">Projects</a>
        <a className='border p-1 rounded-md font-serif hover:bg-cyan-500 shadow-md shadow-cyan-700 ' href="#contact">Contact</a>
        
        </div>
        


        


    </div>
  )
}

export default Navbar