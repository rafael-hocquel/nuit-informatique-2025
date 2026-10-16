import React, { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

const PresentationCard = ({ ...props }: Props) => {
  return (
    <div className="kill-zone flex flex-col py-3 px-4 rounded-xl shadow-lg border-2 gap-3 border-gray-200 size-fit bg-[#4b56cb]">
      <div className="kill-zone flex justify-center items-center ">
        <div className="bg-gray-400 rounded-full p-4">{props.icon}</div>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-xl">{props.title}</h2>
        <div className="text-lg gap flex flex-col">{props.children}</div>
      </div>
    </div>
  );
};

export default PresentationCard;
