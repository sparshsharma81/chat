
import express from 'express';
import dotenv from 'dotenv'; //this is the way to import the dotenv module in the es modules
dotenv.config(); //this is the way to load the environment variables from the .env file
import { connectDB } from './lib/db.js'; 
import cookieParser from 'cookie-parser';
//this is the way to import the cookie-parser module in the es modules
//basically we are importing the cookie-parser module from the cookie-parser package
//this is the way to parse the cookies from the request
//in the auth.middleware.js file we are using the cookieParser to parse the cookies from the request 
//basically the logic is that we are parsing the cookie in order to get the token from the cookie

//this is the way to connect to the database
//basically we are importing the connectDB function from the db.js file
/*




here we are writing import express from 'express';
this is the way to import the express module in the es modules
this uses es modules instead of common js ---- (ESM) SYNTAX


instead of using the require() function we are using the import keyword
instead of const express = require('express') we are using the import express from 'express'
-----this method uses commonjs (CJS) SYNTAX -- and we 
are not using the older version---
we are genz --so working like genz.... #SPAARSH 
*/


import path from 'path';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

app.use(express.json()); 
//ye json ke data ko parse karega and then it will be converted into the javascript object 
//basically ye json data extract krke send karega...

app.use(cookieParser()); //# ham cookieParser ko use karege because ham cookie ko parse karna chahte hai 
//#ham ise call kar rahe hai...
//this is the way to parse the cookies from the request
//basically we are using the cookieParser to parse the cookies from the request
//this will parse the cookies from the request and return the cookies in the request object


app.use("/api/messages", messageRoutes); //this is the way to use the message routes
// app.use("/api/users", userRoutes); //this is the way to use the user routes

app.use("/api/auth", authRoutes);


//like if we are in the production mode then we are using the build folder
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/Front_end/dist")));
}

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/Front_end/dist/index.html"));
});
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectDB();

    //we are using async function to connect to the database
    //this will return a promise
    //and this might take some time to connect to the database
    //so we are using the await keyword to wait for the database to connect
    //and then we are using the console.log to print the message
});
