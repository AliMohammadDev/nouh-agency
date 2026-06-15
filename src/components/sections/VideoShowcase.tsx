import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, Variants, AnimatePresence } from 'motion/react';
import { Play, X } from 'lucide-react';
import { useDirection } from '../../hooks/useDirection';

import anim3dVideo from '../../assets/video/3danimation.mp4';
import anim3dPoster from '../../assets/video/3danimation.png';
import exteriorVideo from '../../assets/video/exterior.mp4';
import exteriorPoster from '../../assets/video/exterior.png';
import interiorVideo from '../../assets/video/interior.mp4';
import interiorPoster from '../../assets/video/interior.png';
import landscapeVideo from '../../assets/video/landescape.mp4';
import landscapePoster from '../../assets/video/landescape.png';
import graphicVideo from '../../assets/video/graphicdesign.mp4';
import graphicPoster from '../../assets/video/graphic.png';
import motionVideo from '../../assets/video/motiondesign.mp4';
import motionPoster from '../../assets/video/motion.png';
import photoVideo from '../../assets/video/photovideography.mp4';
import photoPoster from '../../assets/video/photograph.png';
import shopVideo from '../../assets/video/shopdrawing.mp4';
import shopPoster from '../../assets/video/shopdrawing.png';
import webVideo from '../../assets/video/webdesign.mp4';
import webPoster from '../../assets/video/web.png';

interface VideoItem {
  id: string;
  titleKey: string;
  videoSrc: string;
  posterSrc: string;
}

export default function VideoShowcase() {
  const { t } = useTranslation();

  const videoItems: VideoItem[] = [
    {
      id: '1',
      titleKey: 'videoShowcase.items.anim3d',
      videoSrc: anim3dVideo,
      posterSrc: anim3dPoster,
    },
    {
      id: '2',
      titleKey: 'videoShowcase.items.exterior',
      videoSrc: exteriorVideo,
      posterSrc: exteriorPoster,
    },
    {
      id: '3',
      titleKey: 'videoShowcase.items.interior',
      videoSrc: interiorVideo,
      posterSrc: interiorPoster,
    },
    {
      id: '4',
      titleKey: 'videoShowcase.items.landscape',
      videoSrc: landscapeVideo,
      posterSrc: landscapePoster,
    },
    {
      id: '5',
      titleKey: 'videoShowcase.items.graphic',
      videoSrc: graphicVideo,
      posterSrc: graphicPoster,
    },
    {
      id: '6',
      titleKey: 'videoShowcase.items.motion',
      videoSrc: motionVideo,
      posterSrc: motionPoster,
    },
    {
      id: '7',
      titleKey: 'videoShowcase.items.photo',
      videoSrc: photoVideo,
      posterSrc: photoPoster,
    },
    {
      id: '8',
      titleKey: 'videoShowcase.items.shop',
      videoSrc: shopVideo,
      posterSrc: shopPoster,
    },
    {
      id: '9',
      titleKey: 'videoShowcase.items.web',
      videoSrc: webVideo,
      posterSrc: webPoster,
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden border-b border-accent/10 font-cairo">
      <div className="mx-auto max-w-7xl px-6 lg:px-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {videoItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group relative border border-accent/10 bg-zinc-950 rounded-none overflow-hidden h-auto w-full"
            >
              <div className="pointer-events-none absolute top-0 left-0 h-2 w-2 border-t border-l border-accent/20 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-300 z-20" />
              <div className="pointer-events-none absolute top-0 right-0 h-2 w-2 border-t border-r border-accent/20 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-300 z-20" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-accent/20 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-300 z-20" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-accent/20 group-hover:border-accent group-hover:w-3 group-hover:h-3 transition-all duration-300 z-20" />

              <video
                src={item.videoSrc}
                poster={item.posterSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-300 flex items-end p-5">
                <h3 className="text-sm font-bold text-white tracking-wide transition-transform duration-300 group-hover:translate-y-[-2px]">
                  {t(item.titleKey)}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
