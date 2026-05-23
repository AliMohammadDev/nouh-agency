import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ArrowUpRight, ChevronDown } from 'lucide-react';
import { useDirection } from '../../hooks/useDirection';
import { motion, AnimatePresence } from 'motion/react';
import { useGetMajors } from '../../api/major';
interface Category {
  id: number;
  name: string;
  description: string;
}

interface Major {
  id: number;
  name: string;
  description: string;
  categories: Category[];
}

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { isRTL } = useDirection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const { data: majors } = useGetMajors() as { data: Major[] | undefined };

  const navLinks = [
    { key: 'home', to: '/' },
    { key: 'about', to: '/about' },
    { key: 'work', to: '/work', hasDropdown: true },
    { key: 'contact', to: '/contact' },
  ];

  //
  const getMajorSlugPath = (major: Major) => {
    const nameLower = major.name.toLowerCase();
    if (nameLower.includes('عمار') || nameLower.includes('arch'))
      return '/work/architecture';
    if (nameLower.includes('جرافيك') || nameLower.includes('graphic'))
      return '/work/graphic-design';
    if (nameLower.includes('ويب') || nameLower.includes('web'))
      return '/work/web-development';
    return `/work/${major.id}`;
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md font-cairo">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-16">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight flex items-center gap-3 group"
        >
          <span className="text-xl font-bold tracking-wide text-foreground sm:text-2xl">
            {t('nav.logo', 'نوح')}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map(({ key, to, hasDropdown }) => {
            const isActive =
              location.pathname === to ||
              (hasDropdown && location.pathname.startsWith('/work'));

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

                {hasDropdown && (
                  <AnimatePresence>
                    {dropdownOpen && majors && majors.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} w-80 mt-2 rounded-2xl border border-white/[0.06] bg-background/95 p-2 shadow-2xl z-50 backdrop-blur-xl`}
                      >
                        <div className="flex flex-col gap-0.5">
                          {majors.map((major) => (
                            <Link
                              key={major.id}
                              to={getMajorSlugPath(major)}
                              className="block p-3.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-white hover:text-black rounded-xl"
                            >
                              {major.name}
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

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 rounded-full border border-border/80 px-4 py-2 text-sm font-bold text-foreground/80 transition-all duration-300 hover:border-accent"
          >
            <Globe size={15} className="text-accent" />
            <span>{i18n.language === 'en' ? 'عربي' : 'English'}</span>
          </button>

          <Link
            to="/contact"
            className="hidden lg:flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-all"
          >
            <span>{t('nav.cta', 'ابدأ مشروعك')}</span>
            <ArrowUpRight size={14} />
          </Link>

          <button
            className="p-2 rounded-xl border lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
