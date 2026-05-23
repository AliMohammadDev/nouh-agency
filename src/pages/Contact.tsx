import { useTranslation } from 'react-i18next';
import { ArrowRight, Mail, Phone, Clock } from 'lucide-react';
import { useDirection } from '../hooks/useDirection';
import { motion } from 'motion/react'; // أو 'framer-motion' حسب نسختك

export default function Contact() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  return (
    <section className="pt-36 pb-24 bg-background text-foreground relative overflow-hidden">
      {/* لمسة خلفية ضوئية ناعمة جداً في زاوية الصفحة */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* الجانب الأول: معلومات التواصل والترحيب */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between"
          >
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-accent">
                {t('nav.links.contact')}
              </span>
              <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl tracking-tight">
                {t('contact.heading', 'لنبدأ رحلة التصميم معاً')}
              </h1>
              <p className="mb-12 text-base leading-relaxed text-muted-foreground md:text-lg max-w-md">
                {t(
                  'contact.sub',
                  'يسعدنا دائماً مناقشة أفكاركم وتحويلها إلى واقع ملموس ورقمي مبهر. تواصل معنا اليوم.'
                )}
              </p>
            </div>

            {/* كروت معلومات الاتصال الأنيقة */}
            <div className="flex flex-col gap-6 border-t border-border/60 pt-8">
              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-xl bg-secondary text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t('contact.info.email', 'البريد الإلكتروني')}
                  </span>
                  <a
                    href="mailto:hello@studioammar.com"
                    className="text-sm font-semibold hover:text-accent transition-colors"
                  >
                    hello@studioammar.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-xl bg-secondary text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t('contact.info.phone', 'الهاتف')}
                  </span>
                  <a
                    href="tel:+966500000000"
                    className="text-sm font-semibold hover:text-accent transition-colors"
                    dir="ltr"
                  >
                    +966 50 000 0000
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-xl bg-secondary text-accent">
                  <Clock size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t('contact.info.hours', 'ساعات العمل')}
                  </span>
                  <span className="text-sm font-semibold text-foreground/80">
                    {t(
                      'contact.info.hours_val',
                      'الأحد - الخميس: 9:00 ص - 6:00 م'
                    )}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* الجانب الثاني: استمارة الاتصال (Form) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm shadow-xl shadow-black/5"
          >
            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">
                    {isRTL ? 'الاسم الكامل' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-xl border border-border/80 bg-background/50 px-4 py-3.5 text-sm outline-none transition-all duration-300 focus:border-accent focus:bg-background focus:ring-1 focus:ring-accent/20"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">
                    {isRTL ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-xl border border-border/80 bg-background/50 px-4 py-3.5 text-sm outline-none transition-all duration-300 focus:border-accent focus:bg-background focus:ring-1 focus:ring-accent/20"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">
                  {isRTL ? 'الموضوع' : 'Subject'}
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-border/80 bg-background/50 px-4 py-3.5 text-sm outline-none transition-all duration-300 focus:border-accent focus:bg-background focus:ring-1 focus:ring-accent/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">
                  {isRTL ? 'تفاصيل مشروعك' : 'Project Details'}
                </label>
                <textarea
                  rows={5}
                  required
                  className="w-full resize-none rounded-xl border border-border/80 bg-background/50 px-4 py-3.5 text-sm outline-none transition-all duration-300 focus:border-accent focus:bg-background focus:ring-1 focus:ring-accent/20"
                />
              </div>

              {/* زر إرسال متفاعل ومتحرك بالماوس */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/10 transition-all duration-300 hover:bg-accent/90 cursor-pointer group"
              >
                {t('contact.btn_send', 'إرسال الرسالة')}
                <ArrowRight
                  size={16}
                  className={`transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`}
                />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
