import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TimeLine from './pages/TimeLine';
import Community from './pages/Community';
import MyMaps from './pages/MyMaps';
import UserProfile from './pages/UserProfile';
import Map from './pages/Map';


const Router = () => {
  const router = createBrowserRouter([
    {
      index: true,
      path: '/',
      element: <TimeLine />,
    },
    {
      index: true,
      path: '/map',
      element: <Map />,
    },
    {
      index: true,
      path: '/community',
      element: <Community />,
    },
    {
      index: true,
      path: '/my-maps',
      element: <MyMaps />,
    },
    {
      index: true,
      path: '/user',
      element: <UserProfile />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
