import type { StyleInterface } from "../Interfaces/StyleInterface";

interface InputProps extends StyleInterface {
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input = ({ ...props }: InputProps) => {
  return <input {...props}/>;
};

export default Input;
