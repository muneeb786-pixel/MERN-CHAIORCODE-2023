import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTodo } from '../features/todo/todoSlice';

function Todos() {
    const dispatch = useDispatch()
    const todos = useSelector(state=>state.todos);
  return (
    <>
    {
        todos.map(todo=>(
            <div key={todo.id}>
                {todo.text}
            <button onClick={()=>dispatch(removeTodo(todo.id))}>remove</button>
            </div>
        ))
    }
    </>
  )
}

export default Todos