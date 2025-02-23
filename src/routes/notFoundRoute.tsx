import { Route } from 'react-router-dom';
import NotFoundPage from '@/pages/not-found/NotFoundPage';
export const NotFoundRoute = (
    <Route path="*" element={<NotFoundPage />}>
    </Route>
 );   