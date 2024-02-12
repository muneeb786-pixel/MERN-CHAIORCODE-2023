import React, { useEffect, useState } from 'react'
import { Container, PostCard} from '../components'
import appWriteBlog from '../appwrite/blog'
import appwriteStorage from '../appwrite/storage'


function Home() {
  const [posts,setPosts] = useState([])

  useEffect(()=>{
    appWriteBlog.getPosts([]).then((posts)=>{
        if(posts ){
            setPosts(posts.documents)
        }
    })
  },[])

  if(posts.length === 0){
    return (
        <div className='flex flex-wrap'>
            <Container>
                <div className="p-2 w-full">
                    <h1 className="text-2xl">Login to read posts</h1>
                </div>
            </Container>
        </div>
    )
  }

    return (
    <div className='w-full h-full py-8'>
        <Container>
            <div className="flex flex-wrap">
                {
                    posts.map((post)=>{
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post}/>
                        </div>
                    })
                }
            </div>
        </Container>
    </div>
  )
}

export default Home