import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login-page/login-page';
import './App.scss';
import { AxiosInterceptor } from './tools/axios.interceptor';
import { GameOutlet } from './pages/game-outlet/game-outlet';
import Protected from './tools/protectedRoute';
import { GamePage } from './pages/game-page/game-page';
import CharacterGuard from './tools/characterGuard';

function App() {
  return (
    <div className="App">
      <AxiosInterceptor>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/game" element={<Protected><GameOutlet /></Protected>}>
                <Route path="play" element={<CharacterGuard><GamePage /></CharacterGuard>} />
              </Route>
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
      </AxiosInterceptor>
    </div>
  );
}

export default App;
