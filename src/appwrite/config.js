import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service {
	client = new Client();
	databases;
	storage;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteEndPoint)
			.setProject(conf.appwriteProjectId);

		this.databases = new Databases(this.client);
		this.storage = new Storage(this.client);
	}

	async createPost({ title, slug, content, featuredImage, status, userId, author }) {
		try {
			return await this.databases.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
					userId,
					author: author || "Anonymous",
				}
			);
		} catch (error) {
			console.error("Appwrite service :: createPost :: error", error);
			throw error;
		}
	}

	async updatePost(slug, { title, content, featuredImage, status }) {
		try {
			return await this.databases.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
				}
			);
		} catch (error) {
			console.error("Appwrite service :: updatePost :: error", error);
			throw error;
		}
	}

	async deletePost(slug) {
		try {
			await this.databases.deleteDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
			console.log("Post deleted successfully");
			return true;
		} catch (error) {
			console.error("Appwrite service :: deletePost :: error", error);
			throw error;
		}
	}

	async getPost(slug) {
		try {
			return await this.databases.getDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
		} catch (error) {
			console.error("Appwrite service :: getPost :: error", error);
			throw error;
		}
	}

	async getAllPosts(queries = [Query.equal("status", "active")]) {
		try {
			return await this.databases.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				queries
			);
		} catch (error) {
			console.error("Appwrite service :: getAllPosts :: error", error);
			throw error;
		}
	}

	async uploadFile(file) {
		try {
			return await this.storage.createFile(
				conf.appwriteBucketId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.error("Appwrite service :: uploadFile :: error", error);
			throw error;
		}
	}

	async deleteFile(fileId) {
		try {
			await this.storage.deleteFile(conf.appwriteBucketId, fileId);
			return true;
		} catch (error) {
			console.error("Appwrite service :: deleteFile :: error", error);
			throw error;
		}
	}

	getFilePreview(fileId) {
		return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
	}

	downloadFile(fileId) {
		return this.storage.getFileDownload(conf.appwriteBucketId, fileId);
	}

	async getUserName(userId) {
		// Note: Due to Appwrite client SDK limitations, we cannot fetch user data by ID without admin access
		// The recommended approach is to store the author name in the post document when creating it
		// This is a helper method that returns Anonymous as a fallback
		// Implement proper user name fetching by storing author info in posts
		return "Anonymous";
	}

	getInitials(name) {
		if (!name) return "AN";
		const parts = name.split(" ");
		return parts.map(part => part[0].toUpperCase()).join("").slice(0, 2);
	}
}

const service = new Service();

export default service;
