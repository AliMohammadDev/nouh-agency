import { useTranslation } from 'react-i18next';
import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Youtube,
  Facebook,
} from 'lucide-react';
import { useDirection } from '../../hooks/useDirection';

export default function Footer() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  const currentYear = new Date().getFullYear();

  const socialAccounts = [
    {
      type: 'lucide',
      Icon: Instagram,
      href: 'https://www.instagram.com/nouharchitects',
      label: 'Instagram',
    },
    {
      type: 'svg',
      svgPath: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M22 13.833h-6c0 1.5.833 2.5 2.5 2.5 1.167 0 1.833-.5 2.167-1.167h1.666C21.833 17 20 19 18.5 19c-3 0-4.5-2.083-4.5-5s1.5-5 4.5-5c2.833 0 4 2.083 4 4.5v.333zM18.5 10.5c-1.333 0-2.167.833-2.333 2.167h4.5c0-1.334-.833-2.167-2.167-2.167zm-10 1c1 .333 1.5 1.167 1.5 2.333 0 2.167-1.5 3.167-4 3.167H1v-12h4.5c2.333 0 3.667.833 3.667 2.667 0 1.166-.667 1.833-1.667 2.166zm-5-3.333v2.166h2c.833 0 1.5-.333 1.5-1.083 0-.667-.5-1.083-1.5-1.083h-2zm0 4.166v2.5h2.167c1 0 1.666-.333 1.666-1.166 0-.917-.666-1.334-1.666-1.334H3.5zm11.333-6h6V8h-6V6.333z" />
        </svg>
      ),
      href: 'https://www.behance.net/NouhArchitects',
      label: 'Behance',
    },
    {
      type: 'lucide',
      Icon: Linkedin,
      href: 'https://www.linkedin.com/in/nouharchitects',
      label: 'LinkedIn',
    },
    {
      type: 'svg',
      svgPath: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: 'https://twitter.com/NouhArchitects',
      label: 'X (Twitter)',
    },
    {
      type: 'lucide',
      Icon: Youtube,
      href: 'https://www.youtube.com/@nouh.architects',
      label: 'YouTube',
    },
    {
      type: 'svg',
      svgPath: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12.017 0C5.396 0 0 5.396 0 12.017c0 5.082 3.158 9.388 7.618 11.116-.102-.949-.195-2.408.041-3.443.213-.932 1.373-5.819 1.373-5.819s-.351-.703-.351-1.744c0-1.633.948-2.853 2.125-2.853 1.002 0 1.486.753 1.486 1.656 0 1.008-.642 2.514-.974 3.908-.276 1.171.589 2.124 1.744 2.124 2.094 0 3.707-2.207 3.707-5.398 0-2.822-2.029-4.793-4.92-4.793-3.35 0-5.315 2.513-5.315 5.109 0 1.012.39 2.099.877 2.691.096.117.109.22.08.34-.088.366-.284 1.157-.323 1.316-.051.21-.17.254-.392.151-1.463-.68-2.378-2.815-2.378-4.532 0-3.69 2.684-7.082 7.734-7.082 4.059 0 7.213 2.893 7.213 6.762 0 4.034-2.544 7.281-6.077 7.281-1.188 0-2.304-.617-2.686-1.349 0 0-.587 2.234-.73 2.782-.266 1.023-.986 2.308-1.467 3.085 1.125.347 2.316.535 3.551.535 6.621 0 12.018-5.396 12.018-12.017C24.034 5.396 18.638 0 12.017 0z" />
        </svg>
      ),
      href: 'https://www.pinterest.com/nouharchitects',
      label: 'Pinterest',
    },
    {
      type: 'svg',
      svgPath: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      href: 'https://wa.me/message/BVUKQNAFX5FJP1',
      label: 'WhatsApp',
    },
    {
      type: 'lucide',
      Icon: Facebook,
      href: 'https://www.facebook.com/nouharchitects',
      label: 'Facebook',
    },
  ];

  return (
    <footer className="border-t border-border/40 bg-[#1c1c1c] backdrop-blur-md pt-24 pb-12 text-foreground relative overflow-hidden font-cairo">
      <div className="absolute top-0 left-1/4 h-full w-[1px] bg-accent/[0.02] pointer-events-none" />
      <div className="absolute top-0 right-1/4 h-full w-[1px] bg-accent/[0.02] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">
        <div className="grid grid-cols-1 gap-16 pb-20 border-b border-border/40 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-6">
            <span className="text-3xl font-extrabold tracking-tight text-white md:text-4xl font-cairo">
              {t('nav.logo', 'نوح')}
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm font-cairo">
              {t(
                'footer.about_text',
                'استوديو إبداعي متكامل يدمج بين أصالة التصميم المعماري والداخلي، وقوة الحلول الرقمية في الجرافيك وتطوير الويب.'
              )}
            </p>

            <div className="flex flex-wrap gap-2 mt-2 max-w-xs">
              {socialAccounts.map((account, index) => (
                <a
                  key={index}
                  href={account.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={account.label}
                  className="w-10 h-10 bg-zinc-900/50 border border-zinc-800 text-zinc-400 transition duration-300 hover:bg-accent hover:text-black hover:border-accent rounded-xl shadow-sm cursor-pointer flex items-center justify-center"
                >
                  {account.type === 'lucide' && account.Icon ? (
                    <account.Icon size={16} />
                  ) : (
                    account.svgPath
                  )}
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
                    className="text-sm text-muted-foreground transition hover:text-accent hover:translate-x-1 inline-block duration-200 font-cairo"
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
            <ul className="flex flex-col gap-4 text-sm text-muted-foreground font-cairo">
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
              <ul className="flex flex-col gap-5 text-sm text-muted-foreground font-cairo">
                <li className="flex items-start gap-4">
                  <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                  <span>
                    {t('about.map.address', 'حي التصميم والإبداع، الرياض')}
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Mail size={18} className="text-accent shrink-0" />
                  <a
                    href="mailto:nouh.architects@gmail.com"
                    className="hover:text-accent transition-colors duration-200 break-all"
                  >
                    nouh.architects@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 flex flex-col items-center justify-center gap-6 sm:flex-row text-xs text-muted-foreground/60 font-cairo">
          <span>
            &copy; {currentYear} {t('nav.logo', 'نوح')} Studio.{' '}
            {t('footer.rights', 'جميع الحقوق محفوظة.')}
          </span>
        </div>
      </div>
    </footer>
  );
}
