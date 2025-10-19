import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteEndPoint)
			.setProject(conf.appwriteProjectId);
		this.account = new Account(this.client);
	}

	async createAccount({ email, name, password }) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name,
			);
			return userAccount ? this.login({ email, password }) : userAccount;
		} catch (error) {
			console.error("Appwrite authentication service :: account creation error", error);
			throw error;
		}
	}

	async login({ email, password }) {
		try {
			return await this.account.createEmailPasswordSession(email, password);
		} catch (error) {
			console.error("Appwrite authentication service :: user login error", error);
			throw error;
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			console.error("Appwrite authentication service :: fetching user account error", error);
			return null;
		}
	}

	async updateName(name) {
		try {
			return await this.account.updateName(name);
		} catch (error) {
			console.error("Appwrite authentication service :: update name error", error);
			throw error;
		}
	}

	async updateEmail(email, password) {
		try {
			return await this.account.updateEmail(email, password);
		} catch (error) {
			console.error("Appwrite authentication service :: update email error", error);
			throw error;
		}
	}

	async updatePassword(newPassword, oldPassword) {
		try {
			return await this.account.updatePassword(newPassword, oldPassword);
		} catch (error) {
			console.error("Appwrite authentication service :: update password error", error);
			throw error;
		}
	}

	async logout() {
		try {
			await this.account.deleteSessions();
			return true;
		} catch (error) {
			console.error("Appwrite authentication service :: user logout error", error);
			// Return true anyway to allow local logout even if backend fails
			return true;
		}
	}

	// Note: Users API requires admin access which is not available on client
	// Instead, we'll store author name with posts or use a workaround
	async getUserNameById(userId) {
		try {
			// This is a client-side limitation - we can't fetch other users by ID without admin access
			// The solution is to store the author name in the post document itself
			// For now, returning a generic message
			console.warn("getUserNameById: Fetching user by ID requires admin access. Store author name in post document instead.");
			return "Anonymous";
		} catch (error) {
			console.error("Appwrite authentication service :: get user by ID error", error);
			return "Anonymous";
		}
	}
}

const authService = new AuthService();
export default authService;
