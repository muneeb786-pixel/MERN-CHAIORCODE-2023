import React, { useEffect, useState } from 'react'
import { PostCard } from '../components'
import appwriteBlog from '../appwrite/blog'
import appwriteStorage from '../appwrite/storage'
import { Container } from '../components';
import { useSelector } from 'react-redux';

function AllPosts() {
    const storePost = useSelector(state=> state.posts)
    const [loading,setLoading] = useState(true)
    const [posts,setPosts] = useState([]);

    useEffect(()=>{
        // appwriteBlog.getPost([]).then((posts)=>{
        //     if(posts){
        //         setPosts(posts.documents)
        //         setLoading(false);
        //     }
        // })
        if(storePost) setPosts(storePost.posts)
        setLoading(false)
    },[storePost])

    if(loading) return <div className='h-screen flex items-center justify-center text-5xl font-medium'>...Loading</div>
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
            {
                posts.map((post)=>(
                    <div key={post.$id}  className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))
            }
            </div>
        </Container>
    </div>
  )
}

export default AllPosts