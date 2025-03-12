import {v2 as cloudinary} from 'cloudinary'; 
//cloudinary ka package hota hai v2 aur ham uske through cloudinary ko call karege...

import {config} from 'dotenv';
config(); //this is the way to load the environment variables from the .env file

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export default cloudinary;
