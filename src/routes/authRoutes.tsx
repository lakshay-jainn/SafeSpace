import { Route } from 'react-router-dom';
import Login from '../pages/loginpage/Login';
import Register from '../pages/registerpage/Register';
import UnprotectedRoute from '../components/routes/UnprotectedRoute'

export const AuthRoutes = (
  <Route path="/auth" element={<UnprotectedRoute />}>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </Route>
);