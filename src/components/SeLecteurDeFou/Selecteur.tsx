import React, { useRef, useState, useEffect } from "react";

function SelectorN100() {
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  const [shuffledNumbers, setShuffledNumbers] = useState([...numbers]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentVolume, setCurrentVolume] = useState(0);

  // Mute button state
  const [muteSide, setMuteSide] = useState("left"); // "left" or "right"

  // Timer for reshuffle
  const [seconds, setSeconds] = useState(0);

  // Shuffle function
  const shuffleArray = (arr: number[]) => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  // Reshuffle numbers every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShuffledNumbers((prev) => shuffleArray(prev));
      setSeconds((prev) => prev + 3);
    }, 3000); // 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleClick = (num: number) => {
    if (!audioRef.current) return;
    const vol = Math.min(Math.max(num / 100, 0), 1);
    audioRef.current.volume = vol;
    setCurrentVolume(vol);
    audioRef.current.play();
  };

  const handleMuteHover = () => {
    // Move button to opposite side
    setMuteSide((prev) => (prev === "left" ? "right" : "left"));
  };

  const handleMuteClick = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0;
    setCurrentVolume(0);
  };

  return (
    <div className="flex h-full w-full justify-center items-center bg-black flex-col">
      {/* Grid of 100 buttons */}
      <div className="grid grid-cols-10 gap-2 w-[500px] h-[500px] p-2 bg-white">
        {shuffledNumbers.map((num) => (
          <button
            key={num}
            className="w-[40px] h-[40px] bg-gray-300 cursor-pointer border-2 border-black flex justify-center items-center text-sm font-bold"
            onClick={() => handleClick(num)}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Horizontal bar container for mute button */}
      <div className="w-[500px] h-[50px] bg-black mt-4 relative">
        <button
          className="absolute px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-800 select-none"
          style={{
            left: muteSide === "left" ? "0px" : "calc(100% - 80px)", // 80px = approx button width
            top: "50%",
            transform: "translateY(-50%)",
            transition: "left 1s ease",
            cursor: "pointer",
          }}
          onClick={handleMuteClick}
          onMouseEnter={handleMuteHover} // moves on hover
        >
          Mute
        </button>
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />

      {/* Volume and Timer */}
      <div className="mt-2 text-white text-center">
        <div>Current Volume: {(currentVolume * 100).toFixed(0)}%</div>
      </div>
    </div>
  );
}

export default SelectorN100;
