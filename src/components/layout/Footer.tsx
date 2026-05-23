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
    <footer className="border-t border-primary-foreground/10 bg-primary pt-24 pb-12 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.02),transparent_40%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">
        <div className="grid grid-cols-1 gap-16 pb-20 border-b border-primary-foreground/10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-6">
            <span className="text-3xl font-bold tracking-tight text-white font-mono md:text-4xl">
              AMMAR<span className="text-accent">.</span>
            </span>
            <p className="text-base text-primary-foreground/70 leading-relaxed max-w-sm">
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
                  className="p-3 rounded-xl bg-primary-foreground/5 text-primary-foreground/60 transition hover:bg-accent hover:text-accent-foreground shadow-sm"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-accent mb-8">
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
                    className="text-base text-primary-foreground/70 transition hover:text-accent hover:translate-x-1 inline-block duration-200"
                    style={{ transform: isRTL ? 'none' : undefined }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-accent mb-8">
              {t('footer.titles.services', 'تخصصاتنا')}
            </h4>
            <ul className="flex flex-col gap-4 text-base text-primary-foreground/70">
              <li>{t('footer.serv_list.arch', 'التصميم المعماري المستدام')}</li>
              <li>
                {t('footer.serv_list.interior', 'التصميم الداخلي والديكور')}
              </li>
              <li>
                {t('footer.serv_list.branding', 'الهوية البصرية والجرافيك')}
              </li>
              <li>{t('footer.serv_list.web', 'تطوير وتصميم مواقع الويب')}</li>
            </ul>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-accent mb-8">
                {t('footer.titles.contact', 'المقر الرئيسي')}
              </h4>
              <ul className="flex flex-col gap-5 text-base text-primary-foreground/70">
                <li className="flex items-start gap-4">
                  <MapPin size={20} className="text-accent shrink-0 mt-0.5" />
                  <span>
                    {t('about.map.address', 'حي التصميم والإبداع، الرياض')}
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Mail size={20} className="text-accent shrink-0" />
                  <a
                    href="mailto:hello@studioammar.com"
                    className="hover:text-accent transition-colors"
                  >
                    hello@studioammar.com
                  </a>
                </li>
              </ul>
            </div>

            <button
              onClick={scrollToTop}
              className="self-start mt-10 flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-primary-foreground/50 hover:text-accent transition-colors duration-300 group cursor-pointer"
            >
              <span>{isRTL ? 'إلى الأعلى' : 'Back to top'}</span>
              <div className="p-2.5 rounded-full border border-primary-foreground/10 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                <ArrowUp size={16} className="animate-pulse" />
              </div>
            </button>
          </div>
        </div>

        <div className="pt-12 flex flex-col items-center justify-between gap-6 sm:flex-row text-sm text-primary-foreground/50">
          <span>
            &copy; {currentYear} AMMAR Studio.{' '}
            {t('footer.rights', 'جميع الحقوق محفوظة.')}
          </span>
          <ul className="flex gap-8">
            {['privacy', 'terms', 'sitemap'].map((key) => (
              <li key={key}>
                <a href="#" className="transition hover:text-accent">
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
