import { createRoot } from 'react-dom/client';
import { router } from './routes';
import AuthProvider from './Auth/AuthContext';
import './index.css';
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);