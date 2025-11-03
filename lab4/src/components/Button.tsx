import React from "react";
import type { StyleInterface } from "../Interfaces/StyleInterface";

interface ButtonProps extends StyleInterface {
  onClick: () => void;
  disabled?: boolean | false;
  children: React.ReactNode;
}

const Button = ({ onClick, children, disabled, ...props }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
export default React.memo(Button);
