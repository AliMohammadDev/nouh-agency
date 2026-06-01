import RootLayout from '../components/layout/RootLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import Work from '../pages/Work';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import { createBrowserRouter } from 'react-router-dom';
import ProjectDetails from '../pages/ProjectDetails';
import VrViewer from '../components/VrViewer';

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

      { path: 'vr-test', Component: VrViewer },
    ],
  },
]);
