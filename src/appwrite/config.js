import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query, Messaging } from "appwrite";

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

    async createPost({ title, slug, content, featuredImage, status, userId }) {
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
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
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
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            const deletedDocument = await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );

            return deletedDocument
                ? console.log("post deleted successfully")
                : null;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
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
            console.log("Appwrite service :: getPost :: error", error);
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
            console.log("Appwrite service :: getAllPosts :: error", error);
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
            console.log("Appwrite service :: uploadFile :: ");
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(conf.appwriteBucketId, fileId);
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    }

    downloadFile(fileId){
        return this.storage.getFileDownload(conf.appwriteBucketId, fileId);
    }
}

const service = new Service();

export default service;
