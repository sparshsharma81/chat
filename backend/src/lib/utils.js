import jwt from 'jsonwebtoken'; 
//this is popular package for handling the token based authentication 

//this is the library which is used to generate the token
//this is the package which allows us to handle the token based authentication

export const generateToken = (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, 
        {expiresIn:'7d'});
    //THIS WILL EXPIRE THE TOKEN IN 7 DAYS..
    //MEANS AFTER 7 DAYS THE TOKEN WILL BE INVALID..

    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
        httpOnly: true, //prevents client side js from accessing the cookie
        sameSite: 'lax', // Changed from 'strict' to 'lax' to allow cross-site requests
        secure: process.env.NODE_ENV === 'production', // Only use secure in production
        path: '/' // Ensure cookie is available on all paths
    });
    return token;
};