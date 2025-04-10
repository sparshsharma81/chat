import { Link ,useNavigate} from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Bot, Laugh, Quote } from "lucide-react";
import { useState } from "react";
import { getJoke } from "../api/joke";
import GeminiChat from "./GeminiChat"; // Your Gemini chat component
import { getQuote } from "../api/quote"; // Your quote fetch function
import {getHoroscope} from "../api/Horscope";
import { getZodiacSign } from "../api/zodiac";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [showGemini, setShowGemini] = useState(false); // Toggle state for Gemini
  //bascially..isse jemni pr click krne pr uska text chnage hoga...

  const handleJokeClick = async () => {
    const joke = await getJoke();
    alert(joke); // You can replace with toast/modal later
  };


  //ab ye hai horscope ke liye
  const handleHoroscopeClick = async () => {
    const name = prompt("Enter your name:");
    const birth = prompt("Enter your birthdate (MM-DD):");
  
    if (!name || !birth) {
      return alert("Please enter both name and birthdate.");
    }
  
    // Split MM-DD into month and day
    const [month, day] = birth.split("-").map(Number);
  
    // If invalid date format, show error
    if (isNaN(month) || isNaN(day)) {
      return alert("Invalid date format! Please use MM-DD.");
    }
  
    const sign = getZodiacSign(month, day);
    
    try {
      const horoscope = await getHoroscope(sign); // Call API to get horoscope
      alert(`${name}, your ${sign} horoscope is:\n\n${horoscope}`);
    } catch (error) {
      alert("Error fetching horoscope. Please try again later.");
    }
  };
  
  const handleQuoteClick = async () => {
    const quote = await getQuote();
    alert(quote);
  };

  const handleGeminiToggle = () => {
    setShowGemini((prev) => !prev);
  };
  const navigate = useNavigate();

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
              {/* Gemini Toggle Button */}
              <button onClick={handleGeminiToggle} className="btn btn-sm gap-2">
                <Bot className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {showGemini ? "Close Gemini" : "Ask Gemini"}
                </span>
              </button>

              {/* Joke Button */}
              <button onClick={handleJokeClick} className="btn btn-sm gap-2">
                <Laugh className="w-4 h-4" />
                <span className="hidden sm:inline">Joke</span>
              </button>

              <button
        onClick={() => navigate("/shorts")}
        className="btn btn btn-sm gap-2"
      >
        Shorts
      </button>

              {/* Quote Button */}
              <button onClick={handleQuoteClick} className="btn btn-sm gap-2">
                <Quote className="w-4 h-4" />
                <span className="hidden sm:inline">Quote</span>
              </button>
{/* ye hai horscope ka button */}
<button onClick={handleHoroscopeClick} className="btn btn-sm gap-2">
  🔮 <span className="hidden sm:inline">Horoscope</span>
</button>



              

              {/* Settings */}
              <Link to={"/settings"} className="btn btn-sm gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>

              {/* Authenticated User Options */}
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

      {/* Gemini Chat Panel */}
      {showGemini && (
        <div
          className="fixed right-4 top-20 bottom-6 w-[22rem] max-w-md z-50 
          bg-base-100 text-base-content shadow-xl rounded-2xl p-4 
          border border-base-300 flex flex-col"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">Gemini Chat</h3>
            <button
              onClick={handleGeminiToggle}
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
