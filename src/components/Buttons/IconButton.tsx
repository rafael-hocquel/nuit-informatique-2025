"use client";
import React, { ReactNode, useState } from "react";

interface Props {
  icon: ReactNode;
  padding: number;
  hoverColor: string;
  visualEffects: "all" | "hover" | "active" | "none";
  onClick: () => void;
}

const IconButton = ({ ...props }: Props) => {
  const [bgColor, setBgColor] = useState("");

  const hoverActive =
    props.visualEffects === "all" || props.visualEffects === "hover";
  const activeActive =
    props.visualEffects === "all" || props.visualEffects === "active";
  return (
    <button
      className={`kill-zone flex justify-center items-center rounded-full cursor-pointer ${
        activeActive && "active:scale-97"
      } transition-all duration-250`}
      style={{ padding: props.padding, backgroundColor: bgColor }}
      onMouseEnter={() => hoverActive && setBgColor(props.hoverColor)}
      onMouseLeave={() => setBgColor("")}
      onClick={() => props.onClick()}
    >
      {props.icon}
    </button>
  );
};

export default IconButton;
