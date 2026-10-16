import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SpecCardItem = ({ ...props }: Props) => {
  return <p>- {props.children}</p>;
};

export default SpecCardItem;
