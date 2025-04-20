import jwt from 'jsonwebtoken'; 
//this is popular package for handling the token based authentication 

//this is the library which is used to generate the token
//this is the package which allows us to handle the token based authentication



export const generateToken = (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, 
        {expiresIn:'1d'});
    //THIS WILL EXPIRE THE TOKEN IN 7 DAYS..
    //MEANS AFTER 7 DAYS THE TOKEN WILL BE INVALID..

    const isProduction = process.env.NODE_ENV === 'production';
    
    res.cookie('jwt', token, {
        maxAge: 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        sameSite: isProduction ? 'none' : 'lax', // Use 'none' for cross-site cookies in production
        secure: isProduction, // Must be true when sameSite is 'none'
        path: '/',
        domain: isProduction ? '.onrender.com' : undefined // Specify domain in production
    });
    return token;

};