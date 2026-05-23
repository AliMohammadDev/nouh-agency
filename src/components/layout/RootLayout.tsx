import { Outlet } from 'react-router-dom';
import I18nProvider from '../../providers/I18nProvider';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';

export default function RootLayout() {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Outlet />
        </main>

        <Footer />

        <ScrollToTopButton />
      </div>
    </I18nProvider>
  );
}
