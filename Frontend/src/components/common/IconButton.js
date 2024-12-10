import { Button } from 'antd';

const IconButton = ({
  type = 'default',
  disabled = false,
  icon,
  size = 'default',
  onClick,
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      icon={icon}
      size={size}
    />
  );
};

export default IconButton;
