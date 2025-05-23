import User from '../models/user.model.js';
import bcrypt from 'bcrypt'; 

//this is the library which is used to hash the password
//just like our password is not gonna be stored in the database in the plain text
//so we will use this library to hash the password 
//jaise hamara password hai "123456" to ham hash karege using bcrypt library 
//aur ye use kind off encrypt karge l----jaise ---- ajlk23jl2hoy8a   --- joki kisiko samaj me nahi aayega 

import {generateToken} from '../lib/utils.js'; 
import cloudinary from '../lib/cloudinary.js';
//this is the cloudinary library which is used to upload the image to the cloudinary
//ye basically token k function ko import karega
//jisse ham token generate karke use use kar sakte hai...
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;



    //gen-z practice hoti hai ki try catch ka use kare...
    //kyuki hamse pasand nahi hamara code me koi bhi error aayega to wo catch block me aayega
    try {

    // const { fullname,email, password} = req.body; 
    //params are coming from the body of the request 
    //aur ham params ke data ko extract kar rahe
        // const user = await User.create({email, fullname, password, profilePicture});
        // res.status(201).json({message: "User created successfully", user});
        
        if(!fullName || !email || !password) { 
            return res.status(400).json({message: "saari fields likho"});
        }
        if(password.length < 8) { 
            return res.status(400).json({message: "Password must be at least 8 characters long"});
        }
       const user = await User.findOne({email}); //basically ye check karega ki user already exists hai ya nahi
       if(user) {
        return res.status(400).json({message: "User already exists"});
        //user already exists so we will not create a new user ///
        //and res.status(400) is basically for bad request /---400 is the status code for bad request 
       } 
       const salt = await bcrypt.genSalt(10); //this is the salt which is used to hash the password
       //genSalt -- it is basically generate the salt for the password
       //10 is the number of rounds  ..basically 10 is what we usually do...
       const hashedPassword = await bcrypt.hash(password, salt); //this is the hashed password
       //hash -- it is basically hash the password using the salt
       //and this hashed password will be stored in the database
       //and this hashed password will be used to verify the password when the user will login
       //to jaise user ne password diya hai "123456" to ham hash karege using bcrypt library  
       //aur use convert karega in the form of hash --
       //jaise 123456 ---> ajlk23jl2hoy8a_2341saha2344  
       
       
       const newUser = new User({
        fullName,
        email,
        password : hashedPassword //we will like to save hashed password instead of simple password...
      //abhi ke liye profile picture ko nahi liya hai...
       })

       if(newUser) { 
        
        //yaha pr ham jwt token ko generate kar sakte hai
        generateToken(newUser._id,res); 
        await newUser.save();
        //we write address after newUser._id , so that it can send the cookie to response 
    //    await newUser.save();
        // generateToken(newUser._id, res);
       res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePicture: newUser.profilePicture,
        });
        
        //201 matlab created successfully 

        //mongodb stores it as _id not id
//agar new user hai to ham jwt token ko generate kar sakte hai 

    }
       else{
        res.status(400).json({message: "Bhai create nahi hua..."});
       }


    //    await newUser.save();
       
        // res.status(201).json({message: "User created successfully", newUser});
    } catch (error) {
        res.status(500).json({message: "User creation failed", error});
    }
    // res.send('signup route');
};


//the upper one is the signup controller
















export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "bhai ye account exist nahi karta..."});
            //if the user is not found then we will return the message that user not found
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password); 
        //password is the password which the user has entered 
        //user.password is the password which is stored in the database
        //this will basically compare the password with the hashed password 
        //basically it will return true if the password is correct and false if the password is incorrect
        //it will bcrypt the password
        if(!isPasswordCorrect) {
            return res.status(400).json({message: "bhai password galat hai..."});
            //if the password is incorrect then we will return the message that invalid password
        } 


        generateToken(user._id, res); 
        //THE PROBLEM WITH THE CODE IS THAT WE ARE GENERATING THE TOKEN AGAIN AND AGAIN
        //SO WE NEED TO REMOVE THE GENERATE TOKEN FROM THE CONTROLLER
        //AND WE NEED TO GENERATE THE TOKEN ONLY ONCE
        //SO WE WILL REMOVE THE GENERATE TOKEN FROM THE CONTROLLER
        //AND WE WILL GENERATE THE TOKEN ONLY ONCE
        //SO WE WILL REMOVE THE GENERATE TOKEN FROM THE CONTROLLER
        //AND WE WILL GENERATE THE TOKEN ONLY ONCE

        //buth if the password is correct then we will generate the token 
        // generateToken(user._id, res);
        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePicture: user.profilePicture,
        });
    } catch (error) {
        res.status(500).json({message: "Login failed", error});
    }
    // res.send('login route');

};


