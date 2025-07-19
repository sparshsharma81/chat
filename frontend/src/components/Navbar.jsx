import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Bot, Laugh, Quote, SunMoon } from "lucide-react";
import { useState } from "react";
import { getJoke } from "../api/joke";
import GeminiChat from "./GeminiChat"; // Your Gemini chat component
import { getQuote } from "../api/quote"; // Your quote fetch function
import { getHoroscope } from "../api/Horscope";
import { getZodiacSign } from "../api/zodiac";
import AstrologyPage from "./AstrologyPage"; // You must have this component
import LoShuKuaModal from "./LoShuKuaModel";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [showGemini, setShowGemini] = useState(false); // Toggle state for Gemini
  const [showAstrology, setShowAstrology] = useState(false); // Toggle state for Astrology
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state
  const [modalContent, setModalContent] = useState(""); // Content to show in modal
  const [modalTitle, setModalTitle] = useState(""); // Modal title
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [showNumerology, setShowNumerology] = useState(false);


  //basically when the user will click on the joke or quote thing..then the dialog box will opened up and..
  //it will display the content there..which looks kind of good ..better than before

  const handleJokeClick = async () => {
    const joke = await getJoke();
    setModalTitle("Here's a Joke!");
    setModalContent(joke);
    setShowModal(true);
  };

  // Ab ye hai horoscope ke liye
  // const handleHoroscopeClick = async () => {
  //   const name = prompt("Enter your name:");
  //   const birth = prompt("Enter your birthdate (MM-DD):");

  //   if (!name || !birth) {
  //     return alert("Please enter both name and birthdate.");
  //   }

  //   // Split MM-DD into month and day
  //   const [month, day] = birth.split("-").map(Number);

  //   // If invalid date format, show error
  //   if (isNaN(month) || isNaN(day)) {
  //     return alert("Invalid date format! Please use MM-DD.");
  //   }

  //   const sign = getZodiacSign(month, day);

  //   try {
  //     const horoscope = await getHoroscope(sign); // Call API to get horoscope
  //     alert(`${name}, your ${sign} horoscope is:\n\n${horoscope}`);
  //   } catch (error) {
  //     alert("Error fetching horoscope. Please try again later.");
  //   }
  // };

  const handleQuoteClick = async () => {
    const quote = await getQuote();
    setModalTitle("Inspirational Quote");
    setModalContent(quote);
    setShowModal(true);
  };

  const handleGeminiToggle = () => {
    setShowGemini((prev) => !prev);
  };

   const handleNumerologyToggle = () => {
    setShowNumerology((prev) => !prev);
  };
  const handleAstrologyToggle = () => {
    setShowAstrology((prev) => !prev);
  };

  const navigate = useNavigate();

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

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
                <h1 className="text-lg font-bold">Chatnow</h1>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Hamburger Menu */}
              <button onClick={toggleMobileMenu} className="lg:hidden">
                <span className="text-primary">☰</span>
              </button>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center gap-2">
                {/* Gemini Toggle Button */}
                <button onClick={handleGeminiToggle} className="btn btn-sm gap-2">
                  <Bot className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {showGemini ? "Close Gemini" : "Ask Gemini"}
                  </span>
                </button>

                {/* Astrology Toggle Button */}
                <button onClick={handleAstrologyToggle} className="btn btn-sm gap-2">
                  <SunMoon className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {showAstrology ? "Close Astrology" : "Astrology"}
                  </span>
                </button>

                <button onClick={() => { handleNumerologyToggle(); 
                 }} className="btn btn-sm gap-2">
                     Numerology
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

                {/* NOW IN THE NEW UPDATE---- I HAVE REMOVED THIS HORSCOPE BUTTON..BECUASE THIS SERVICE IS NO LONGER FREE...MAYBE IN SOME OTHER UPDATE --- TRY TO INTRODUCE IT AGAIN... */}
                <button onClick={() => window.open('https://chess-0hn9.onrender.com', '_blank')} className="btn btn-sm gap-2">
                  <span className="hidden sm:inline">♕Chess</span>
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
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 bg-base-100 shadow-lg z-40 p-4">
          <div className="flex flex-col gap-2">
            <button onClick={() => { handleGeminiToggle(); setIsMobileMenuOpen(false); }} className="btn btn-sm gap-2">
              <Bot className="w-4 h-4" />
              {showGemini ? "Close Gemini" : "Ask Gemini"}
            </button>

            <button onClick={() => { handleAstrologyToggle(); setIsMobileMenuOpen(false); }} className="btn btn-sm gap-2">
              <SunMoon className="w-4 h-4" />
              {showAstrology ? "Close Astrology" : "Astrology"}
            </button>
             <button onClick={() => { handleNumerologyToggle();  setIsMobileMenuOpen(false); }} className="btn btn-sm gap-2">
              <SunMoon className="w-4 h-4" />
              {showNumerology ? "Close Numerology" : "Numerology"}
            </button>

            <button onClick={() => { window.open('https://chess-0hn9.onrender.com', '_blank'); setIsMobileMenuOpen(false); }} className="btn btn-sm gap-2">
              ♕ Chess
            </button>

            <button onClick={() => { handleJokeClick(); setIsMobileMenuOpen(false); }} className="btn btn-sm gap-2">
              <Laugh className="w-4 h-4" />
              Joke
            </button>

            <button onClick={() => { navigate("/shorts"); setIsMobileMenuOpen(false); }} className="btn btn-sm gap-2">
              Shorts
            </button>

            <button onClick={() => { handleQuoteClick(); setIsMobileMenuOpen(false); }} className="btn btn-sm gap-2">
              <Quote className="w-4 h-4" />
              Quote
            </button>

            <Link to={"/settings"} onClick={() => setIsMobileMenuOpen(false)} className="btn btn-sm gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} onClick={() => setIsMobileMenuOpen(false)} className="btn btn-sm gap-2">
                  <User className="size-5" />
                  Profile
                </Link>

                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="flex gap-2 items-center">
                  <LogOut className="size-5" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}

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

      {/* Astrology Modal Panel */}
      {showAstrology && (
        <div
          className="fixed right-4 top-20 bottom-6 w-[22rem] max-w-md z-50 
          bg-base-100 text-base-content shadow-xl rounded-2xl p-4 
          border border-base-300 flex flex-col"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">Astrology</h3>
            <button
              onClick={handleAstrologyToggle}
              className="text-red-500 hover:text-red-600"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <AstrologyPage />
          </div>
        </div>
      )}
{/* this is numerology model */}
         {showNumerology && (
        <div className="fixed right-4 top-20 bottom-6 w-[22rem] max-w-md z-50  text-base-content shadow-xl">
          {/* <div className="flex justify-between items-center mb-2"> */}
            {/* <h3 className="font-semibold text-lg">Numerology</h3> */}
            {/* <button onClick={handleNumerologyToggle} className="text-red-500 hover:text-red-600">✕</button> */}
          {/* </div> */}
          <div className="flex-1 overflow-y-auto">
            <LoShuKuaModal isOpen={true} onClose={handleNumerologyToggle} />
          </div>
        </div>
      )}

      {/* Modal for Joke/Quote */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-base-100 p-6 rounded-xl shadow-lg w-full max-w-md border border-base-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{modalTitle}</h2>
              <button onClick={() => setShowModal(false)} className="text-red-500 text-xl">
                ✕
              </button>
            </div>
            <p className="text-base-content whitespace-pre-line">{modalContent}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
