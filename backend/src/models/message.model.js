import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId, //this tells the mongodb that the receiverid is a reference to the user model
        ref:'User',
        required:true,
    },
    text:{
        type:String,
        
    },
   image:{
    type:String,
   },
},//each message will have a senderid , receiverid, text and image 
{timestamps:true} //so that we can see the created at and updated at time of the message
  );

  const Message = mongoose.model('Message', messageSchema);

  export default Message;
  
  