///NOW THE ABOVE ONE IS THE LOGIN CONTROLLER    






//now the basic thing is that if the user is logging out..we should clear the cookie
export const logout = (req, res) => {
    // res.send('logout route');

    try{
        res.cookie('jwt', '', {maxAge: 0});
        //maxAge is the time for which the cookie will be stored
        //0 means that the cookie will be deleted
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        res.status(500).json({message: "Logout failed", error});
    }


};




//now since we have created the signup and login controller...
//we need to create the route for the same

//we are creating a route where the user can update its profile picture
//BY DEFAULT IT IS OPTIONAL TO UPDATE THE PROFILE PICTURE 
//BUT NOW THE USER WILL UPDATE THE PROFILE PICTURE ////

// export const updateProfile = async (req, res) => {
//     try{
//         const {profilePicture} = req.body;
//         // console.log({profilePicture});
//         const user = req.user._id;

//         if(!profilePicture){
//                     return res.status(400).json({message: "Profile picture is required"});
//                 }

//         //cloudinary is just a bucket for images
//         // const uploadResponse = await cloudinary.uploader.upload(profilePicture, {
//         //     folder: 'profile-pictures',
//         // });
//         /*
//                 password : hashedPassword
//             fullName: user.fullName,
//         const uploadResponse = await cloudinary.uploader.upload(profilePicture);
//         const updatedUser = await User.findByIdAndUpdate(user, { //we need to update user by its id for profile pictur  e
//             profilePicture: uploadResponse.secure_url, //this is the url that cloudinary gives you back...
//         }, {new: true}); //this will give the lastest object of user after it has updated..
       
//         */

//           // Extract the base64 string from the data URL
//         //   const base64Image = profilePicture.split(',')[1]; // Get the part after the comma

        
//           let uploadResponse;
//           try {
//               uploadResponse = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`, {
//                   folder: 'profile-pictures', // Optional: specify a folder
//               });
//               console.log("Upload Response:", uploadResponse); // Log the upload response
//           } catch (uploadError) {
//               console.error("Cloudinary upload error:", uploadError); // Log the error
//               return res.status(500).json({ message: "Image upload failed", error: uploadError });
//           }
  
//           // Check if the user exists
//           const existingUser = await User.findById(user);
//           if (!existingUser) {
//               return res.status(404).json({ message: "User not found" });
//           }
  
//           // Update the user's profile picture in the database
//           const updatedUser = await User.findByIdAndUpdate(user, {
//               profilePicture: uploadResponse.secure_url}, // Use the URL returned from Cloudinary
//            { new: true });
  
//           // Check if the update was successful
//           if (!updatedUser) {
//               return res.status(500).json({ message: "Failed to update profile picture" });
//           }
  
//           // Send success response
//           res.status(200).json({ message: "Profile picture updated successfully", updatedUser });
//       } catch (error) {
//           console.error("Profile picture update failed:", error); // Log the error
//           res.status(500).json({ message: "Profile picture update failed", error });
//       }
//   }



export const updateProfile = async (req, res) => {
    try {
      const { profilePicture } = req.body;
      const userId = req.user._id;
  
      if (!profilePicture) {
        return res.status(400).json({ message: "Profile pic is required" });
      }
  
        const uploadResponse = await cloudinary.uploader.upload(profilePicture);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePicture: uploadResponse.secure_url },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log("error in update profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

export const checkAuth = async (req, res) => {
    try{
        const user = req.user;
        res.status(200).json({user});
    } catch (error) {
        console.log("error in check auth:", error);
        res.status(500).json({message: "Check auth failed", error});
    }
};




