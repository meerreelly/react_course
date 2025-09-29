import type { StyleInterface } from "../Interfaces/StyleInterface";

interface CheckBoxProps extends StyleInterface {
  isChecked: boolean;
  handleCheckboxChange: () => void;
}

const CheckBox = ({
  isChecked,
  handleCheckboxChange,
  ...props
}: CheckBoxProps) => {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={handleCheckboxChange}
      {...props}
    />
  );
};
export default CheckBox;
