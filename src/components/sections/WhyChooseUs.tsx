import { useTranslation } from 'react-i18next';
import { Shield, Zap, Target, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { useDirection } from '../../hooks/useDirection';
import logoImg from '../../assets/images/png/logo/logo-agency.png';

export default function WhyChooseUs() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  const features = [
    {
      icon: <Target className="w-5 h-5 text-accent" />,
      titleKey: 'why.features.strategy.title',
      defaultTitle: 'التخطيط الاستراتيجي',
      descKey: 'why.features.strategy.desc',
      defaultDesc:
        'نحلل سوق العمل بدقة لنضع خططاً مدروسة تضمن نجاح مشروعك وتميزه.',
    },
    {
      icon: <Zap className="w-5 h-5 text-accent" />,
      titleKey: 'why.features.speed.title',
      defaultTitle: 'السرعة والكفاءة',
      descKey: 'why.features.speed.desc',
      defaultDesc:
        'نلتزم بمواعيد التسليم الصارمة مع الحفاظ على أعلى معايير الإتقان.',
    },
    {
      icon: <Shield className="w-5 h-5 text-accent" />,
      titleKey: 'why.features.quality.title',
      defaultTitle: 'جودة لا تساوم',
      descKey: 'why.features.quality.desc',
      defaultDesc:
        'نهتم بأدق التفاصيل البرمجية والتصميمية لتخرج هويتك بأفضل صورة.',
    },
    {
      icon: <Users className="w-5 h-5 text-accent" />,
      titleKey: 'why.features.support.title',
      defaultTitle: 'دعم مستمر وشراكة',
      descKey: 'why.features.support.desc',
      defaultDesc:
        'لسنا مجرد مقدمي خدمة، بل نحن شركاء نجاح متواجدون معك دائماً.',
    },
  ];

  return (
    <section className="py-24 bg-[#1c1c1c] text-white font-cairo overflow-hidden border-t border-border/20 relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-accent)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-accent)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-10">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-accent text-sm font-bold tracking-wider uppercase block mb-3"
              >
                {t('why.tagline', 'تميز معنا')}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight"
              >
                {t('why.title', 'لماذا يختارنا المبدعون؟')}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-base text-muted-foreground leading-relaxed"
              >
                {t(
                  'why.subtitle',
                  'في وكالة نوح، ندمج الفن بالتكنولوجيا لنصنع تجارب رقمية استثنائية تدفع بأعمالك نحو الصدارة.'
                )}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-5 rounded-xl bg-[#242424] border border-white/[0.03] hover:border-accent/20 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                    {t(item.titleKey, item.defaultTitle)}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t(item.descKey, item.defaultDesc)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: isRTL ? -2 : 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="flex items-center justify-center relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <motion.img
              src={logoImg}
              alt="Noah Agency Premium Logo"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.04 }}
              className="w-4/5 md:w-3/4 max-w-[420px] h-auto object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.6)] cursor-pointer filter brightness-95 hover:brightness-110 transition-all duration-500"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
