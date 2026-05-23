import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ArrowUpRight, ChevronDown } from 'lucide-react';
import { useDirection } from '../../hooks/useDirection';
import { motion, AnimatePresence } from 'motion/react';

import logoImg from '../../assets/images/png/logo/logo-agency.png';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { isRTL } = useDirection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { key: 'home', to: '/' },
    { key: 'about', to: '/about' },
    { key: 'services', to: '/services', hasDropdown: true },
    { key: 'work', to: '/work' },
    { key: 'contact', to: '/contact' },
  ];

  const serviceItems = [
    { key: 'arch', to: '/services/architecture' },
    { key: 'graphic', to: '/services/graphic-design' },
    { key: 'web', to: '/services/web-development' },
  ];

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md transition-all duration-300 font-cairo">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-16">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight flex items-center gap-3 group"
          style={{ letterSpacing: isRTL ? '0' : '0.06em' }}
        >
          <img
            src={logoImg}
            alt="Noah Agency Logo"
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="text-xl font-bold tracking-wide text-foreground sm:text-2xl">
            {t('nav.logo', 'نوح')}
            <span className="text-accent">.</span>
          </span>
        </Link>

        {/* روابط التنقل - Desktop */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map(({ key, to, hasDropdown }) => {
            const isActive =
              location.pathname === to ||
              (hasDropdown && location.pathname.startsWith('/services'));

            return (
              <li
                key={key}
                className="relative py-2"
                onMouseEnter={() => hasDropdown && setDropdownOpen(true)}
                onMouseLeave={() => hasDropdown && setDropdownOpen(false)}
              >
                <Link
                  to={to}
                  className={`text-base font-semibold transition-colors duration-300 hover:text-accent flex items-center gap-1.5 ${
                    isActive ? 'text-accent' : 'text-muted-foreground'
                  }`}
                >
                  {t(`nav.links.${key}`)}
                  {hasDropdown && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180 text-accent' : ''}`}
                    />
                  )}
                </Link>

                {isActive && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* القائمة المنسدلة على طراز الوكالات العالمية الفاخرة */}
                {hasDropdown && (
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} // تأثير تنقلي ناعم جداً وجذاب
                        className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} w-80 mt-2 rounded-2xl border border-white/[0.06] bg-background/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl z-50`}
                      >
                        <div className="flex flex-col gap-0.5">
                          {serviceItems.map((item) => (
                            <Link
                              key={item.key}
                              to={item.to}
                              className="block p-3.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-white hover:text-black rounded-xl"
                            >
                              {t(`nav.services.${item.key}`)}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            );
          })}
        </ul>

        {/* أزرار التحكم الجانبية */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 rounded-full border border-border/80 px-4 py-2 text-sm font-bold text-foreground/80 transition-all duration-300 hover:border-accent hover:bg-accent/5 hover:text-accent cursor-pointer"
            aria-label="Switch language"
          >
            <Globe size={15} className="text-accent" />
            <span
              className={i18n.language === 'en' ? 'font-cairo text-[15px]' : ''}
            >
              {i18n.language === 'en' ? 'عربي' : 'English'}
            </span>
          </button>

          <Link
            to="/contact"
            className="hidden items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-md transition-all duration-300 hover:bg-primary/95 hover:shadow-lg lg:flex group"
          >
            <span>{t('nav.cta', 'ابدأ مشروعك')}</span>
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          <button
            className="p-2 rounded-xl border border-border/50 bg-secondary/30 text-foreground lg:hidden transition-colors hover:bg-secondary cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* شاشة الموبايل المتجاوبة */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="absolute top-full left-0 right-0 border-t border-border/50 bg-background/95 backdrop-blur-md px-6 py-8 shadow-2xl shadow-black/10 lg:hidden"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map(({ key, to, hasDropdown }) => {
                const isActive = location.pathname === to;
                return (
                  <li key={key} className="flex flex-col gap-2">
                    <Link
                      to={to}
                      className={`block text-lg font-bold py-2 px-3 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-accent/10 text-accent'
                          : 'text-foreground/80 hover:bg-secondary/50'
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {t(`nav.links.${key}`)}
                    </Link>

                    {hasDropdown && (
                      <div
                        className={`flex flex-col gap-1 ${isRTL ? 'pr-6 border-r' : 'pl-6 border-l'} border-border/60 mt-1 mb-2`}
                      >
                        {serviceItems.map((item) => (
                          <Link
                            key={item.key}
                            to={item.to}
                            className="text-sm font-medium py-2 text-muted-foreground hover:text-accent transition-colors"
                            onClick={() => setMenuOpen(false)}
                          >
                            {t(`nav.services.${item.key}`)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
              <li className="pt-2">
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary py-4 text-center text-base font-bold text-primary-foreground shadow-lg shadow-primary/10"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{t('nav.cta', 'ابدأ مشروعك')}</span>
                  <ArrowUpRight size={16} />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
