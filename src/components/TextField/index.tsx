import React, { ChangeEvent } from "react";

type Props = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

const TextField: React.FC<Props> = ({
  placeholder = "Enter value...",
  value,
  onChange,
  onFocus = () => {},
  onBlur = () => {},
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      className="input bg-transparent text-white w-full"
      type="text"
      onBlur={onBlur}
      onFocus={onFocus}
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
    />
  );
};

export default TextField;
