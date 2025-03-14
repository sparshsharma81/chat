//now after building all the page..we will gonna thrown lights on the home page...

import { useChatStore } from "../store/useChatStore"; //this is the chat store which we have created in the store folder 
//we are importing the useChatStore from the useChatStore.js file which we have created in the store folder  
import React from 'react'


import Sidebar from "../components/Sidebar"; //this is the sidebar component which we have created in the components folder 
import NoChatSelected from "../components/NoChatSelected"; //this is the no chat selected component which we have created in the components folder   
import ChatContainer from "../components/ChatContainer"; //this is the chat container component which we have created in the components folder 



const HomePage = () => {
  const { selectedUser } = useChatStore(); //this is the selected user which we have created in the chat store

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />} 
            {/* this is the no chat selected component which we have created in the components folder */}
            {/* this is the chat container component which we have created in the components folder */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;