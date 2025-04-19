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
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            return userAccount ? this.login(email, password) : userAccount
        } catch (error) {
            console.log("Appwrite authentication service :: account creation error", error)
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Appwrite authentication service :: user login error")
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite authentication service :: fetching user account error")
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite authentication service :: user logout error")
        }
    }
}

const authService = new AuthService();
export default authService