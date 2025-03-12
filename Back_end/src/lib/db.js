import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
    //we are using async function to connect to the database
    //this will return a promise
    //and this might take some time to connect to the database
    //we are using the try catch block to connect to the database
    try { 
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('patanhi kya galti aari hai..', error);
    }
};

