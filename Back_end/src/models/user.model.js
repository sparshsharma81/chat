import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; 
//this file is needed because we want to hash the password before storing it in the database




const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    
    fullname: {
        type: String,
        required: true, 
        //this is not gonna be unique because we want to allow the user to have multiple names
    },
    password: {
        type: String,
        minlength: 8, //kuch minimum length hona chahiye password ke liye
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",
        required: false,

    },
},
    {timestamps: true,}
);


// userSchema.pre('save', async function(next){
//     if(!this.isModified('password')){
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// userSchema.methods.comparePassword = async function(password){
//     return await bcrypt.compare(password, this.password);
// }


const User = mongoose.model("User", userSchema);

//this is gonna be taking argument as an object...

export default User;

//aur isi thrah ham default user model banakar export karege...
