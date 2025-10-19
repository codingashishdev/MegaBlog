import { useEffect, useState } from "react";
import { Container, PostCard, Button } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate } from 'react-router-dom';

function AllPosts() {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		let isMounted = true;

		const fetchPosts = async () => {
			setIsLoading(true);
			try {
				const response = await appwriteService.getAllPosts([]);
				if (isMounted && response) {
					// Fetch author information for each post
					const postsWithAuthors = await Promise.all(
						response.documents.map(async (post) => {
							const authorName = await appwriteService.getUserName(post.userId);
							return {
								...post,
								author: {
									name: authorName,
									initials: appwriteService.getInitials(authorName)
								}
							};
						})
					);
					setPosts(postsWithAuthors);
				}
			} catch (error) {
				console.error("Failed to load all posts", error);
				if (isMounted) {
					setPosts([]);
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		fetchPosts();

		return () => {
			isMounted = false;
		};
	}, []);

	if (isLoading) {
		return (
			<div className="w-full py-8">
				<Container>
					<div className="flex justify-center items-center min-h-[60vh]">
						<div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
					</div>
				</Container>
			</div>
		);
	}

	return (
		<div className="w-full py-8">
			<Container>
				<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 animate-fade-in">
					<div>
						<h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
							All Posts
						</h1>
						<p className="text-gray-600 mt-2">
							{posts.length} {posts.length === 1 ? 'post' : 'posts'} available
						</p>
					</div>
					<Button
						variant="gradient"
						onClick={() => navigate('/add-post')}
						className="shadow-lg hover:shadow-xl"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
						</svg>
						Create New Post
					</Button>
				</div>
				{posts.length === 0 ? (
					<div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in">
						<div className="text-center max-w-md">
							<div className="mb-6">
								<svg className="mx-auto h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
								</svg>
							</div>
							<h3 className="text-2xl font-semibold text-gray-900 mb-2">No posts yet</h3>
							<p className="text-gray-600 mb-6">Get started by creating your first blog post.</p>
							<Button
								variant="gradient"
								onClick={() => navigate('/add-post')}
								size="lg"
							>
								Create Your First Post
							</Button>
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
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
