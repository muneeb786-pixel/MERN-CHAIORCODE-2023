import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos:[
        {
            id:1,
            task: "Todo message",
            completed: false
        }
    ],
    addToDo:(todo)=>{},
    updateToDo: (id, todo)=>{},
    deleteTodo: (id)=>{},
    checkToggle: (id)=>{}
})

export const TodoProvider = TodoContext.Provider

export const useTodo = () => {
    return useContext(TodoContext);
}