import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login-page/login-page';
import './App.scss';
import { AxiosInterceptor } from './tools/axios.interceptor';
import Protected from './tools/protectedRoute';
import { GamePage } from './pages/game-page/game-page';

function App() {
  return (
    <div className="App">
      <AxiosInterceptor>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/game" element={<Protected><GamePage /></Protected>} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
      </AxiosInterceptor>
    </div>
  );
}

export default App;
