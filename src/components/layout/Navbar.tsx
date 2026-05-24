import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Globe,
  ArrowUpRight,
  ChevronDown,
  Home,
  Info,
  Briefcase,
  Phone,
  Layers,
} from 'lucide-react';
import { useDirection } from '../../hooks/useDirection';
import { motion, AnimatePresence } from 'motion/react';
import { useGetMajors } from '../../api/major';
import logoImg from '../../assets/images/png/logo/logo-agency.png';

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
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const location = useLocation();

  const { data: majors } = useGetMajors() as { data: Major[] | undefined };

  const navLinks = [
    { key: 'home', to: '/', icon: Home },
    { key: 'about', to: '/about', icon: Info },
    { key: 'work', to: '/work', hasDropdown: true, icon: Briefcase },
    { key: 'contact', to: '/contact', icon: Phone },
  ];

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-[#1c1c1c] backdrop-blur-md font-cairo">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-16">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight flex items-center gap-3 group no-underline hover:no-underline"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src={logoImg}
            alt="Noah Agency Logo"
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="text-xl font-bold tracking-wide text-white sm:text-2xl">
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
                  className={`text-base font-semibold transition-colors duration-300 hover:text-accent flex items-center gap-1.5 no-underline hover:no-underline ${
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

                {hasDropdown && (
                  <AnimatePresence>
                    {dropdownOpen && majors && majors.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} w-80 mt-2 rounded-2xl border border-white/[0.06] bg-[#1a1a1a] p-2 shadow-2xl z-50 backdrop-blur-xl`}
                      >
                        <div className="flex flex-col gap-0.5">
                          {majors.map((major) => (
                            <Link
                              key={major.id}
                              to={getMajorSlugPath(major)}
                              className="block p-3.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-accent hover:text-black rounded-xl no-underline hover:no-underline"
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
            className="flex items-center gap-2 rounded-full border border-border/80 px-4 py-2 text-sm font-bold text-white transition-all duration-300 hover:border-accent"
          >
            <Globe size={15} className="text-accent" />
            <span>{i18n.language === 'en' ? 'عربي' : 'English'}</span>
          </button>

          <Link
            to="/contact"
            className="hidden lg:flex items-center gap-1.5 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-black hover:bg-accent hover:text-accent-foreground transition-all no-underline hover:no-underline"
          >
            <span>{t('nav.cta', 'ابدأ مشروعك')}</span>
            <ArrowUpRight size={14} />
          </Link>

          <button
            className="p-2 rounded-xl border border-border/40 text-white lg:hidden bg-white/5 transition-colors duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border/20 bg-[#1c1c1c] lg:hidden overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              <ul className="flex flex-col gap-2">
                {navLinks.map(({ key, to, hasDropdown, icon: Icon }) => {
                  const isActive =
                    location.pathname === to ||
                    (hasDropdown && location.pathname.startsWith('/work'));

                  return (
                    <li key={key} className="flex flex-col">
                      {hasDropdown ? (
                        <div>
                          <button
                            onClick={() =>
                              setMobileDropdownOpen(!mobileDropdownOpen)
                            }
                            className={`w-full flex items-center justify-between p-3.5 rounded-xl font-semibold text-base transition-colors duration-200 ${
                              isActive
                                ? 'bg-accent/10 text-accent'
                                : 'text-muted-foreground hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon
                                size={18}
                                className={
                                  isActive
                                    ? 'text-accent'
                                    : 'text-muted-foreground'
                                }
                              />
                              <span>{t(`nav.links.${key}`)}</span>
                            </div>
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-300 ${mobileDropdownOpen ? 'rotate-180 text-accent' : ''}`}
                            />
                          </button>

                          <AnimatePresence>
                            {mobileDropdownOpen && majors && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden bg-black/20 rounded-xl mt-1 mx-2"
                              >
                                <div className="p-2 flex flex-col gap-1">
                                  {majors.map((major) => (
                                    <Link
                                      key={major.id}
                                      to={getMajorSlugPath(major)}
                                      onClick={() => setMenuOpen(false)}
                                      className="flex items-center gap-2.5 p-3 text-sm font-medium text-muted-foreground hover:text-white rounded-lg no-underline"
                                    >
                                      <Layers
                                        size={14}
                                        className="text-muted-foreground/60"
                                      />
                                      {major.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          to={to}
                          onClick={() => setMenuOpen(false)}
                          className={`flex items-center gap-3 p-3.5 rounded-xl font-semibold text-base transition-all duration-200 no-underline hover:no-underline ${
                            isActive
                              ? 'bg-accent/10 text-accent'
                              : 'text-muted-foreground hover:bg-white/5'
                          }`}
                        >
                          <Icon
                            size={18}
                            className={
                              isActive ? 'text-accent' : 'text-muted-foreground'
                            }
                          />
                          <span>{t(`nav.links.${key}`)}</span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>

              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-bold text-black hover:bg-accent hover:text-accent-foreground transition-all no-underline hover:no-underline mt-2"
              >
                <span>{t('nav.cta', 'ابدأ مشروعك')}</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
