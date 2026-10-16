import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  textColor?: string;
}

const Subtitle = ({ ...props }: Props) => {
  return (
    <h2
      className="font-normal md:font-semibold text-sm sm:text-md text-center md:text-lg"
      style={{ color: props.textColor }}
    >
      {props.children}
    </h2>
  );
};

export default Subtitle;
