import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setPosts] = useState(null)
    const navigate = useNavigate()
    const { slug } = useParams()

    useEffect( () => {
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    setPosts(post)
                }
            })
        }
        else{
            navigate('/')            
        }
    }, [slug, navigate])

    return (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    )
}

export default EditPost
