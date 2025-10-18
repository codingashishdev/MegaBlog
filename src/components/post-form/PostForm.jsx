import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addPost, updatePost } from "../../store/postSlice";

export default function PostForm({ post }) {
	const { register, handleSubmit, watch, setValue, control, getValues } =
		useForm({
			defaultValues: {
				title: post?.title || "",
				slug: post?.$id || "",
				content: post?.content || "",
				status: post?.status || "active",
			},
		});

	const navigate = useNavigate();
	const dispatch = useDispatch()
	const userData = useSelector((state) => state.auth.userData);
	const [error, setError] = useState("");

	const submit = async (data) => {
		try {
			if (post) {
				// Handle update
				const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
				if (file && !file.$id) {
					throw new Error("File upload failed: Invalid response from Appwrite.");
				}
				if (file) {
					await appwriteService.deleteFile(post.featuredImage);
				}
				const dbPost = await appwriteService.updatePost(post.$id, {
					...data,
					featuredImage: file ? file.$id : undefined,
				});
				if (!dbPost || !dbPost.$id) {
					throw new Error("Post update failed: Invalid response from Appwrite.");
				}
				dispatch(updatePost(dbPost));
				navigate(`/post/${dbPost.$id}`);
			} else {
				// Handle create
				const file = await appwriteService.uploadFile(data.image[0]);
				if (!file || !file.$id) {
					throw new Error("File upload failed: Invalid response from Appwrite.");
				}
				const fileId = file.$id;
				data.featuredImage = fileId;
				const dbPost = await appwriteService.createPost({
					...data,
					userId: userData.$id,
				});
				if (!dbPost || !dbPost.$id) {
					throw new Error("Post creation failed: Invalid response from Appwrite.");
				}
				dispatch(addPost(dbPost));
				navigate(`/post/${dbPost.$id}`);
			}
		} catch (error) {
			console.error("Error in post submission:", error);
			setError("Failed to save post. Please try again.");
		}
	};

	const slugTransform = useCallback((value) => {
		if (value && typeof value === "string")
			return value
				.trim()
				.toLowerCase()
				.replace(/[^a-zA-Z0-9]+/g, "-")
				.replace(/^-+|-+$/g, "");

		return "";
	}, []);

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === "title") {
				setValue("slug", slugTransform(value.title), {
					shouldValidate: true,
				});
			}
		});

		return () => subscription.unsubscribe();
	}, [watch, slugTransform, setValue]);

	return (
		<div className="animate-fade-in">
			{error && (
				<div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
					{error}
				</div>
			)}
			<form onSubmit={handleSubmit(submit)} className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Main Content Section */}
					<div className="lg:col-span-2 space-y-6">
						<div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
									<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
								</svg>
								Post Details
							</h2>
							<div className="space-y-5">
								<Input
									label="Title"
									placeholder="Enter your post title"
									{...register("title", { required: true })}
								/>
								<Input
									label="Slug"
									placeholder="post-url-slug"
									{...register("slug", { required: true })}
									onInput={(e) => {
										setValue(
											"slug",
											slugTransform(e.currentTarget.value),
											{
												shouldValidate: true,
											}
										);
									}}
								/>
							</div>
						</div>

						<div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
									<path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
								</svg>
								Content
							</h2>
							<RTE
								label=""
								name="content"
								control={control}
								defaultValue={getValues("content")}
							/>
						</div>
					</div>

					{/* Sidebar Section */}
					<div className="lg:col-span-1 space-y-6">
						<div className="bg-white rounded-2xl shadow-lg p-6">
							<h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
									<path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
								</svg>
								Featured Image
							</h3>
							<Input
								label=""
								type="file"
								accept="image/png, image/jpg, image/jpeg, image/gif"
								{...register("image", { required: !post })}
							/>
							{post && (
								<div className="mt-4 rounded-xl overflow-hidden shadow-md">
									<img
										src={appwriteService.getFilePreview(
											post.featuredImage
										)}
										alt={post.title}
										className="w-full h-auto"
									/>
								</div>
							)}
						</div>

						<div className="bg-white rounded-2xl shadow-lg p-6">
							<h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
									<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
								</svg>
								Publish Settings
							</h3>
							<Select
								options={["active", "inactive"]}
								label="Status"
								{...register("status", { required: true })}
							/>
						</div>

						<Button
							type="submit"
							variant={post ? "default" : "gradient"}
							className="w-full py-4 text-base font-semibold shadow-lg hover:shadow-xl"
						>
							{post ? (
								<>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
										<path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
									</svg>
									Update Post
								</>
							) : (
								<>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
									</svg>
									Publish Post
								</>
							)}
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}
