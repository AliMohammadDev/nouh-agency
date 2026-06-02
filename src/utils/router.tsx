import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import RootLayout from '../components/layout/RootLayout';
import Loading from '../components/Loading';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Work = lazy(() => import('../pages/Work'));
const Contact = lazy(() => import('../pages/Contact'));
const ProjectDetails = lazy(() => import('../pages/ProjectDetails'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'work/:categorySlug?', element: <Work /> },
      { path: 'work/project/:id', element: <ProjectDetails /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
  },
]);
