import Navbar from "./components/Navbar";
//basically here we are importing the navbar component
//we want that on the top of our page..there should be navbar component
import { Routes, Route, Navigate } from "react-router-dom";

//great..we also need to import all the pages here
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { Loader } from "lucide-react"; ///for the loading spinner.. == for icons

import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react"; //for the useEffect hook.. //just like await in the async function..

import { Toaster } from "react-hot-toast"; //we are importing the toaster from the react-hot-toast library..

// const {authUser ,checkAuth ,isCheckingAuth } = useAuthStore();



import { useThemeStore } from "./store/useThemeStore"; //this is used to import the theme store..


const App = () => {
  // axiosInstance.get("/api/v1/auth/me").then((res) => { here we can use the get ,post, put methods

  const { authUser ,checkAuth ,isCheckingAuth,onlineUsers } = useAuthStore(); //this is how ham use use karte hai..
//and similary we can copy this line in every page to check it..



const {theme, setTheme} = useThemeStore();

useEffect(() => {
  checkAuth();
  

}, [checkAuth]); //we should put the function inside... 

// console.log("authUser",authUser); --this is how we can check the authUser.. --basically it will help us debug 





//we need to install npm i lucide-react this...

if(isCheckingAuth && !authUser){ 
  return(
    <div className="size-10 animate-spin rounded-full border-b-2 border-t-2 border-primary">
      <Loader className="size-10 animate-spin" /> 
     {/*we need to import the Loader from the lucide-react library..*/}
    </div>
  );

}

console.log("authUser",authUser);

  return (

    <div data-theme={theme}>
      <Navbar />
      <Routes>
          {/* <Route path="/" element={authUser ? <HomePage authUser={authUser}   /> : <Navigate to="/login" />} /> this is the home page */}
{/*logic behind this is basically if the user is not authenticated..then we will redirect him to the login page..*/}



        {/* <Route path="/SignupPage" element={authUser ? <Navigate to="/" />:<SignupPage /> } /> this is the about page */}
        {/* <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} /> this is the contact page */}
        {/* <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} /> this is the login page */}
        {/* <Route path="/profile"element={authUser ? <ProfilePage /> : <Navigate to="/login" />} /> this is the register page */}
      {/*we will create all these pages under the pages folder*/}


     
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
     

      </Routes>
      <Toaster position="top-center" reverseOrder={false}/>
    </div>
  )
}

export default App;
