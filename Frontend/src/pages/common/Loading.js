import { Flex } from 'antd';
import Loading from '@/components/common/Loading';

const LoadingPage = ({ message = 'Loading...' }) => (
  <Flex vertical justify="center" align="center" style={{ height: '100vh' }}>
    <Loading message={message} />
  </Flex>
);

export default LoadingPage;
