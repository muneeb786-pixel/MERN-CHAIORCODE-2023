import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwrite from '../appwrite/blog'
import appwriteStorage from '../appwrite/storage'
import { Button,Container } from '../components'
import parse from 'html-react-parser'
import { removePost } from '../store/postSlice'

function Post() {
    const [post,setPost] = useState(null)
    const [loading,setLoading] = useState(true)
    const {slug} = useParams()
    
    const navigate = useNavigate()
    const userData = useSelector(state=> state.auth.userData);
    const dispatch = useDispatch();
    
    const isAuthor =  post && userData ? userData.$id === post.userId : false;

    useEffect(()=>{
        if(slug){
            appwrite.getPost(slug).then((post)=>{
                setLoading(false)
                if(post) setPost(post);
                else navigate('/');
            })
        }
        else navigate('/');
    },[slug,navigate]);

    const deletPost = ()=>{
        appwrite.deleteBlog(post.$id).then((status)=>{
            if(status){
                appwriteStorage.deleteFile(post.featuredImage);
                dispatch(removePost(post.$id))
                navigate('/all-posts')
            }
        })
    }

    if(loading) return <div className='h-screen flex items-center justify-center text-5xl font-medium'>...Loading</div>

    return post && (
        <div className='py-8'>
            <Container>
                <div className="w-full flex justify-centern mb-4 relative border rounded-xl p-2">
                    <img 
                    src={appwriteStorage.getFilePreview(post.featuredImage)} 
                    alt={post.title} 
                    className='rounded-xl'
                    />
                {
                    isAuthor && (
                        <div className='absolute right-6 top-6'>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className='mr-3' bgColor='bg-green-500'>
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor='bg-red-500' onClick={deletPost}>
                                Delete
                            </Button>
                        </div>
                    )
                }
                </div>
                <div className='w-full mb-6'>
                    <h1 className='text-2xl font-bold'>{post.title}</h1>
                </div>
                <div className='browser-css'>
                    {parse(post.content) }
                </div>
            </Container>
        </div>
    )
}

export default Post