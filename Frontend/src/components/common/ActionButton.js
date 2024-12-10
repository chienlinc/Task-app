import { Button } from 'antd';

const ActionButton = ({
  label = 'Action',
  type = 'default',
  disabled = false,
  onClick,
}) => {
  return (
    <Button type={type} onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
};

export default ActionButton;
