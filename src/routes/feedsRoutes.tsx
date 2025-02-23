import { Route } from 'react-router-dom';
import FeedsPage from '@/pages/feeds/FeedsPage';
import MainPage from '../protectedPages/MainPage';
import ProtectedRoute from '@/components/routes/ProtectedRoute';
import SingleFeedPage from '@/protectedPages/single-feed/SingleFeedPage';
export const FeedsRoutes = (
    <Route path="/" element={<MainPage />} >
      <Route path="feeds" element={<FeedsPage />} />
      <Route path="" element={<ProtectedRoute />} >
        <Route path="messages" element={<h1>nigga</h1>} />
        <Route path="feed/:postId" element={<SingleFeedPage />} />
      </Route>
    </Route>

);   