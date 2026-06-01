import RootLayout from '../components/layout/RootLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Work from '../pages/Work';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import { createBrowserRouter } from 'react-router-dom';
import ProjectDetails from '../pages/ProjectDetails';
import Loading from '../components/Loading';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'work/:categorySlug?', Component: Work },
      { path: 'work/project/:id', Component: ProjectDetails },
      { path: 'contact', Component: Contact },
      { path: '*', Component: NotFound },
      { path: '/loading', Component: Loading },
    ],
  },
]);
