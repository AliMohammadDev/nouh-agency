import { useTranslation } from 'react-i18next';

// 1. تعريف واجهة البيانات للـ Feature Item بناءً على ملف الـ JSON لديك
interface FeatureItem {
  number: string;
  title: string;
  body: string;
}

export default function Features() {
  const { t } = useTranslation();

  // 2. جلب البيانات واستخدام الفحص الآمن لمنع الـ Crash
  const rawItems = t('features.items', { returnObjects: true });
  const items = Array.isArray(rawItems) ? (rawItems as FeatureItem[]) : [];

  return (
    <section className="py-20 bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <span className="mb-4 block text-xs font-semibold uppercase tracking-widest text-accent">
          {t('features.label')}
        </span>
        <h2 className="text-3xl font-bold tracking-tight mb-12">
          {t('features.heading')}
        </h2>

        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
          {/* الخريطة الآمنة التي لن تسبب شاشة بيضاء بعد الآن */}
          {items.map((item, index) => (
            <div
              key={item.number || index}
              className="flex flex-col gap-4 border-t border-muted/30 pt-6"
            >
              <span className="text-sm font-mono text-accent">
                {item.number}
              </span>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
