import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // Ref to the username element
  const usernameRef = useRef(null);

  useEffect(() => {
    const handleCopy = (event) => {
      event.preventDefault();
      const customText = "ram ram bhai..kaise hai..kya krega copy krke waise??";

      if (event.clipboardData) {
        event.clipboardData.setData("text/plain", customText);
      } else if (window.clipboardData) {
        window.clipboardData.setData("Text", customText);
      }
    };

    const element = usernameRef.current;
    if (element) {
      element.addEventListener("copy", handleCopy);
      //ref basically used hota hai select krne ke liye
    }
    //i have implemented the functionality of preveting copying username in my project..
    //basically at present it is in trial basis..maybe i can immplement it further...

    return () => {
      if (element) {
        element.removeEventListener("copy", handleCopy);
        //jo copy wala function hai wo sirf h3 wale tag k liye hi applicable hoga.
      }
    };
  }, []);

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePicture || "/avatar.png"}
                alt={selectedUser.fullName}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium" ref={usernameRef}> 
              {selectedUser.fullName}
            </h3>
            {/* sirf upar wale h3 text k liye hi copy paste wala function work karega... --yaha pr hmne ref se select kiya hai...*/}
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
