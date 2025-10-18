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
			return await this.account.deleteSessions();
		} catch (error) {
			console.error("Appwrite authentication service :: user logout error", error);
			throw error;
		}
	}
}

const authService = new AuthService();
export default authService;
