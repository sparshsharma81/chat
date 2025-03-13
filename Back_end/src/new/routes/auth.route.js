import express from 'express';
const router = express.Router();
import { signup, login, logout, checkAuth ,updateProfile} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js'; ///we are importing the protectRoute middleware

// router.get('/signup', (req, res) => {
    // res.send('signup route');
// }); //this is the signup route
//here we are using the post method to send the data to the database
// router.post('/signup', (req, res) => {
//     res.send('signup route');
// });



// router.post('/login', (req, res) => {
//     res.send('login route');
// }); //this is the login route
//here we are using the post method to send the data to the database


// router.post('/logout', (req, res) => {
//     res.send('logout route');
// }); //this is the logout route
//here we are using the post method to send the data to the database



router.post('/signup', signup); //hame ise post karne hai because we are sending the data to the database
router.post('/login', login);
router.post('/logout', logout);

//great..we have created the routes for the signup, login and logout
//now we will create the update profile route
// router.post('/update-profile', updateProfile);
//but one more thing is that we need to authenticate the user before updating the profile picture
//like first the user should login and then only he can update the profile picture 
//so we will use the authenticate middleware to authenticate the user
router.put('/update-profile', protectRoute, updateProfile);


//now after all of this..one last thing which we need to check is that use is authenticated or not
//so we will use the protectRoute middleware to authenticate the user
router.get('/check', protectRoute, checkAuth); 
//meaning that if the user is not authenticated..we will not call this function ..and if the user is authenticated..we will call this function


export default router;
