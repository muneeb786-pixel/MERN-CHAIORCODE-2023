import { useDispatch } from 'react-redux';
import './App.css'
import authService from './appwrite/auth'
import authServiceBlog from './appwrite/blog'
import { useEffect,useState } from 'react';
import { login,logout} from './store/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom';
import { addPost, initPosts } from './store/postSlice';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    }).catch(error=>{
      console.log(error);
    })
    .finally(()=>{
      setLoading(false)
    })
    authServiceBlog.getPosts([]).then((posts)=>{
      if(posts){
        dispatch(initPosts(posts.documents))
      }else{
        dispatch(initPosts([]))
      }
    }).catch((error)=>{
      console.log(error);
    })
  },[])

  return !loading ? (
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full'>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  </div>) : (null);
}

export default App