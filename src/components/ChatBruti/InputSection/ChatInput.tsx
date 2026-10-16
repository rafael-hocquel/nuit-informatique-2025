"use client";
import React from "react";
import IconButton from "../../Buttons/IconButton";
import { CornerDownLeft } from "lucide-react";

interface Props {
  bottom: boolean;
  onSubmit: (value: string) => void;
}

interface Message {
  type: "sender" | "receiver";
  text: string;
  date: string;
}

const ChatInput = ({ ...props }: Props) => {
  const [value, setValue] = React.useState("");

  return (
    <div
      className={`${
        props.bottom ? "absolute flex bottom-10 w-4/5" : "flex w-full"
      } justify-between items-center border-gray-200 border-2 rounded-full py-2 px-4`}
    >
      <input
        placeholder="Entrez votre question ici..."
        className="py-2 px-4 w-full outline-none"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            props.onSubmit(value);
            setValue("");
          }
        }}
        value={value}
      />
      <IconButton
        icon={<CornerDownLeft />}
        padding={8}
        visualEffects="all"
        hoverColor="#d7d7d7"
        onClick={() => {
          props.onSubmit(value);
          setValue("");
        }}
      />
    </div>
  );
};

export default ChatInput;
