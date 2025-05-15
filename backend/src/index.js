import express from 'express';
import dotenv from 'dotenv'; //this is the way to import the dotenv module in the es modules

import { connectDB } from './lib/db.js'; 
import cookieParser from 'cookie-parser';
import path from 'path';
//this is the way to import the path module in the es modules
//basically we are importing the path module from the path package
//this is the way to get the path of the file


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


import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import cors from 'cors'; 
//this is the way to import the cors module in the es modules 
//this is a way to allow cors origin requests from the frontend to the backend
// const app = express(); ---we do not need that as we have already created the app in the socket.js file 


import { app, server } from './lib/socket.js';


dotenv.config(); //this is the way to load the environment variables from the .env file

const PORT = process.env.PORT;

const __dirname = path.resolve(); 



app.use(express.json({limit: "100mb"})); 
//ye json ke data ko parse karega and then it will be converted into the javascript object 
//basically ye json data extract krke send karega...

app.use(express.urlencoded({ limit: "100mb", extended: true }));
//this is non blocking body parser--- basically it do application on the upcomming url


//ab ye hai blocking code ka example 
// Blocking Middleware: Simulate blocking operation if file is too large
// const blockingMiddleware = (req, res, next) => {
//   // Simulate checking for large image size from req.body
//   const imageData = req.body.image;  // Assume image data is passed as part of request body

//   if (imageData && imageData.length > 1 * 1024 * 1024) {  // If image size exceeds 
//       console.log('Large file detected. Blocking for 10 seconds...');

//       // Simulate a blocking loop for 10 seconds
//       const start = Date.now(); //ye date ko check karega...
//       while (Date.now() - start < 10000) { // Block for 10 seconds
//           // Do nothing, just block the event loop
//           console.log("blocking code");
//       }

//       // After blocking, trigger an error
//       return next(new Error('File size exceeds 1 limit.')); //ye hota hai custom error
//       //new -- ius basically a constructor
//   }

//   next();  // If file is not too large, continue to next middleware
// };


app.use(cookieParser()); //# ham cookieParser ko use karege because ham cookie ko parse karna chahte hai 
//#ham ise call kar rahe hai...
//this is the way to parse the cookies from the request
//basically we are using the cookieParser to parse the cookies from the request
//this will parse the cookies from the request and return the cookies in the request object



//cors configuration
app.use(cors({ 
    origin: [
        "http://localhost:5173",
        "https://chat-wheat-three-43.vercel.app"
    ],
    credentials: true,
    //ye basaically vercel pr host krne ka try kiya hai...but it is not working out properly..the reason of this is there might be several errors
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie", "Date", "ETag"]
}));

// Add security headers
//the below four lines are for cors working... --- isme cookies ki problem ab bhi aa rahi hai...
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');


    //jo upar wali lines hai ..vo cors k liye hai..
    //ye niche wali line iframes allow krne k liye hai..
    //basically vercel pr html me host krte waqt...render k 50seconds wala page time le raha tha..
    //to usse redirect krne k liye iframes ka use kiya..basically taaki ek proper animation aa skte..
    //and user ko 50 seconds tk vo bekar sa page  na dikhe..
    res.removeHeader('X-Frame-Options');
    res.setHeader('X-Frame-Options', 'ALLOWALL'); //allow krega sabhi header x-frame-options ko......
    res.setHeader('Content-Security-Policy', 'frame-ancestors *');

    next();
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes); //this is the way to use the message routes
// app.use("/api/users", userRoutes); //this is the way to use the user routes


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
 // ye views folder ko point karega...

app.get("/chat/", (req, res) => {
  res.render("chat");
  
});
console.log(__dirname); // Will help debug the folder location



//ye hai global error handling middleware..basicaclly ye 
///jo bhi error hm next(err) krke pass krege..to ye isme thrown krgega
app.use((err, req, res, next) => {
  console.error(err.stack); // Logs the error stack to console
  res.status(509).json({ message: 'Something went wrong, error handling middleware is called...', error: err.message });
});
//500 nhi ham to 509 hi rakhege./... bula lo jise bulana hai////


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      if (req.path.startsWith("/chat") || req.path.startsWith("/otherEJSPage")) {
        return next(); // Skip React for EJS pages
      }
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }

server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/`);
    connectDB();

    //we are using async function to connect to the database
    //this will return a promise
    //and this might take some time to connect to the database
    //so we are using the await keyword to wait for the database to connect
    //and then we are using the console.log to print the message
});


