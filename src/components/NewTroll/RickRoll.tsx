"use client";
import { useEffect, useState } from "react";

const RickRoll = ({ onFinish }: { onFinish: () => void }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      onFinish();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (loading) {
    return (
      <img
        className="w-screen h-screen object-cover"
        src="rickroll-roll.gif"
        alt="RickRoll"
      />
    );
  }

  return null;
};

export default RickRoll;
