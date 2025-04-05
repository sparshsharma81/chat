import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Bot } from "lucide-react";
import { useState } from "react";
import GeminiChat from "./GeminiChat"; // hamara banaya hua chat componenet yaha se import hoga...

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [showGemini, setShowGemini] = useState(false); // Toggle state ---react 

  return (
    <>
      <header
        className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
        backdrop-blur-lg bg-base-100/80"
      >
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-lg font-bold">Chat's up</h1>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="btn btn-sm gap-2"
                onClick={() => setShowGemini((prev) => !prev)}
              >
                <Bot className="w-4 h-4" />
                <span className="hidden sm:inline">Ask Gemini</span>
              </button>

              <Link to={"/settings"} className="btn btn-sm gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>

              {authUser && (
                <>
                  <Link to={"/profile"} className="btn btn-sm gap-2">
                    <User className="size-5" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>

                  <button className="flex gap-2 items-center" onClick={logout}>
                    <LogOut className="size-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Floating GeminiChat panel */}
      {showGemini && (
  <div
    className="fixed right-4 top-20 bottom-6 w-[22rem] max-w-md z-50 
    bg-base-100 text-base-content shadow-xl rounded-2xl p-4 
    border border-base-300 flex flex-col"
  >
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-semibold text-lg">Gemini Chat</h3>
      <button
        onClick={() => setShowGemini(false)}
        className="text-red-500 hover:text-red-600"
      >
        ✕
      </button>
    </div>

    <div className="flex-1 overflow-y-auto">
      <GeminiChat />
    </div>
  </div>
)}


    </>
  );
};

export default Navbar;
