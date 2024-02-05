# Reactjs Course


# Redux toolkit notes 
1- redux core lib
2-react-redux wiring btw react and redux
  first step
-create store (single source of truth) 
   mostly have one store
   configureStore
   alway create reducer and add into configureStore

- features are called slice in redux

feature/todo/todoSlice.js

    top create stice we use createSlice method from readuc/toolkit
    it contain 3 main parameters
    1-name
    2-initialState
    3-reducers
     object have key value funnctions with defination 
     function have two bydefault paramters
     state and action 
     state have update value in stores
     action to get payload mean data pass in function during call
     export each method in reducer from <your slice>.action
     export main reducer as well

custom components
    two method given my redux/toolkit
    useSelector and useDispatch

    const dispatch =  useDispatch(accept reducer function we export)

    const todos = useSelector(state => state.todos) return an object or store data