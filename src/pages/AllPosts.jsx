import React, { useEffect, useState } from "react";
import { Container, PostCard, Button } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(async () => {
        appwriteService.getAllPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
            else{
                <div>
                    <h1>No posts</h1>
                </div>
            }
        });
    }, []);

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-semibold">All Posts</h1>
                    <Button 
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => navigate('/add-post')}
                    >
                        Add Post
                    </Button>
                </div>
                {posts.length === 0 ? (
                    <p className="text-center text-gray-600">No posts available.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;
