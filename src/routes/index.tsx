import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import  AuthRoutes  from './authRoutes';
import { FeedsRoutes } from './feedsRoutes';
import { FrontRoutes } from './mainRoute';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      
      {FrontRoutes}
      {AuthRoutes}
      {FeedsRoutes}
    </>
  )
);