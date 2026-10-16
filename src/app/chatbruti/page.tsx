"use client";
import FullInputSection from "@/src/components/ChatBruti/InputSection/FullInputSection";
import React, { useEffect, useState } from "react";
import geminiRequest from "../../functions/geminiRequest";

interface Message {
  type: "sender" | "receiver";
  text: string;
  date: string;
}

const page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();

  useEffect(() => {
    const lastMessage = messages[0];

    const getResponse = async () => {
      setShowLoader(true);
      const response = await geminiRequest(lastMessage.text);
      setMessages([
        {
          type: "receiver",
          text:
            response ||
            "Flemme de répondre, laisse moi me reposer et réessaye plus tard",
          date: hour.toString() + ":" + min.toString(),
        },
        ...messages,
      ]);
      setShowLoader(false);
    };
    if (messages.length > 0 && lastMessage.type === "sender") {
      getResponse();
    }
  }, [messages]);
  const [showLoader, setShowLoader] = useState(false);
  return (
    <div
      className={`${
        messages.length > 0 && "h-full"
      } pb-30 w-[90%] md:w-4/5 flex justify-center items-center`}
    >
      {/* Input Section */}
      <FullInputSection
        setShowLoader={(value) => setShowLoader(value)}
        showLoader={showLoader}
        messages={messages}
        onSubmit={(value) => {
          setMessages([
            {
              type: "sender",
              text: value,
              date: hour.toString().padStart(2, "0") + ":" + min.toString(),
            },
            ...messages,
          ]);
        }}
      />
    </div>
  );
};

export default page;
