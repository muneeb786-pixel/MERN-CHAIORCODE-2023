import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

function MyApp() {
  return (
    <h1>chai or react with vite | muneeb ur rehman | from myapp</h1>
  )
}

// add react element

// const reactElement = {
//   type : "a",
//   props : {
//       href:"https://google.com",
//       target:'_blank',
//   },
//   children:'click me to visit google'
// }

const reactElement = (
  <a href="https://google.com">visit google</a>
)

// pass variable

const username="Munib Ehman"

// const customReactElement = React.createElement('a',{
//   'href':'https://google.com',
//   'target':"_blank"
// },'visit google',username);

ReactDOM.createRoot(document.getElementById('root')).render(
  // customReactElement
  <App/>
)
