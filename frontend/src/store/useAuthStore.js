import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import  toast  from "react-hot-toast";
import { io } from "socket.io-client";
// import { BASE_URL } from "../lib/constants";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({ //using this get method we can access to socket..differnet functions withing the state function
    authUser: null, //initilially we do not no that the user is authenticated or not..so we need to check that...
     isSigningUp: false,
      isLoggingIn: false,
        isUpdatingProfile: false,
    //and we gonnal have loading state for that....
    isCheckingAuth: true, //as soon as we refresh our page..we need to check it is authenticated or not..
    //now we need to create a function to check the authentication of the user..

    // isSignedIn: false,
   
  
   
    onlineUsers: [],
    socket: null,
    
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check"); //we need not to put localhost:5001/api/ ---because in localhost
            // file we already implemented the localhost ---base urll..so we need not to repeat it... jai shree ram.
            
            // set({authUser:res.data});
            // if (res.data && res.data.user) {
            //     set({ authUser: res.data.user });
            // } else {
            //     set({ authUser: null });
            //     console.error("Unexpected response structure:", res.data);
            // }

            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            // set({authUser:null});
            // console.log("Error in checking auth",error);    
            // toast.error("Authentication check failed. Please try again.");
            console.log("Error in checkAuth:", error);
      set({ authUser: null });
            
        }finally{
            set({isCheckingAuth:false});
        }
    },
    // setAuthUser: (user) => set({ authUser: user }),
     signup: async (data) => {
    set({isSigningUp:true}); //ham apni signup state ko true kardege
    try {
        const res= await axiosInstance.post("/auth/signup", data);
        toast.success("Account created successfully"); 
        set({authUser:res.data});//the data is authenticated as soon as the user signup
        get().connectSocket();
        
    } catch (error) {
        toast.error("ghani dikkat aari see" , error.response.data.message);
        
    }finally{
        set({isSigningUp:false});
    }
},
logout: async () => {
   
    try {
        await axiosInstance.post("/auth/logout");
         set({authUser:null});
         toast.success("pheli fursat mein nikal");
         get().disconnectSocket();
    } catch (error) {
        toast.error("ruka roh yahi", error.response.data.message);
        console.error("Error in logout", error);
    }
},

login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");


      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },



  //now this is the function for updaing the proifle picture...
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },





  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => { //when we close browser ---then this is automactically called
    if (get().socket?.connected) get().socket.disconnect(); //when we log out ---then we will gonna call this function
  },


  

}));


//the main thing out here is isCheckingAuth..
//basically when the user refresh ...then for a second it will show the loading state.. 
//in the loading state..it will check either the user is authenticated or not.. /--while it is checking..it will show the loading spinner..
//so we need to create a function to check the authentication of the user..





