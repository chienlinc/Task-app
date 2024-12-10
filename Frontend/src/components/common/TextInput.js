import { Input } from 'antd';

const TextInput = ({
  placeholder = 'placeholder',
  type = 'text',
  maxLength = 30,
  value,
  onChange,
  showCount = true,
}) => {
  return (
    <Input
      placeholder={placeholder}
      showCount={showCount}
      maxLength={maxLength}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;
