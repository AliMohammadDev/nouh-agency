import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  animate,
  motion,
  useInView,
} from 'motion/react';

import {
  Compass,
  ShieldCheck,
  Landmark,
} from 'lucide-react';

import { useDirection } from '../../hooks/useDirection';
import blackBg from '../../assets/images/black2.jpg';

interface StatItem {
  value: string;
  label: string;
  desc: string;
}

const STAT_ICONS = [
  Landmark,
  Compass,
  ShieldCheck,
];

function AnimatedCounter({
  value,
}: {
  value: string;
}) {
  const [current, setCurrent] =
    useState(0);

  const ref =
    useRef<HTMLSpanElement | null>(
      null
    );

  const isInView = useInView(ref, {
    once: true,
    margin: '-40px',
  });

  const targetNumber =
    parseInt(
      value.replace(/\D/g, ''),
      10
    ) || 0;

  const suffix =
    value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(
      0,
      targetNumber,
      {
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1],

        onUpdate: (latest) => {
          setCurrent(
            Math.floor(latest)
          );
        },
      }
    );

    return () =>
      controls.stop();
  }, [
    targetNumber,
    isInView,
  ]);

  return (
    <span
      ref={ref}
      dir="ltr"
      className="
        flex
        items-baseline

        font-cairo
        text-[54px]
        font-black
        leading-none
        tracking-[-0.055em]

        text-white

        sm:text-[64px]
        lg:text-[76px]
        xl:text-[86px]
      "
    >
      {current}

      <motion.span
        initial={{
          opacity: 0,
          scale: 0.5,
          y: 10,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.5,
          delay: 0.55,
          ease: [
            0.34,
            1.56,
            0.64,
            1,
          ],
        }}
        className="
          ms-1
          text-[0.65em]
          text-accent
        "
      >
        {suffix}
      </motion.span>
    </span>
  );
}

