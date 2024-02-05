import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos:[{
        id:1,
        text:"this is initial todos"
    }]
}

export const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo : (state,action)=>{
            const todo = {
                id:nanoid(),
                text:action.payload
            }
            state.todos.push(todo);
        },
        updateTodo : (state,action)=>{
            state.todos = state.todos.map(todo=>{
                if(todo.id===action.payload.id){
                    todo.text=action.payload.text
                }
            })
        },
        removeTodo : (state, action)=>{
            state.todos = state.todos.filter(state=> state.id!==action.payload)
        }
    }
})


export const {addTodo,removeTodo} = todoSlice.actions;
export default todoSlice.reducer;