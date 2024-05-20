import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ErrorComponent = ({ children }: Props) => {
  if (!children) return null;
  return <p className="text-red-500">{children}</p>;
};

export default ErrorComponent;
