import React, { ReactNode } from "react";

interface Props {
  type: "sender" | "receiver";
  time: string;
  children: ReactNode;
}

const Bubble = ({ ...props }: Props) => {
  const author = props.type === "sender" ? "Vous" : "ChatBruti";
  return (
    <div
      className={`flex items-start gap-2.5 ${
        props.type === "sender" ? "bg-gray-400" : "bg-gray-300"
      } rounded-2xl`}
    >
      <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 bg-neutral-secondary-soft rounded-e-base rounded-es-base">
        <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-heading">{author}</span>
          <span className="text-sm text-body">{props.time}</span>
        </div>
        <p className="text-sm py-2.5">{props.children}</p>
        <span className="text-xs text-body">Envoyé en tant qu'invité</span>
      </div>
    </div>
  );
};

export default Bubble;
