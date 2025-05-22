//so the first thing we gonna have is that the theme section where we gonna have the theme selector
//and then we gonna have the language section where we gonna have the language selector
//and then we gonna have the logout button



// import React from 'react'

// const PREVIEW_MESSAGES = [
//     {id:1, content: "Hello, how are you?",isSent: false},
//     {id:2, content: "I am fine, thank you!",isSent: true},
//     {id:3, content: "What is your name?",isSent: false},
//     {id:4, content: "My name is John Doe",isSent: true},
//     {id:5, content: "What is your age?",isSent: false},
//     {id:6, content: "I am 20 years old",isSent: true},

// ]


// const SettingsPage = () => {
//   const {theme, setTheme} = useThemeStore();
//   return (
//     <div>
//         <div className='flex flex-col gap-4'>
//             <h1 className='text-2xl font-bold'>Settings</h1>
//             <div className='flex flex-col gap-2'>
//                 <label htmlFor='theme'>Theme</label>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default SettingsPage



import { THEMES } from "../constants"; //this is comming from the constants folder which we have maded -- index file
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

//since we have saved the theme on the locastorage..so after refressing it we gonna have same theme

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hello user....Do you like this webiste", isSent: false },
  { id: 2, content: "This website was build by Sparsh Sharma..do message him your feedback...", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => ( //we will gonna map through each of the themes and then we will gonna have a button for
          //  each of the theme
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}

                
              `}
              //it basically signifies that if the theme which we have in the localstorage ,, if that themese
            //is equal to the theme which we are currently on..then we will gonna have a bg-base-200 
              onClick={() => setTheme(t)}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Preview Section ---this is only the display section and need not to work much on it*/}
        <h3 className="text-lg font-semibold mb-3">Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">USER</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`
                            text-[10px] mt-1.5
                            ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                          `}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-primary h-10 min-h-0">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
