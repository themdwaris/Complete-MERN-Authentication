import React from 'react'
import Todo from '../components/Todo'
import Navbar from '../components/Navbar'


const TodoSection = () => {


  return (
    <div className='relative min-h-screen bg-gradient-to-r from-slate-950 to-slate-800'>
      <div className="w-full px-5 sm:px-8 md:px-14 lg:px-32">
        <Navbar/>
         <Todo/>
      </div>
    </div>
  )
}

export default TodoSection