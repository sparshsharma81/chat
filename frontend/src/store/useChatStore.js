//now here we will gonna put everything that is related to chat...

import { create } from "zustand"; //this is the create function from the zustand library 
import toast from "react-hot-toast"; //this is the toast library which we will gonna use to show the toast messages
import { axiosInstance } from "../lib/axios"; //this is the axios instance which we will gonna use to make the api calls
import { useAuthStore } from "./useAuthStore"; //this is the auth store which we will gonna use to get the socket



export const useChatStore = create((set,get) => ({
    messages: [], //initially we will gonna have an empty array of messages 
    users:[], //initially we will gonna have a null user 
    selectedUser: null, //initially we will gonna have a null selected user 
    isUserLoading: false, //initially we will gonna have a false user loading
    isMessageLoading: false, //initially we will gonna have a false message loading


    //while messages are loading we can show some skeleton loader 

    // 
    // setMessages: (messages) => set({ messages }),

    getUsers : async () => {
        set({isUserLoading: true}); //this is the loading state for the user
        try {
            const res = await axiosInstance.get("/messages/users"); //this is the api call to get the users ..basically it is the endpoint jo hamne banaya hai backend me...

            set({users: res.data, isUserLoading: false}); //this is the state update for the users

        } catch (error) {
            toast.error("Error fetching users",error.response.data.message);
            set({isUserLoading: false}); //this is the state update for the user loading
            
        }
    },

    getMessages : async (userId) => {
        set({isMessageLoading: true}); //this is the loading state for the message
        try {
            const res = await axiosInstance.get(`/messages/${userId}`); //this is the api call to get the messages ..basically it is the endpoint jo hamne banaya hai backend me...

            set({messages: res.data }); //this is the state update for the messages


        } catch (error) {
            toast.error("Error fetching messages",error.response.data.message);
            // set({isMessageLoading: false}); //this is the state update for the message loading
        }
        finally {
            set({isMessageLoading: false}); //this is the state update for the message loading
        }
    },

    //now after building the sidebar component we will gonna build the chat container component... 
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
          const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
          set({ messages: [...messages, res.data] }); //keeping all the previous messages we have
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },




    
      subscribeToMessages: () => { 
        const { selectedUser } = get();
        if (!selectedUser) return;
      
        const socket = useAuthStore.getState().socket;
      
        socket.on("newMessage", (newMessage) => {
          const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
          if (!isMessageSentFromSelectedUser) return;
      
          set({
            messages: [...get().messages, newMessage],
          });

          const senderName = selectedUser?.fullName || "Unknown User"; // Fallback name
          const senderIcon = selectedUser?.profilePicture || "/default-icon.png"; // Fallback icon

          
      
          // Check if notifications are allowed
          if (Notification.permission === "granted") {
            new Notification(`New Message from ${senderName}`, {
              body: newMessage.text, // Message content
              icon:senderIcon, // Set a custom icon (optional)
            });
          } else if (Notification.permission !== "denied") {
            // Ask for permission if not already granted/denied
            Notification.requestPermission().then(permission => {
              if (permission === "granted") {
                new Notification(`New Message from ${senderIcon}`, {
                  body: newMessage.text,
                  icon: senderIcon,
                });
              }
            });
          }
        });
      },
       

  unsubscribeFromMessages: () => { //now sice we have subscribed to the messages..we need to unsubscribe from the messages 
    const socket = useAuthStore.getState().socket; 
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }), //function to select the user and it will also upgrade the state
}));