import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import  AuthRoutes  from './authRoutes';
import { FeedsRoutes } from './feedsRoutes';
import { FrontRoutes } from './mainRoute';
import { NotFoundRoute } from './notFoundRoute';
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      
      {FrontRoutes}
      {AuthRoutes}
      {FeedsRoutes}
      {NotFoundRoute}
    </>
  )
);