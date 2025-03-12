import jwt from 'jsonwebtoken';

//since we are validiating the token using the jwt token 



import User from '../models/user.model.js'; //because it is related to user model...

export const protectRoute = async (req, res, next) => { //this next function is calling the next middleware
    try{
        const token = req.cookies.jwt;
//we call it jwt because we are using the jwt token to authenticate the user 
//in the lib --- in utils file we have created the generateToken function 
//in utils.js we can called the jwt this way...res.cookie('jwt',token

console.log(token);

    if(token === '') { //if the token is not present then we will return the message that unauthorized
        return res.status(401).json({message: "Unauthorized user"});
    }

//now in order to grab token from cookie..we are using cookie.parse package

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.userId);
    //this will verify the token and return the decoded token
//we will gonna decode the token using this...
//process.env.JWT_SECRET is the secret key to decode the token 
//ye hamne env file me define kiya hia


//now if this decoded token is a false value..then it will throw an error...
// if(!decoded) {
//     return res.status(401).json({message: "Unauthorized"});
//     //this means that the user is oversmart and he is trying to hack the system
// } --this code is showing error..so we have removed that..


const user = await User.findById(decoded.userId).select('-password');
console.log(user);
//now we will find the user by the id and return the user without the password
//basically we are selecting the user by the id and returning the user without the password
    //this is deselect ---- '-password'
    //this will find the user by the id and return the user without the password

    //now one more check...]\
    console.log(user);
    if(!user){
        return res.status(401).json({message: "Unauthorized user not found..."});
    }
    req.user = user; //this will return the user to the request object 
    //and will make the user work..

    next(); //this will call the next middleware

    
        
}catch(error){
    res.status(500).json({message: "Internal server error", error});
}

}
