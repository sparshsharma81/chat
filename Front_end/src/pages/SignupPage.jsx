// import React from 'react'
// import { useState } from 'react';
// import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
// import { useAuthStore } from '../store/useAuthStore';
// import { Link } from 'react-router-dom';
// import AuthImagePattern from '../components/AuthImagePattern';
// import  toast  from 'react-hot-toast'; //we are importing the toast from the react-hot-toast library.. 

// const SignupPage = () => {
//     const [showPassword, setShowPassword] = useState(false); /*this is the state for the password*/
//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '', //initially they all are empty strings....
//         password: '',
        
//     });
//     const {signup, isSigningUp} = useAuthStore();
//     const validateForm = () => { //we are using the react toast...basically when it is not validated
//         // const errors = {};
//     if(!formData.fullName.trim()) {  
//         return toast.error("Full Name is required");
//         // return false; this is not required
        

//     }
//         if(!formData.email.trim()){

//             return toast.error("Email is required");
//             // return false; ----iski jarurat nahi
//         } 
//         if(!/\S+@\S+\.\S+/.test(formData.email)){
//             return toast.error("Invalid email address"); //this is generated with ai..need not to understand it 
//             // return false;
//         } 
//         if(formData.password.length <6){
//             return toast.error("Password must be at least 6 characters long");
//             // return false; iska logic nahi hai...
//         }
//         return true;
//     }
//     // const handleChange = (e) => { //e--event object
//     //     setFormData({...formData, [e.target.name]: e.target.value});
//     // }
//     // const handleSubmit = async (e) => {
//     //     e.preventDefault(); //it does not refresh the page..
//     //     // const isValid = validateForm();

//     //     if(validateForm()){
//     //         try {
//     //             await signup(formData); //ruko zara sabar karo 
//     //             toast.success("Account created successfully");
                
//     //         } catch (error) {
//     //             toast.error(error?.response?.data?.message || "Something went wrong");
                
//     //         }



//     //     } 
//     // }



//     const handleSubmit = (e) => {
//         e.preventDefault();
    
//         const success = validateForm();
    
//         if (success === true) signup(formData);
//       };
    
//   return (
//     <div className='min-h-screen grid lg:grid-cols-2'>
//         {/*left side*/}
//         <div className='flex flex-col items-center justify-center p-6 sm:p-12'>
//             <div className='w-full max-w-md space-y-8'>

//                 {/*logo and title*/}
//                                                 <div className='text-center mb-8'>

                                            
//                                                 <div className = 'flex flex-col items-center gap-y-2 group'>
//                                                     <div className = 'size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
//                                                     <MessageSquare className ='size-6 text-primary' />
//                                                     </div>
//                                                     <h1 className = 'text-2xl font-bold mt-2'>Create an account</h1>
//                                                     <p className = 'text-base-content/60'>Join our platform to get started</p>
                                                
//                                             </div>
//                                 </div>
//         {/*here is the logo end*/}


//         <form onSubmit={handleSubmit} className='space-y-6'>
//             {/*now this is the area where we need to enter the form */}
//             {/* bascially we will gonna use daisy ui for this form*/}


//             <div className='form-control'>
//                 <label className='label'>
//                     <span className='label-text font-medium'>Full Name</span>
//                 </label>
//                 <div className='relative'>
//                     <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
//                         <User className='size-5 text-base-content/40' />
//                     </div>
//                     <input type="text" 
//                     placeholder='Full Name'
//                      className='w-full pl-10 pr-4 py-2 rounded-md border border-base-content/20 focus:outline-none focus:ring-2 focus:ring-primary/20' 
//                      value={formData.fullName}
//                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
//                      />
//                 </div>
//             </div>




//                         {/* this is the email for data entering...*/}
//                                 <div className='form-control'>
//                                     <label className='label'>
//                                         <span className='label-text font-medium'>Email</span>
//                                     </label>
//                                     <div className='relative'>
//                                         <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
//                                             <Mail className='size-5 text-base-content/40' />
//                                         </div>
//                                         <input type="email" 
//                                         placeholder='Email'
//                                         className='w-full pl-10 pr-4 py-2 rounded-md border border-base-content/20 focus:outline-none focus:ring-2 focus:ring-primary/20' 
//                                         value={formData.email}
//                                         onChange={(e) => setFormData({...formData, email: e.target.value})}
//                                         />
//                                     </div>
//                                 </div>





//                                 <div className='form-control'>
//                                     <label className='label'>
//                                         <span className='label-text font-medium'>Password</span>

//                                     </label>
//                                     <div className='relative'>
//                                         <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
//                                             <Lock className='size-5 text-base-content/40' />
//                                         </div>
//                                         <input type={showPassword ? 'text' : 'password'} //basically this is for the password visibility 
//                                         placeholder='Password'
//                                         className='w-full pl-10 pr-4 py-2 rounded-md border border-base-content/20 focus:outline-none focus:ring-2 focus:ring-primary/20' 
//                                         value={formData.password}
//                                         onChange={(e) => setFormData({...formData, password: e.target.value})}
//                                         />

//                                         </div>
//                                 </div>






//                                 {/* this is the button for the form -SUBMIT BUTTON
                                
//                                 THIS BUTTON WILL BE DISABLED WHILE WE ARE SIGNIN UP...
                                
//                                 */}

//                                 <button type='submit' className='w-full btn btn-primary' disabled={isSigningUp}>
//                                     {isSigningUp ? ( 
//                                         <>
//                                         <Loader2 className='size-5 animate-spin' />
//                                         Loading...
//                                         </>
//                                     ) : (

//                                         "Create Account"
//                                     )}
//                                         {/* this is the button text */}
//                                     {/* {isLoggingIn ? 'Signing up...' : 'Sign up'} */}
//                                 </button>

//                                 {/* this is the link for the login page */}
//                                 {/* <p className='text-center text-sm text-base-content/60'>
//                                     Already have an account? <Link to='/login'>Login</Link>
//                                 </p> */}


//         </form>

//         <div className= 'text-center'>  {/* <- Error here: mismatched quotes */}
// <p className = "text-base-content/60">
// Already have an account?{" "} 
//     <Link to="/login" className= "link link-primary">Sign in</Link>
// </p>
//         </div>
       
//     </div>  
//   </div>


// {/* now this is the right side of the page... */}

// <AuthImagePattern 
// title="Join our peaceful community"
// subtitle="Connect with like-minded individuals and share your thoughts and ideas."

// />

//   </div>
//   )

// }

// export default SignupPage;



import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};
export default SignUpPage;
