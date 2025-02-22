import { Route } from 'react-router-dom';
import UnprotectedRoute from '../components/routes/UnprotectedRoute';
import LoginRegisterPage from '@/pages/login-register/LoginRegisterPage'

const AuthRoutes = (
  <Route path="auth" element={<UnprotectedRoute />}>
    <Route index element={<LoginRegisterPage />} />
  </Route>
)

export default AuthRoutes;
