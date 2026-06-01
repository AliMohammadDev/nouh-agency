import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import I18nProvider from '../../providers/I18nProvider';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';
import Loading from '../Loading';

export default function RootLayout() {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-background text-foreground relative">
        <Navbar />

        <main className="min-h-[80vh]">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </main>

        <Footer />

        <ScrollToTopButton />
      </div>
    </I18nProvider>
  );
}
