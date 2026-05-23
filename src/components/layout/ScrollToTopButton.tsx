import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useDirection } from '../../hooks/useDirection';

export default function ScrollToTopButton() {
  const { isRTL } = useDirection();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          onClick={scrollToTop}
          className={`fixed bottom-10 z-50 flex h-20 w-9 flex-col items-center justify-between py-3 border border-accent/20 bg-zinc-950/90 text-accent backdrop-blur-md transition-all duration-500 hover:border-accent group shadow-[0_0_30px_rgba(0,0,0,0.8)] cursor-pointer overflow-hidden ${
            isRTL ? 'left-10' : 'right-10'
          }`}
          style={{
            boxShadow: 'inset 0 0 12px rgba(255, 255, 255, 0.02)',
          }}
          title={isRTL ? 'صعود للأعلى' : 'Scroll up'}
        >
          <motion.div
            className="absolute bottom-0 left-0 w-full bg-accent/[0.07] group-hover:bg-accent/[0.12] transition-colors pointer-events-none"
            style={{ height: `${scrollProgress}%` }}
            transition={{ ease: 'easeOut', duration: 0.1 }}
          />

          <motion.div
            className="absolute left-0 bottom-0 w-[1.5px] bg-accent shadow-[0_0_8px_var(--color-accent)]"
            style={{ height: `${scrollProgress}%` }}
            transition={{ ease: 'easeOut', duration: 0.1 }}
          />

          <div className="relative h-5 w-5 overflow-hidden flex items-center justify-center">
            <ArrowUp
              size={16}
              className="absolute transition-all duration-500 transform ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-7 group-hover:opacity-0"
            />
            <ArrowUp
              size={16}
              className="absolute transition-all duration-500 transform ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-7 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            />
          </div>

          <div className="text-[9px] font-mono font-bold tracking-widest select-none origin-center text-zinc-500 group-hover:text-accent transition-colors duration-300 mt-1">
            {Math.round(scrollProgress)}%
          </div>

          <div className="absolute top-0 right-0 h-1 w-1 bg-accent/30 group-hover:bg-accent transition-colors" />
          <div className="absolute bottom-0 right-0 h-1 w-1 bg-accent/30 group-hover:bg-accent transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
