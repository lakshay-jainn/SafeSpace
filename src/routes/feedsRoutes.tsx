import { Route } from 'react-router-dom';
import FeedsPage from '@/pages/feeds/FeedsPage';
import MainPage from '../protectedPages/MainPage';
import ProtectedRoute from '@/components/routes/ProtectedRoute';
import SingleFeedPage from '@/protectedPages/single-feed/SingleFeedPage';
import CommunityFeeds from '@/pages/feeds/components/CommunityFeeds';
import Feeds from '@/pages/feeds/components/Feeds';


export const FeedsRoutes = (
    <Route path="/" element={<MainPage />} >
      <Route path="" element={<FeedsPage />} >
        <Route path="feeds" element={<Feeds />} />
        <Route path="community/:communityId" element={<CommunityFeeds />} />
      </Route>
      <Route path="" element={<ProtectedRoute />} >
        <Route path="messages" element={<h1>nigga</h1>} />
        <Route path="feed/:postId" element={<SingleFeedPage />} />
      </Route>
    </Route>

);   