import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ChatBrutiIcon = () => {
  const router = useRouter();
  return (
    <div
      className="fixed bottom-10 z-50 right-10 cursor-pointer p-6 bg-green-400 rounded-full border-2 border-gray-200"
      onClick={() => router.push("/chatbruti")}
    >
      <MessageCircle />
    </div>
  );
};

export default ChatBrutiIcon;
