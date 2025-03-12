import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();//creating default router 
router.get('/users', protectRoute, getUsersForSidebar); 
//when the user will click on this ..all the log in user are shown...

router.get('/:id', protectRoute, getMessages);
//when the user will click on this ..all the messages between the logged in user and the user to chat are shown... 


router.post('/send/:id', protectRoute, sendMessage); //this should be protected route--else unauthorized user can send the message
//when the user will click on this ..all the messages between the logged in user and the user to chat are shown... 

export default router;



