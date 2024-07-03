import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TimeLine from './pages/TimeLine';
import Editor from './pages/Editor';
import Viewer from './pages/Map';
import Community from './pages/Community';
import MyMaps from './pages/MyMaps';
import UserProfile from './pages/UserProfile';


const Router = () => {
  const router = createBrowserRouter([
    {
      index: true,
      path: '/',
      element: <TimeLine />,
    },
    {
      index: true,
      path: '/editor',
      element: <Editor />,
    },
    {
      index: true,
      path: '/viewer',
      element: <Viewer />,
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
