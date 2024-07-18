import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome';
import TimeLine from './pages/TimeLine/TimeLine';
import Map from './pages/Map';
import Explore from './pages/Explore/Explore';
import UserProfile from './pages/UserProfile/UserProfile';
import Login from './pages/login/Login';

const Router = () => {
  const router = createBrowserRouter([
    {
      index: true,
      path: '/',
      element: <Welcome />,
    },
    {
      index: true,
      path: '/timeline',
      element: <TimeLine />,
    },
    {
      index: true,
      path: '/map/:mapId',
      element: <Map />,
    },
    {
      index: true,
      path: '/explore',
      element: <Explore />,
    },
    {
      index: true,
      path: '/user/:userId',
      element: <UserProfile />,
    },
    {
      index: true,
      path: '/kakao/callback',
      element: <Login />,
    },
    {
      index: true,
      path: '/google/callback',
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
