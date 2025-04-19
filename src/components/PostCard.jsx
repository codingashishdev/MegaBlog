import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from "../appwrite/config"

function PostCard({ 
    $id,
    title,
    featuredImage,
    content,
    author = { name: "Anonymous", initials: "AN" },
    category = "Blog",
    createdAt,
    readTime = "3 min read"
}) {
    // Format date if provided
    const formattedDate = createdAt 
        ? new Date(createdAt).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        }) 
        : null;
    
    // Create a short excerpt from content if available
    const excerpt = content 
        ? content.replace(/<[^>]*>/g, '').substring(0, 120) + (content.length > 120 ? '...' : '') 
        : null;

    return (
        <Link to={`/post/${$id}`} className="block transition-all hover:scale-[1.01] duration-200">
            <div className="h-full border border-gray-200 rounded-xl overflow-hidden bg-white shadow hover:shadow-md">
                <div className="relative h-48 overflow-hidden">
                    <img
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                    />
                    {category && (
                        <div className="absolute top-3 left-3">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/80 backdrop-blur-sm">
                                {category}
                            </span>
                        </div>
                    )}
                </div>
                
                <div className="p-4 pb-2">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{title}</h3>
                </div>
                
                <div className="p-4 pt-0">
                    {excerpt && (
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                            {excerpt}
                        </p>
                    )}
                </div>
                
                <div className="p-4 pt-0 flex items-center justify-between border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                        <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                            {author.initials}
                        </div>
                        <span className="text-xs text-gray-600">{author.name}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        {formattedDate && (
                            <div className="flex items-center text-xs text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                <span>{formattedDate}</span>
                            </div>
                        )}
                        
                        <div className="flex items-center text-xs text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span>{readTime}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard