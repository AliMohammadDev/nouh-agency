import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import I18nProvider from '../../providers/I18nProvider';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';
import Loading from '../Loading';

export default function RootLayout() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <I18nProvider>
      <div className="min-h-screen bg-background text-foreground relative">
        {isTransitioning && <Loading />}

        <Navbar />

        <main
          className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        >
          <Outlet />
        </main>

        <Footer />

        <ScrollToTopButton />
      </div>
    </I18nProvider>
  );
}
