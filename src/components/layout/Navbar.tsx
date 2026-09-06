import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Info,
  Briefcase,
  Phone,
  Layers,
  ArrowUpRight,
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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const { data: majors } = useGetMajors() as { data: Major[] | undefined };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 font-cairo ${
        scrolled
          ? 'border-b border-white/10 bg-[#171717]/90 backdrop-blur-md shadow-lg py-0'
          : 'border-b border-transparent bg-transparent py-1'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
        <Link
          to="/"
          className="flex items-center gap-3 group no-underline hover:no-underline"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src={logoImg}
            alt="Noah Agency Logo"
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="text-xl font-bold tracking-wide text-white sm:text-2xl">
            {t('nav.logo', 'وكالة نوح')}
          </span>
        </Link>

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
                  className={`text-base font-bold transition-colors duration-300 flex items-center gap-1.5 no-underline hover:no-underline ${
                    isActive ? 'text-accent' : 'text-white/90 hover:text-accent'
                  }`}
                >
                  {t(`nav.links.${key}`)}
                  {hasDropdown && (
                    <ChevronDown
                      size={15}
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
                        className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} w-80 mt-2 rounded-2xl border border-white/10 bg-[#1a1a1a] p-2 shadow-2xl z-50 backdrop-blur-xl`}
                      >
                        <div className="flex flex-col gap-0.5">
                          {majors.map((major) => (
                            <Link
                              key={major.id}
                              to={getMajorSlugPath(major)}
                              className="block p-3.5 text-sm font-medium text-white/80 transition-all duration-300 hover:bg-accent hover:text-black rounded-xl no-underline hover:no-underline"
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
          <div className="flex h-10 items-center border border-accent/60 bg-accent/15 backdrop-blur-sm rounded-full p-1 transition-all duration-300 hover:scale-105 shadow-sm">
            <button
              type="button"
              onClick={() => !i18n.language?.startsWith('ar') && i18n.changeLanguage('ar')}
              className={`h-full px-3.5 flex items-center justify-center text-xs font-bold rounded-full transition-all duration-300 ${
                i18n.language?.startsWith('ar')
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'bg-transparent text-white/80 hover:text-white'
              }`}
            >
              عربي
            </button>
            <button
              type="button"
              onClick={() => !i18n.language?.startsWith('en') && i18n.changeLanguage('en')}
              className={`h-full px-3.5 flex items-center justify-center text-xs font-bold rounded-full transition-all duration-300 ${
                i18n.language?.startsWith('en')
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'bg-transparent text-white/80 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <Link
            to="/contact"
            className="hidden lg:flex h-10 items-center justify-center gap-2 rounded-full border border-accent/60 bg-accent/15 backdrop-blur-sm px-5 text-sm font-bold text-accent transition-all duration-300 hover:scale-105 no-underline hover:no-underline shadow-sm"
          >
            <span>{t('nav.cta', 'ابدأ الآن')}</span>
            <ArrowUpRight size={15} className="text-accent" />
          </Link>

          <button
            className="p-2 rounded-xl border border-white/10 text-white lg:hidden bg-white/5 transition-colors duration-200"
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
            className="border-t border-white/10 bg-[#171717] lg:hidden overflow-hidden"
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
                                : 'text-white/80 hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon
                                size={18}
                                className={
                                  isActive
                                    ? 'text-accent'
                                    : 'text-white/60'
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
                                      className="flex items-center gap-2.5 p-3 text-sm font-medium text-white/70 hover:text-white rounded-lg no-underline"
                                    >
                                      <Layers
                                        size={14}
                                        className="text-white/40"
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
                              : 'text-white/80 hover:bg-white/5'
                          }`}
                        >
                          <Icon
                            size={18}
                            className={
                              isActive ? 'text-accent' : 'text-white/60'
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
                className="flex items-center justify-center gap-2 rounded-full border border-accent/60 bg-accent/15 px-6 py-3.5 text-base font-bold text-accent transition-all duration-300 hover:scale-105 no-underline hover:no-underline mt-2 shadow-sm"
              >
                <span>{t('nav.cta', 'ابدأ الآن')}</span>
                <ArrowUpRight size={18} className="text-accent" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
