import { Account, Client, ID } from 'appwrite'
import config from '../config/config'


export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        this.account= new Account(this.client);
    }

    async creatAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                // go to login function 
                return this.login({email,password});
            }else{
                return userAccount
            }
            
        } catch (error) {
            console.log('create account error ',error);
            throw error
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password);
        } catch (error) {
            console.log('Login error',error);
            throw error;
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log('logout error',error);
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log('get current user error',error);
            throw error
        }
        return null;
    }
}

const authService = new AuthService()

export default authService


