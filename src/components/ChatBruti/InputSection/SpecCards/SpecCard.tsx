import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export function SpecCard({ ...props }: Props) {
  return (
    <div className="flex flex-col justify-start items-start gap-3 py-4 px-6 rounded-xl border-gray-300 border-2 h-[150px] text-wrap w-[300px]">
      <h3 className="font-bold text-lg">{props.title}</h3>
      <div className="flex justify-start items-start flex-col gap">
        {props.children}
      </div>
    </div>
  );
}