export default function Stats() {
  const { t } = useTranslation();

  const { isRTL } =
    useDirection();

  const rawItems = t(
    'stats.items',
    {
      returnObjects: true,
    }
  );

  const items =
    Array.isArray(rawItems)
      ? (rawItems as StatItem[])
      : [];

  return (
    <section
      className="
        relative
        overflow-hidden

        border-b
        border-white/[0.05]

        bg-black

        py-24

        text-white
        font-cairo

        lg:py-32
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
          relative
          z-10

          mx-auto
          w-full
          max-w-7xl

          px-6
          lg:px-12
        "
      >
        <div
          className="
            mb-16
            max-w-4xl

            lg:mb-20
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              mb-5

              flex
              items-center
              gap-3
            "
          >
            <motion.span
              initial={{
                scaleX: 0,
              }}
              whileInView={{
                scaleX: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.75,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              style={{
                transformOrigin:
                  isRTL
                    ? 'right'
                    : 'left',
              }}
              className="
                h-[2px]
                w-8
                bg-accent
              "
            />

            <span
              className="
                text-[11px]
                font-bold

                uppercase
                tracking-[0.18em]

                text-accent
              "
            >
              {t('stats.label')}
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
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.9,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="
                max-w-[900px]

                text-[40px]
                font-black

                leading-[1.08]
                tracking-[-0.035em]

                text-white

                sm:text-5xl
                lg:text-[60px]
              "
            >
              {isRTL
                ? 'مخططات هندسية وتنفيذية متميزة'
                : 'PRECISE DESIGN & EXECUTION MATRIX'}
            </motion.h2>
          </div>

          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.65,
              delay: 0.12,
            }}
            className="
              mt-5

              max-w-3xl

              text-sm
              leading-8

              text-white/40

              md:text-base
            "
          >
            {isRTL
              ? 'تفخر وكالة نوح بصناعة بصمات معاصرة ملهمة تمتد من دراسة الفكرة الإنشائية وحتى تخريج الكفاءات الشابة وتسليم الأبراج الفخمة.'
              : 'Nouh Studio delivers elite parameters, nurturing talent while engineering absolute visual perfection.'}
          </motion.p>
        </div>

        <div
          className="
            grid
            grid-cols-1

            border-y
            border-white/[0.07]

            md:grid-cols-3
          "
        >
          {items.map(
            (stat, idx) => {
              const IconComponent =
                STAT_ICONS[
                  idx %
                    STAT_ICONS.length
                ];

              return (
                <motion.article
                  key={
                    stat.label ||
                    idx
                  }
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.35,
                  }}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 35,
                    },

                    visible: {
                      opacity: 1,
                      y: 0,

                      transition: {
                        duration: 0.7,
                        delay:
                          idx *
                          0.12,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      },
                    },
                  }}
                  className={`
                    group
                    relative

                    min-h-[330px]

                    overflow-hidden

                    px-2
                    py-10

                    transition-colors
                    duration-500

                    md:min-h-[390px]
                    md:px-8
                    md:py-12

                    lg:px-10

                    ${
                      idx !==
                      items.length -
                        1
                        ? `
                          border-b
                          border-white/[0.07]

                          md:border-b-0

                          ${
                            isRTL
                              ? 'md:border-l'
                              : 'md:border-r'
                          }

                          md:border-white/[0.07]
                        `
                        : ''
                    }
                  `}
                >
                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    whileHover={{
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                    className="
                      pointer-events-none

                      absolute
                      inset-0

                      bg-white/[0.018]
                    "
                  />

                  <motion.span
                    initial={{
                      opacity: 0,
                      y: 45,
                      scale: 0.85,
                    }}
                    whileInView={{
                      opacity: 0.025,
                      y: 0,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.9,
                      delay:
                        0.1 +
                        idx *
                          0.1,
                    }}
                    className={`
                      pointer-events-none

                      absolute
                      -bottom-10

                      select-none

                      text-[160px]
                      font-black
                      leading-none

                      text-white

                      md:text-[190px]

                      ${
                        isRTL
                          ? '-left-2'
                          : '-right-2'
                      }
                    `}
                  >
                    {String(
                      idx + 1
                    ).padStart(
                      2,
                      '0'
                    )}
                  </motion.span>

                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                      rotate:
                        isRTL
                          ? -25
                          : 25,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.6,
                      delay:
                        0.18 +
                        idx *
                          0.12,
                      ease: [
                        0.34,
                        1.56,
                        0.64,
                        1,
                      ],
                    }}
                    whileHover={{
                      scale: 1.12,
                      rotate:
                        isRTL
                          ? -8
                          : 8,
                    }}
                    className="
                      relative
                      z-10

                      mb-10

                      flex
                      h-12
                      w-12

                      items-center
                      justify-center

                      rounded-full

                      border
                      border-white/[0.08]

                      bg-white/[0.025]

                      text-accent

                      transition-colors
                      duration-500

                      group-hover:border-accent/35
                      group-hover:bg-accent/[0.08]
                    "
                  >
                    <IconComponent
                      className="
                        h-5
                        w-5
                      "
                      strokeWidth={
                        1.6
                      }
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{
                      y: -7,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="
                      relative
                      z-10
                    "
                  >
                    <AnimatedCounter
                      value={
                        stat.value
                      }
                    />
                  </motion.div>

                  <motion.h3
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.55,
                      delay:
                        0.25 +
                        idx *
                          0.12,
                    }}
                    className="
                      relative
                      z-10

                      mt-6

                      text-base
                      font-bold

                      leading-relaxed

                      text-white

                      transition-colors
                      duration-300

                      group-hover:text-accent

                      lg:text-lg
                    "
                  >
                    {stat.label}
                  </motion.h3>

                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.55,
                      delay:
                        0.32 +
                        idx *
                          0.12,
                    }}
                    className="
                      relative
                      z-10

                      mt-3

                      max-w-[320px]

                      text-xs
                      leading-7

                      text-white/38

                      transition-colors
                      duration-300

                      group-hover:text-white/55

                      md:text-sm
                    "
                  >
                    {stat.desc}
                  </motion.p>

                  <div
                    className="
                      absolute
                      bottom-0
                      left-8
                      right-8

                      h-[2px]

                      overflow-hidden

                      bg-white/[0.05]
                    "
                  >
                    <motion.div
                      initial={{
                        scaleX: 0,
                      }}
                      whileInView={{
                        scaleX: 0.35,
                      }}
                      whileHover={{
                        scaleX: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.75,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      style={{
                        transformOrigin:
                          isRTL
                            ? 'right'
                            : 'left',
                      }}
                      className="
                        absolute
                        inset-0

                        bg-accent
                      "
                    />
                  </div>

                  <div
                    className={`
                      pointer-events-none

                      absolute

                      -top-24

                      h-[250px]
                      w-[250px]

                      rounded-full

                      bg-accent/[0.055]

                      opacity-0
                      blur-[100px]

                      transition-all
                      duration-700

                      group-hover:scale-125
                      group-hover:opacity-100

                      ${
                        isRTL
                          ? '-left-24'
                          : '-right-24'
                      }
                    `}
                  />
                </motion.article>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}