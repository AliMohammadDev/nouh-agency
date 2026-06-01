import { useTranslation } from 'react-i18next';
import CompanyIcon from '../assets/logo-noscale.png';

export default function Loading() {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black z-[99999] flex flex-col items-center justify-center font-cairo overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      <div className="absolute w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />

      <div className="relative flex flex-col items-center gap-12">
        <div className="relative w-60 h-60 flex items-center justify-center">
          <div className="absolute inset-0 border border-zinc-800/80 rounded-full transform animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-4 border-2 border-dashed border-accent/20 rounded-full transform animate-[spin_6s_linear_infinite_reverse]" />
          <div className="absolute inset-9 border border-zinc-900 rounded-xl transform rotate-45 animate-[spin_12s_linear_infinite]" />

          <div className="absolute top-0 bottom-0 w-[1px] bg-zinc-800/30 left-1/2 -translate-x-1/2 scale-y-135" />
          <div className="absolute left-0 right-0 h-[1px] bg-zinc-800/30 top-1/2 -translate-y-1/2 scale-x-135" />

          <div className="absolute w-32 h-32 flex items-center justify-center z-10 bg-black rounded-3xl p-3 border border-zinc-800/60 shadow-[0_0_40px_rgba(0,0,0,0.95)] animate-[pulse_2.5s_infinite_ease-in-out]">
            <img
              src={CompanyIcon}
              alt="Company Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(var(--accent),0.2)]"
            />
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="text-xs sm:text-sm font-cairo tracking-[0.4em] text-accent uppercase font-bold animate-pulse">
            {t('loading.structure')}
          </div>

          <div className="w-64 h-[1.5px] bg-zinc-900 rounded-full mx-auto relative overflow-hidden">
            <div className="absolute top-0 bottom-0 left-0 bg-accent w-1/3 rounded-full animate-[loading-bar_1.5s_infinite_ease-in-out]" />
          </div>
        </div>
      </div>
    </div>
  );
}
