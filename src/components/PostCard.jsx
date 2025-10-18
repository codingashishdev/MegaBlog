import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
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
        <Link to={`/post/${$id}`} className="block group animate-fade-in">
            <div className="h-full border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm 
                hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
                    <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {category && (
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 text-xs font-semibold rounded-full 
                                bg-white/90 backdrop-blur-sm shadow-md text-indigo-700
                                border border-white/20">
                                {category}
                            </span>
                        </div>
                    )}
                </div>
                
                <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-3 
                        group-hover:text-indigo-600 transition-colors duration-200">
                        {title}
                    </h3>
                    
                    {excerpt && (
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                            {excerpt}
                        </p>
                    )}
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 
                                flex items-center justify-center text-xs font-semibold text-white shadow-md">
                                {author.initials}
                            </div>
                            <span className="text-sm font-medium text-gray-700">{author.name}</span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            {formattedDate && (
                                <div className="flex items-center text-xs text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    <span>{formattedDate}</span>
                                </div>
                            )}
                            
                            <div className="flex items-center text-xs text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                <span>{readTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

PostCard.propTypes = {
    $id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    featuredImage: PropTypes.string.isRequired,
    content: PropTypes.string,
    author: PropTypes.shape({
        name: PropTypes.string,
        initials: PropTypes.string,
    }),
    category: PropTypes.string,
    createdAt: PropTypes.string,
    readTime: PropTypes.string,
}

export default PostCard