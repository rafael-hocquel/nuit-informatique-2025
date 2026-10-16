"use client";
import React, { useState, useRef, useEffect } from "react";

const azertyToQwerty: Record<string, string> = {
  a: "q",
  z: "w",
  e: "e",
  r: "r",
  t: "t",
  y: "y",
  u: "u",
  i: "i",
  o: "o",
  p: "p",
  q: "a",
  s: "s",
  d: "d",
  f: "f",
  g: "g",
  h: "h",
  j: "j",
  k: "k",
  l: "l",
  m: ";",
  w: "z",
  x: "x",
  c: "c",
  v: "v",
  b: "b",
  n: "n",
};

const TrollInput = ({
  onValueChange,
}: {
  onValueChange: (val: string) => void;
}) => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!inputRef.current) return;
      const randomPos = Math.floor(Math.random() * (value.length + 1));
      inputRef.current.selectionStart = randomPos;
      inputRef.current.selectionEnd = randomPos;
    }, 300);
    return () => clearInterval(interval);
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key.toLowerCase();

    if (e.ctrlKey && key === "v") return;
    if (e.ctrlKey || e.key === "Control") return;

    if (e.key === "Backspace") {
      e.preventDefault();
      const cursor = inputRef.current?.selectionStart ?? value.length;
      const newVal = value.slice(0, cursor - 1) + value.slice(cursor);
      setValue(newVal);
      onValueChange(newVal);
      return;
    }

    if (azertyToQwerty[key]) {
      e.preventDefault();
      const cursor = inputRef.current?.selectionStart ?? value.length;
      const mapped = azertyToQwerty[key];
      const newVal = value.slice(0, cursor) + mapped + value.slice(cursor);
      setValue(newVal);
      onValueChange(newVal);
      return;
    }

    e.preventDefault();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    const cursor = inputRef.current?.selectionStart ?? value.length;
    const newVal = value.slice(0, cursor) + text + value.slice(cursor);
    setValue(newVal);
    onValueChange(newVal);
  };

  return (
    <input
      ref={inputRef}
      className="border p-2 rounded w-full"
      value={value}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onChange={() => {}}
      placeholder="Tape ici !"
    />
  );
};

export default TrollInput;
