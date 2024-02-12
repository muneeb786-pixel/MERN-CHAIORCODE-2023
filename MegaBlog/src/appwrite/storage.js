import { Storage , Client, ID } from 'appwrite'
import config from '../config/config.js/'

export class StorageService {
    client = new Client()
    bucket
    constructor(){
        this.client.setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        this.bucket  = new Storage(this.client);
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(config.appwriteBucketId,ID.unique(),file)
        } catch (error) {
            console.log(' StorageSerice :: uploadFile :: error : ',error);
        }
        return false;
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(config.appwriteBucketId,fileId)            
        } catch (error) {
            console.log('Storage Serviec :: delete file : error ', error);
            return false;
        }
    }

     getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(config.appwriteBucketId,fileId);
        } catch (error) {
            console.log('Storage service :: get file preview :: error : ',error);
        }
        return false;
    }

}

const storage = new StorageService();
export default storage;