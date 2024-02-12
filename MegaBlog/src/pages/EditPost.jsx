import React, { useEffect, useState } from 'react'
import {Container, PostForm} from '../components'
import appwriteBlog from '../appwrite/blog'
import appwriteStorage from '../appwrite/storage'
import { useNavigate, useParams } from 'react-router-dom'


function EditPost() {
    const [post,setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            appwriteBlog.getPost(slug).then((post)=>{
                setPost(post)
            })
        }
        else{
            navigate('/')
        }
    },[slug,navigate])
  
    return post ? 
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
    : null;
}

export default EditPost