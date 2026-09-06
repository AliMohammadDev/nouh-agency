import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Zap, Target, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { useDirection } from '../../hooks/useDirection';
import blackBg from '../../assets/images/black2.jpg';

export default function WhyChooseUs() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      icon: Target,
      titleKey: 'why.features.strategy.title',
      descKey: 'why.features.strategy.desc',
    },
    {
      icon: Zap,
      titleKey: 'why.features.speed.title',
      descKey: 'why.features.speed.desc',
    },
    {
      icon: Shield,
      titleKey: 'why.features.quality.title',
      descKey: 'why.features.quality.desc',
    },
    {
      icon: Users,
      titleKey: 'why.features.support.title',
      descKey: 'why.features.support.desc',
    },
  ];

  return (
    <section
      className="
        relative
        py-24
        bg-black
        text-white
        font-cairo
        overflow-hidden
      "
    >
      <div className="pointer-events-none absolute inset-0">
        <img
          src={blackBg}
          alt=""
          className="absolute opacity-60 inset-0 h-full w-full object-cover select-none"
        />
      </div>

      <div
        className="
          relative z-10
          mx-auto
          w-full
          max-w-[1400px]
          px-6
          md:px-10
          lg:px-16
        "
      >
        <div
          className="
            mb-12
            grid
            gap-8
            lg:mb-14
            lg:grid-cols-[1fr_0.65fr]
            lg:items-end
          "
        >
          <div>
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
              }}
              className="mb-4 flex items-center gap-3"
            >
              <motion.span
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: 36,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                }}
                className="h-px bg-accent"
              />

              <span
                className="
                  text-xs
                  font-bold
                  tracking-[0.16em]
                  text-accent
                  md:text-sm
                "
              >
                {t('why.tagline')}
              </span>
            </motion.div>

            <div className="overflow-hidden pb-2">
              <motion.h2
                initial={{
                  y: '110%',
                }}
                whileInView={{
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  max-w-[760px]
                  text-[40px]
                  font-black
                  leading-[1.15]
                  tracking-[-0.035em]
                  sm:text-5xl
                  lg:text-[62px]
                "
              >
                {t('why.title')}
              </motion.h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          {features.map((item, index) => {
            const Icon = item.icon;
            const active = hoveredIndex === index;

            return (
              <motion.div
                key={item.titleKey}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  scale: active ? 1 : 0.985,
                  opacity: 1,
                  y: active ? -4 : 0,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`
                  group
                  relative
                  min-h-[210px]
                  cursor-default
                  overflow-hidden
                  rounded-[22px]
                  border
                  p-6

                  transition-colors
                  duration-500

                  md:min-h-[235px]
                  md:p-8

                  ${
                    active
                      ? `
                        border-accent/35
                        bg-[#222222]/80
                        backdrop-blur-sm
                        shadow-[0_25px_70px_rgba(0,0,0,0.28)]
                      `
                      : `
                        border-white/[0.06]
                        bg-[#1d1d1d]/80
                        backdrop-blur-sm
                      `
                  }
                `}
              >
                <motion.div
                  animate={{
                    opacity: active ? 1 : 0,
                    scale: active ? 1 : 0.65,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className={`
                    pointer-events-none
                    absolute

                    h-[230px]
                    w-[230px]

                    rounded-full
                    bg-accent/[0.09]
                    blur-[90px]

                    ${
                      isRTL
                        ? '-left-20 -top-20'
                        : '-right-20 -top-20'
                    }
                  `}
                />

                <motion.span
                  animate={{
                    opacity: active ? 0.075 : 0.03,
                    scale: active ? 1.08 : 1,
                    y: active ? 0 : 8,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`
                    pointer-events-none
                    absolute
                    -bottom-8
                    select-none

                    text-[150px]
                    font-black
                    leading-none
                    text-white

                    md:text-[180px]

                    ${
                      isRTL
                        ? '-left-1'
                        : '-right-1'
                    }
                  `}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.span>

                <div
                  className="
                    relative z-10
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >
                  <motion.div
                    animate={{
                      rotate: active
                        ? isRTL
                          ? -9
                          : 9
                        : 0,

                      scale: active ? 1.12 : 1,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`
                      flex
                      h-11
                      w-11
                      shrink-0

                      items-center
                      justify-center

                      rounded-full
                      border

                      transition-colors
                      duration-500

                      ${
                        active
                          ? `
                            border-accent/40
                            bg-accent/10
                            text-accent
                          `
                          : `
                            border-white/[0.08]
                            bg-white/[0.025]
                            text-[#999999]
                          `
                      }
                    `}
                  >
                    <Icon className="h-[19px] w-[19px]" />
                  </motion.div>
                </div>

                <div className="relative z-10 mt-8">
                  <motion.h3
                    animate={{
                      y: active ? -2 : 0,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className={`
                      text-xl
                      font-bold

                      transition-colors
                      duration-400

                      md:text-2xl

                      ${
                        active
                          ? 'text-white'
                          : 'text-white/85'
                      }
                    `}
                  >
                    {t(item.titleKey)}
                  </motion.h3>

                  <motion.p
                    animate={{
                      opacity: active ? 1 : 0.65,
                      y: active ? 0 : 0,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="
                      mt-3
                      max-w-[500px]

                      text-xs
                      leading-7
                      text-white/60

                      md:text-sm
                    "
                  >
                    {t(item.descKey)}
                  </motion.p>
                </div>

                <motion.div
                  animate={{
                    scaleX: active ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    transformOrigin: isRTL
                      ? 'right'
                      : 'left',
                  }}
                  className="
                    absolute
                    bottom-0
                    left-0
                    right-0

                    h-[2px]

                    bg-gradient-to-r
                    from-transparent
                    via-accent
                    to-transparent
                  "
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
