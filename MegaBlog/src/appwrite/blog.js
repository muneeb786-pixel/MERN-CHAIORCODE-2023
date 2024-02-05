import { Databases , Client, ID, Query } from 'appwrite'
import config from '../config/config.js/'

export class BlogService {
 client = new Client()
 database

 constructor(){
    this.client.setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId)
    this.database = new Databases(this.client)
 }
 
 async createBlog({title,slug,content,featureImage,status}){
  try {
    return await this.database.createDocument(config.appwriteDatabaseId,config,appwriteCollectionId,slug,
    {
        title,
        content,
        featureImage,
        status
    })
  } catch (error) {
    console.log('BLog service :: createBlog ::  error ', error);
  }  
  return null;
 }

 async updateBlog({title,slug,content,featureImage,status}){
    try {
        return await this.database.updateDocument(config.appwriteDatabaseId,config,appwriteCollectionId,slug,{
            title,
            content,
            featureImage,
            status
        })
    } catch (error) {
        console.log('blog service :: UpdateBlog :: error : ',error);
    }
    return null;
 }

 async deleteBlog(slug){
    try {
        return await this.database.deleteDocument(config.appwriteDatabaseId,config,appwriteCollectionId,slug)
    } catch (error) {
        console.log('blog service :: delete blog : error : ', error);
    }
    return false
 }
 async getPost(slug){
    try {
        return await this.database.getDocument(config.appwriteDatabaseId,config,appwriteCollectionId,slug)
    } catch (error) {
        console.log('Blog service :: getpost ::  error',error);
    }
    return null
 }
 async getPosts(queries=[Query.equal('status','active')]){
    try {
        return await this.database.listDocuments(config.appwriteDatabaseId,config,appwriteCollectionId,queries)
    } catch (error) {
        console.log('Blog service :: getposts ::  error',error);
    }
    return null
 }

}

const blogService = new BlogService();

export default blogService;