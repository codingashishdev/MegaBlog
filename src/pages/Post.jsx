import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import { removePost } from "../store/postSlice";

export default function Post() {
	const [post, setPost] = useState(null);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const { slug } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.auth.userData);

	const isAuthor = post && userData ? post["userId"] === userData.$id : false;

	useEffect(() => {
		if (slug) {
			appwriteService.getPost(slug).then((post) => {
				if (post) {
					setPost(post);
				} else {
					navigate("/");
				}
			});
		} else navigate("/");
	}, [slug, navigate]);

	const deletePost = async () => {
		await appwriteService.deletePost(post.$id).then((status) => {
			if (status) {
				appwriteService.deleteFile(post.featuredImage);
				dispatch(removePost(slug));
				navigate("/");
			}
		});
	};

	if (!post) {
		return (
			<div className="py-8">
				<Container>
					<div className="flex justify-center items-center min-h-[60vh]">
						<div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
					</div>
				</Container>
			</div>
		);
	}

	return (
		<div className="py-8 animate-fade-in">
			<Container>
				<article className="max-w-4xl mx-auto">
					{/* Featured Image */}
					<div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl group">
						<img
							src={appwriteService.getFilePreview(post.featuredImage)}
							alt={post.title}
							className="w-full h-[400px] object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

						{isAuthor && (
							<div className="absolute top-6 right-6 flex gap-3">
								<Link to={`/edit-post/${post.$id}`}>
									<Button
										variant="secondary"
										className="bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg"
									>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
											<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
										</svg>
										Edit
									</Button>
								</Link>
								<Button
									variant="destructive"
									onClick={() => setShowDeleteConfirm(true)}
									className="shadow-lg"
								>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
									</svg>
									Delete
								</Button>
							</div>
						)}
					</div>

					{/* Post Header */}
					<header className="mb-8">
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
							{post.title}
						</h1>
						<div className="flex items-center gap-4 text-gray-600">
							<div className="flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
									<path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
								</svg>
								<span className="font-medium">Author</span>
							</div>
							<div className="flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
									<path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
								</svg>
								<span>{new Date(post.$createdAt).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}</span>
							</div>
						</div>
					</header>

					{/* Post Content */}
					<div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
						<div className="browser-css">
							{parse(post.content)}
						</div>
					</div>

					{/* Delete Confirmation Modal */}
					{showDeleteConfirm && (
						<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
							<div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
								<h3 className="text-xl font-bold text-gray-900 mb-2">Delete Post?</h3>
								<p className="text-gray-600 mb-6">
									Are you sure you want to delete this post? This action cannot be undone.
								</p>
								<div className="flex gap-3 justify-end">
									<Button
										variant="outline"
										onClick={() => setShowDeleteConfirm(false)}
									>
										Cancel
									</Button>
									<Button
										variant="destructive"
										onClick={() => {
											setShowDeleteConfirm(false);
											deletePost();
										}}
									>
										Delete Post
									</Button>
								</div>
							</div>
						</div>
					)}
				</article>
			</Container>
		</div>
	);
}
