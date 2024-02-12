import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Protected from './components/Protected.jsx'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AllPosts from './pages/AllPosts'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'
import Post from './pages/Post'

const router= createBrowserRouter([{
  path:"/",
  element: <App/>,
  children:[
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/login",
      element:(
        <Protected authenticated={false}>
          <Login/>
        </Protected>
      )
    },
    {
      path:'/signup',
      element:(
        <Protected authenticated={false}>
           <Signup/>
        </Protected>
      )
    },
    {
      path:'/all-posts',
      element:(
        <Protected authenticated={true}>
           <AllPosts/>
        </Protected>
      )
    },
    {
      path:'/add-post',
      element:(
        <Protected authenticated={true}>
           <AddPost/>
        </Protected>
      )
    },
    {
      path:'/edit-post/:slug',
      element:(
        <Protected authenticated={true}>
           <EditPost/>
        </Protected>
      )
    },
    {
      path:'/post/:slug',
      element:(
        <Protected authenticated={true}>
           <Post/>
        </Protected>
      )
    },
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
