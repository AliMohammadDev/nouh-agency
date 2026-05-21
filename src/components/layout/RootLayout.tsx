import { Outlet } from 'react-router';
import I18nProvider from '../../providers/I18nProvider';
import Navbar from './Navbar';
import Footer from './Footer';

export default function RootLayout() {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
