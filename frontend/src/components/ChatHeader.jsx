import { useEffect } from "react";
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    const handleCopy = (event) => {
      event.preventDefault(); // Prevent the default copy behavior
      const customText = "Copying is disabled or modified by ChatHeader!";
      if (event.clipboardData) {
        event.clipboardData.setData("text/plain", customText);
      } else if (window.clipboardData) {
        // For IE
        window.clipboardData.setData("Text", customText);
      }
    };

    document.addEventListener("copy", handleCopy);

    // Cleanup function to remove listener when component unmounts
    return () => {
      document.removeEventListener("copy", handleCopy);
    };
  }, []);

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePicture || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
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
