import { Spin } from 'antd';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <>
      <Spin size="large" />
      <p>{message}</p>
    </>
  );
};

export default Loading;
