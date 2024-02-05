import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';

function CreateTodo() {
  const [input,setInput] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(input);
    dispatch(addTodo(input));
    setInput('')
  }
  return (
    <>
      <form onSubmit={handleSubmit} >
        <input value={input} onChange={e=>setInput(e.target.value)} type="text" name="" id="" />
        <button type='submit'>Add</button>
      </form>
    </>
  )
}

export default CreateTodo