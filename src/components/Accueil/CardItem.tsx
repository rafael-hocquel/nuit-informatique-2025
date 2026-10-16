import React, { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  children: ReactNode;
}

const CardItem = ({ ...props }: Props) => {
  return (
    <div className="flex gap-3">
      {props.icon}
      {props.children}
    </div>
  );
};

export default CardItem;
