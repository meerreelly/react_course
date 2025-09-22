import type { StyleInterface } from "../Interfaces/StyleInterface";

interface ButtonProps extends StyleInterface {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ onClick, children, ...props }: ButtonProps) => {
  return (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  );
};
export default Button;
