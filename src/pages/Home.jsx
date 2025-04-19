import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard, Button} from '../components'
import { useNavigate } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true)
        appwriteService.getAllPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setIsLoading(false)
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4">
                <Container>
                    {/* Modern Hero Section */}
                    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl">
                        <div className="absolute inset-0">
                            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pattern" width="200" height="200" x="50%" y="50%"
                                        patternUnits="userSpaceOnUse" patternTransform="translate(-100 0)">
                                        <path d="M.5 200V.5H200" fill="none" stroke="rgba(255,255,255,.1)" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pattern)" />
                            </svg>
                        </div>
                        <div className="relative px-8 py-16 sm:px-16 sm:py-24 lg:py-32 lg:px-32 flex flex-col items-center text-center">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                Welcome to MegaBlog
                            </h1>
                            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
                                Share your thoughts, discover amazing stories, and connect with writers from around the world. Join our growing community of bloggers today!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button 
                                    onClick={() => navigate('/login')}
                                    variant="default"
                                    size="lg"
                                    className="shadow-lg"
                                >
                                    Login
                                </Button>
                                <Button 
                                    onClick={() => navigate('/signup')}
                                    variant="outline"
                                    size="lg"
                                    className="bg-white/10 border-white text-white hover:bg-white/20"
                                >
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-xl shadow">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Create & Share</h3>
                            <p className="text-gray-600">Write and publish posts on topics you're passionate about</p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Connect</h3>
                            <p className="text-gray-600">Join a community of writers and readers</p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Discover</h3>
                            <p className="text-gray-600">Read trending posts from various categories</p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else{
        return (
            <div className='w-full py-8'>
                <Container>
                    {/* Featured post section */}
                    {posts.length > 0 && (
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold mb-6 text-gray-800">Featured Post</h2>
                            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                                <div className="md:flex">
                                    <div className="md:flex-shrink-0 md:w-1/2">
                                        <img 
                                            className="h-64 w-full object-cover md:h-full" 
                                            src={appwriteService.getFilePreview(posts[0].featuredImage)} 
                                            alt={posts[0].title}
                                        />
                                    </div>
                                    <div className="p-8 md:w-1/2">
                                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                            Featured
                                        </div>
                                        <h3 className="mt-2 text-2xl font-bold text-gray-900">{posts[0].title}</h3>
                                        <p className="mt-4 text-gray-600">
                                            {posts[0].content && posts[0].content.replace(/<[^>]*>/g, '').substring(0, 200) + '...'}
                                        </p>
                                        <div className="mt-6">
                                            <Button 
                                                onClick={() => navigate(`/post/${posts[0].$id}`)}
                                                variant="default"
                                                size="default"
                                            >
                                                Read More
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Latest posts grid */}
                    <div>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800">Latest Posts</h2>
                            <Button 
                                onClick={() => navigate('/all-posts')}
                                variant="outline"
                            >
                                View All
                            </Button>
                        </div>
                        
                        {isLoading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                                {posts.map((post) => (
                                    <div key={post.$id}>
                                        <PostCard {...post} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home