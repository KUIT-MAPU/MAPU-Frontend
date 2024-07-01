import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TimeLine from './pages/TimeLine';
import Editor from './pages/Editor';
import Viewer from './pages/Viewer';
import Community from './pages/Community';
import MyMaps from './pages/MyMaps';
import FileManager from './pages/FileManager';

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
      path: '/file-manager',
      element: <FileManager />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
