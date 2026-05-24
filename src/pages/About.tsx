import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import {
  MapPin,
  ArrowRight,
  Instagram,
  Linkedin,
  Youtube,
  Facebook,
} from 'lucide-react';

export default function About() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const socialAccounts = [
    {
      type: 'lucide',
      Icon: Instagram,
      href: 'https://www.instagram.com/nouharchitects',
      label: 'Instagram',
      color: 'text-pink-500 hover:text-black',
    },
    {
      type: 'svg',
      svgPath: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M22 13.833h-6c0 1.5.833 2.5 2.5 2.5 1.167 0 1.833-.5 2.167-1.167h1.666C21.833 17 20 19 18.5 19c-3 0-4.5-2.083-4.5-5s1.5-5 4.5-5c2.833 0 4 2.083 4 4.5v.333zM18.5 10.5c-1.333 0-2.167.833-2.333 2.167h4.5c0-1.334-.833-2.167-2.167-2.167zm-10 1c1 .333 1.5 1.167 1.5 2.333 0 2.167-1.5 3.167-4 3.167H1v-12h4.5c2.333 0 3.667.833 3.667 2.667 0 1.166-.667 1.833-1.667 2.166zm-5-3.333v2.166h2c.833 0 1.5-.333 1.5-1.083 0-.667-.5-1.083-1.5-1.083h-2zm0 4.166v2.5h2.167c1 0 1.666-.333 1.666-1.166 0-.917-.666-1.334-1.666-1.334H3.5zm11.333-6h6V8h-6V6.333z" />
        </svg>
      ),
      href: 'https://www.behance.net/NouhArchitects',
      label: 'Behance',
      color: 'text-blue-500 hover:text-black',
    },
    {
      type: 'lucide',
      Icon: Linkedin,
      href: 'https://www.linkedin.com/in/nouharchitects',
      label: 'LinkedIn',
      color: 'text-sky-600 hover:text-black',
    },
    {
      type: 'svg',
      svgPath: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: 'https://twitter.com/NouhArchitects',
      label: 'X (Twitter)',
      color: 'text-white hover:text-black',
    },
    {
      type: 'lucide',
      Icon: Youtube,
      href: 'https://www.youtube.com/@nouh.architects',
      label: 'YouTube',
      color: 'text-red-600 hover:text-black',
    },
    {
      type: 'svg',
      svgPath: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12.017 0C5.396 0 0 5.396 0 12.017c0 5.082 3.158 9.388 7.618 11.116-.102-.949-.195-2.408.041-3.443.213-.932 1.373-5.819 1.373-5.819s-.351-.703-.351-1.744c0-1.633.948-2.853 2.125-2.853 1.002 0 1.486.753 1.486 1.656 0 1.008-.642 2.514-.974 3.908-.276 1.171.589 2.124 1.744 2.124 2.094 0 3.707-2.207 3.707-5.398 0-2.822-2.029-4.793-4.92-4.793-3.35 0-5.315 2.513-5.315 5.109 0 1.012.39 2.099.877 2.691.096.117.109.22.08.34-.088.366-.284 1.157-.323 1.316-.051.21-.17.254-.392.151-1.463-.68-2.378-2.815-2.378-4.532 0-3.69 2.684-7.082 7.734-7.082 4.059 0 7.213 2.893 7.213 6.762 0 4.034-2.544 7.281-6.077 7.281-1.188 0-2.304-.617-2.686-1.349 0 0-.587 2.234-.73 2.782-.266 1.023-.986 2.308-1.467 3.085 1.125.347 2.316.535 3.551.535 6.621 0 12.018-5.396 12.018-12.017C24.034 5.396 18.638 0 12.017 0z" />
        </svg>
      ),
      href: 'https://www.pinterest.com/nouharchitects',
      label: 'Pinterest',
      color: 'text-red-500 hover:text-black',
    },
    {
      type: 'svg',
      svgPath: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      href: 'https://wa.me/message/BVUKQNAFX5FJP1',
      label: 'WhatsApp',
      color: 'text-green-500 hover:text-black',
    },
    {
      type: 'lucide',
      Icon: Facebook,
      href: 'https://www.facebook.com/nouharchitects',
      label: 'Facebook',
      color: 'text-blue-600 hover:text-black',
    },
  ];

  return (
    <section className="bg-zinc-950 text-white">
      {/* HERO IMAGE */}
      <div className="relative w-full h-[65vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2070&auto=format&fit=crop"
          alt="Meeting Room"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/65" />

        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto max-w-7xl px-6 lg:px-16 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight mb-6">
                {t('about.heading')}
              </h1>

              <p className="text-base leading-relaxed text-white/70 max-w-xl mb-8">
                {t('about.sub')}
              </p>

              <div className="flex flex-wrap gap-3">
                <button className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2">
                  {t('common.explore')}
                  <ArrowRight size={16} className={isRtl ? 'rotate-180' : ''} />
                </button>

                <button className="border border-white/20 bg-white/5 px-6 py-3 rounded-2xl text-sm font-semibold">
                  {t('common.contact')}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div className="mx-auto max-w-7xl px-6 lg:px-16 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24"
        >
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-bold">
              {t('about.contact.label')}
            </span>

            <h2 className="text-3xl sm:text-4xl font-black mt-4 text-white">
              {t('about.contact.heading')}
            </h2>

            <p className="text-white/60 mt-4 max-w-2xl mx-auto leading-relaxed">
              {t('about.contact.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* PHONE */}
            <div className="bg-zinc-900 border border-white/10 rounded-[2rem] p-8 text-center">
              <h3 className="text-xl font-bold mb-3">
                {t('about.contact_info.phone_title')}
              </h3>
              <p className="text-white/60" dir="ltr">
                {t('about.contact_info.phone_value')}
              </p>
            </div>

            {/* EMAIL */}
            <div className="bg-zinc-900 border border-white/10 rounded-[2rem] p-8 text-center">
              <h3 className="text-xl font-bold mb-3">
                {t('about.contact_info.email_title')}
              </h3>
              <p className="text-white/60">
                {t('about.contact_info.email_value')}
              </p>
            </div>

            {/* LOCATION */}
            <div className="bg-zinc-900 border border-white/10 rounded-[2rem] p-8 text-center">
              <h3 className="text-xl font-bold mb-3">
                {t('about.contact_info.loc_title')}
              </h3>
              <p className="text-white/60">
                {t('about.contact_info.loc_value')}
              </p>
            </div>
          </div>

          {/* SOCIAL MEDIA */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold mb-6">
              {t('about.social_title')}
            </h3>

            <div className="flex flex-wrap justify-center gap-4">
              {socialAccounts.map((account, index) => {
                const IconComponent = account.Icon;

                return (
                  <a
                    key={index}
                    href={account.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={account.label}
                    className="w-12 h-12 bg-zinc-900 border border-white/10 transition-all duration-300  rounded-2xl shadow-sm cursor-pointer flex items-center justify-center hover:scale-105 group"
                  >
                    {account.type === 'lucide' && IconComponent ? (
                      <IconComponent
                        size={20}
                        className={`transition-colors duration-300 ${account.color}`}
                      />
                    ) : (
                      <div
                        className={`transition-colors duration-300 ${account.color}`}
                      >
                        {account.svgPath}
                      </div>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* MAP SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24"
        >
          <div className="flex flex-col md:flex-row justify-between gap-5 mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-accent font-bold">
                {t('about.map.label')}
              </span>

              <h2 className="text-3xl font-black mt-3 text-white">
                {t('about.map.heading')}
              </h2>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl px-5 py-3 h-fit flex items-center gap-3">
              <MapPin className="text-accent" size={16} />

              <span className="text-sm text-white/60">
                {t('about.map.address')}
              </span>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl h-[420px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3474.624182698274!2d37.134913359618665!3d36.21635680050768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152ff99960ea3129%3A0xfbf68217bd7f6686!2z2YjZg9in2YTYqSDZhtmI2K0g2YTZhNi52YXYp9ix2Kkg2YjYp9mE2KrYtdmF2YrZhQ!5e1!3m2!1sar!2s!4v1779615179656!5m2!1sar!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
