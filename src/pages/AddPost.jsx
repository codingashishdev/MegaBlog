import React from 'react'
import { Container, PostForm } from "../components"

function AddPost() {
    return (
        <div className='py-8'>
            <Container>
                <h1 className="text-3xl font-semibold mb-6">Add New Post</h1>
                <div className="bg-white p-4 rounded-lg shadow">
                    <PostForm />
                </div>
            </Container>
        </div>
    )
}

export default AddPost