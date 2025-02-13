import { Route } from 'react-router-dom';
import Feeds from '../protectedPages/feeds/components/Feeds';
import ProtectedRoute from '../components/routes/ProtectedRoute';
import MainPage from '../protectedPages/MainPage';
export const FeedsRoutes = (
   <Route path="/" element={<ProtectedRoute />}>
    <Route element={<MainPage />} >
      <Route path="feeds" element={<Feeds />} />
    </Route>

   </Route>
);   