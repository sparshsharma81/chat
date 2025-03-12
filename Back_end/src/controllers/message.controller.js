import User from '../models/user.model.js'; //we have to import the user model else it will crash

import Message from '../models/message.model.js';
export const getUsersForSidebar = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select('-password');
        /*
        we are using the $ne operator to exclude the logged in user from the list of users
        $ne means not equal to

        --we are finding all the user except the logged in user
        --we are selecting the password field to be excluded from the response
        we are fetching everything except the password field
        */



        const users = await User.find({_id: {$ne: loggedInUserId}}).select('-password');
        res.status(200).json(users);
    }catch(error){
        console.error('Error in getUsersForSidebar:', error.message);
        res.status(500).json({message: error.message});
    }
};

export const getMessages = async (req, res) => {
    try{
        const {id:UserToChatId} = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [ //or is basically the filter --- we are doing like find all the messages between the logged in user and the user to chat
                {senderId: myId, receiverId: UserToChatId},
                {senderId: UserToChatId, receiverId: myId},
            ], //basically it will find all the messages between sender and receiver
        });
        res.status(200).json(messages); //this will return all the messages between the sender and receiver
        
    }catch(error){
        console.error('Error in getMessages:', error.message);
        res.status(500).json({message: error.message});
    }
}

export const sendMessage = async (req, res) => {
    try{
        const{text,image} = req.body;
        // const {id:UserToChatId} = req.params;
        const {id:receiverId} = req.params;
        const senderId = req.user._id; 
        // const myId = req.user._id;
        

        let imageUrl;
        if(image){

            //uploading base64 url to the cloudinary....
            const uploadResponse = await cloudinary.uploader.upload(image); //this will upload the image to
            //  the cloudinary and give the url
            imageUrl = uploadResponse.secure_url;
        }
        
        const newMessage = await Message.create({
            text,
            image: imageUrl, //either it is undefined or the uploaded value;
            senderId,
            receiverId,
        });

        //after the message is created, we will send the message to the user to chat
        //we need to save this image...
        await newMessage.save();

        //now we will send the message to the user to chat
        

        //we can add realtime functionality here... using socket.io 

        res.status(201).json(newMessage); //now we can send the new message back to the client
    }catch(error){
        console.error('Error in sendMessage:', error.message); //this is internal error
        res.status(500).json({message: error.message});
    }
}


/*
this is the entire function which we have..
we first get text and image from the body
then we get the receiver id from the params
then we get the sender id from the request
then we check if the image is present or not
if the image is present, we upload it to the cloudinary
then we create a new message
then we save the message
then we send the message to the user to chat
*/

