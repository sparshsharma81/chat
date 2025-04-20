import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null); // this is the ref for the file input
  const { sendMessage } = useChatStore(); // this is the send message function from the chat store

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // this is the file that we will get from the file input
    if (!file.type.startsWith("image/")) { // this is the check for the file type
      toast.error("Please select an image file"); // this is the toast error for the file type
      return;
    }

    const reader = new FileReader(); // this is the reader for the file
    reader.onloadend = () => {
      setImagePreview(reader.result); // this is the set image preview for the image preview
    };
    reader.readAsDataURL(file); // this is the read as data URL for the file
  };

  const removeImage = () => {
    setImagePreview(null); // this is the set image preview for the image preview
    if (fileInputRef.current) fileInputRef.current.value = ""; // this is the check for the file input 
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          {/* Ensure the image button is visible on mobile too */}
          <button
            type="button"
            className={`sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"} flex items-center justify-center`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
