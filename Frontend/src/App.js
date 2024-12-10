import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

const { Footer, Content } = Layout;
const Todo = lazy(() => import('./pages/Todo/Todo'));
const NotFound = lazy(() => import('./pages/common/NotFound'));
const LoadingPage = lazy(() => import('./pages/common/Loading'));

const App = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Content>
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route path="/" element={<Todo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Content>
        <Footer style={{ textAlign: 'center' }}>2024 Created</Footer>
      </Layout>
    </Router>
  );
};

export default App;
