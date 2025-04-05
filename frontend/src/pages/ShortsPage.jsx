import React, { useEffect, useRef, useState } from "react";

const ShortsPlayer = () => {
  const playerRef = useRef(null);
  const [shorts, setShorts] = useState([]);
  const [volume, setVolume] = useState(50);
  const [videoList, setVideoList] = useState([]);

  const [query, setQuery] = useState("@MrBeast");

  const API_KEY = "AIzaSyCncCNgBKeYCV_eLFMFk514INNMVZ7DFYs"; // Replace with your key

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      searchShorts(query);
    };
  }, []);

  const searchShorts = async (searchQuery) => {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&videoDuration=short&maxResults=10&key=${API_KEY}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    const videoIds = data.items
      .filter((item) => item.id.videoId)
      .map((item) => item.id.videoId);
    setShorts(videoIds);
    setVideoList(videoIds);
    if (videoIds.length > 0) initPlayer(videoIds[0], videoIds);
  };

  const initPlayer = (videoId, videoList) => {
    playerRef.current = new window.YT.Player("yt-player", {
      height: "100%",
      width: "100%",
      videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        mute: 0,
        playsinline: 1,
        rel: 0,
        fs: 1, // allow fullscreen
        modestbranding: 1, // cleaner player
      },
      events: {
        onReady: (e) => {
          e.target.setVolume(volume);
        },
        onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              const currentId = playerRef.current.getVideoData().video_id;
              const currentIndex = videoList.indexOf(currentId);
              const nextIndex = (currentIndex + 1) % videoList.length;
              playerRef.current.loadVideoById(videoList[nextIndex]);
            }
          }
          ,
      },
    });
  };

  const handleNext = () => {
    const currentId = playerRef.current.getVideoData().video_id;
    const currentIndex = shorts.indexOf(currentId);
    const nextIndex = (currentIndex + 1) % shorts.length;
    playerRef.current.loadVideoById(shorts[nextIndex]);
  };

  const handlePrevious = () => {
    const currentId = playerRef.current.getVideoData().video_id;
    const currentIndex = shorts.indexOf(currentId);
    const prevIndex = (currentIndex - 1 + shorts.length) % shorts.length;
    playerRef.current.loadVideoById(shorts[prevIndex]);
  };

  const handleSearch = () => {
    if (playerRef.current && playerRef.current.destroy) {
      playerRef.current.destroy();
    }
    searchShorts(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black text-white overflow-hidden">
      {/* Player */}
      <div id="yt-player" className="w-full h-full"></div>

      {/* Overlay Controls */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        {/* Search Box */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-2 items-center bg-black/70 px-4 py-2 rounded-md shadow-md backdrop-blur-md pointer-events-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search by channel or keyword"
            className="bg-white/10 border border-white/20 px-3 py-1 rounded-md text-sm text-white placeholder:text-white/50"
          />
          <button
            onClick={handleSearch}
            className="bg-white text-black px-3 py-1 rounded-md text-sm font-semibold"
          >
            Load
          </button>
        </div>

        {/* Volume Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => {
            setVolume(e.target.value);
            if (playerRef.current) {
              playerRef.current.setVolume(e.target.value);
            }
          }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-64 pointer-events-auto"
        />

        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 px-4 py-2 rounded-md text-sm font-medium z-50 backdrop-blur-md pointer-events-auto"
        >
          ◀️ Previous Video
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 px-4 py-2 rounded-md text-sm font-medium z-50 backdrop-blur-md pointer-events-auto"
        >
          Next Video ▶️
        </button>
      </div>
    </div>
  );
};

export default ShortsPlayer;
