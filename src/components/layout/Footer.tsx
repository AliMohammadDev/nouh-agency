import { useTranslation } from 'react-i18next';
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowUp,
  Mail,
  MapPin,
} from 'lucide-react';
import { useDirection } from '../../hooks/useDirection';

export default function Footer() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-accent/10 bg-zinc-950 pt-24 pb-12 text-white relative overflow-hidden font-cairo">
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-accent)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-accent)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="absolute top-0 left-1/4 h-full w-[1px] bg-accent/[0.02] pointer-events-none" />
      <div className="absolute top-0 right-1/4 h-full w-[1px] bg-accent/[0.02] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">
        <div className="grid grid-cols-1 gap-16 pb-20 border-b border-accent/10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-6">
            <span className="text-3xl font-extrabold tracking-tight text-white md:text-4xl font-cairo">
              {t('nav.logo')}
              <span className="text-accent">.</span>
            </span>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm font-cairo">
              {t(
                'footer.about_text',
                'استوديو إبداعي متكامل يدمج بين أصالة التصميم المعماري والداخلي، وقوة الحلول الرقمية في الجرافيك وتطوير الويب.'
              )}
            </p>
            <div className="flex gap-4 mt-2">
              {[
                { Icon: Instagram, href: '#' },
                { Icon: Linkedin, href: '#' },
                { Icon: Facebook, href: '#' },
                { Icon: Twitter, href: '#' },
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="p-3 bg-zinc-900 border border-accent/10 text-zinc-400 transition hover:bg-accent hover:text-white rounded-xl shadow-sm"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-8 font-cairo">
              {t('footer.titles.explore', 'استكشف')}
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: t('nav.links.about', 'عن الشركة'), href: '/about' },
                {
                  label: t('nav.links.services', 'خدماتنا'),
                  href: '/services',
                },
                { label: t('nav.links.work', 'أعمالنا'), href: '/work' },
                { label: t('nav.links.contact', 'اتصل بنا'), href: '/contact' },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-400 transition hover:text-accent hover:translate-x-1 inline-block duration-200 font-cairo"
                    style={{ transform: isRTL ? 'none' : undefined }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-8 font-cairo">
              {t('footer.titles.services', 'تخصصاتنا')}
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-zinc-400 font-cairo">
              <li className="hover:text-accent transition-colors duration-200 cursor-default">
                {t('footer.serv_list.arch', 'التصميم المعماري المستدام')}
              </li>
              <li className="hover:text-accent transition-colors duration-200 cursor-default">
                {t('footer.serv_list.interior', 'التصميم الداخلي والديكور')}
              </li>
              <li className="hover:text-accent transition-colors duration-200 cursor-default">
                {t('footer.serv_list.branding', 'الهوية البصرية والجرافيك')}
              </li>
              <li className="hover:text-accent transition-colors duration-200 cursor-default">
                {t('footer.serv_list.web', 'تطوير وتصميم مواقع الويب')}
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-8 font-cairo">
                {t('footer.titles.contact', 'المقر الرئيسي')}
              </h4>
              <ul className="flex flex-col gap-5 text-sm text-zinc-400 font-cairo">
                <li className="flex items-start gap-4">
                  <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                  <span>
                    {t('about.map.address', 'حي التصميم والإبداع، الرياض')}
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Mail size={18} className="text-accent shrink-0" />
                  <a
                    href="mailto:hello@noahagency.com"
                    className="hover:text-accent transition-colors duration-200"
                  >
                    hello@noahagency.com
                  </a>
                </li>
              </ul>
            </div>

            <button
              onClick={scrollToTop}
              className="self-start mt-10 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-accent transition-colors duration-300 group cursor-pointer font-cairo"
            >
              <span>{isRTL ? 'إلى الأعلى' : 'Back to top'}</span>
              <div className="p-2 bg-zinc-900 border border-accent/10 rounded-full group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <ArrowUp size={14} className="animate-pulse" />
              </div>
            </button>
          </div>
        </div>

        <div className="pt-12 flex flex-col items-center justify-between gap-6 sm:flex-row text-xs text-zinc-500 font-cairo">
          <span>
            &copy; {currentYear} {t('nav.logo')} Studio.{' '}
            {t('footer.rights', 'جميع الحقوق محفوظة.')}
          </span>
          <ul className="flex gap-8">
            {['privacy', 'terms', 'sitemap'].map((key) => (
              <li key={key}>
                <a
                  href="#"
                  className="transition hover:text-accent duration-200"
                >
                  {t(`footer.links.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
