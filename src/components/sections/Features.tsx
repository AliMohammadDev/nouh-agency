import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react';
import {
  ArrowUpRight,
  Compass,
  Layout,
  PenTool,
} from 'lucide-react';
import { useDirection } from '../../hooks/useDirection';
import blackBg from '../../assets/images/black2.jpg';

interface PillarItem {
  number: string;
  title: string;
  body: string;
  code: string;
  bullets: string[];
}

const ICONS = [Compass, PenTool, Layout];

const PILLAR_IMAGES = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=90',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1800&q=90',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1800&q=90',
];

export default function Features() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  const sectionRef = useRef<HTMLElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const rawItems = t('features.items', {
    returnObjects: true,
  });

  const pillarsData = Array.isArray(rawItems)
    ? (rawItems as PillarItem[])
    : [];

  const total = pillarsData.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const progressScale = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1]
  );

  useMotionValueEvent(
    scrollYProgress,
    'change',
    (progress) => {
      if (!total) return;

      const nextIndex = Math.min(
        total - 1,
        Math.floor(progress * total)
      );

      setActiveIndex(nextIndex);
    }
  );

  if (!pillarsData.length) {
    return null;
  }

  const activeItem = pillarsData[activeIndex];

  const activeImage =
    PILLAR_IMAGES[
    activeIndex % PILLAR_IMAGES.length
    ];

  const ActiveIcon =
    ICONS[activeIndex % ICONS.length];

  const formattedCurrent = String(
    activeIndex + 1
  ).padStart(2, '0');

  const formattedTotal = String(total).padStart(
    2,
    '0'
  );

  const goToService = (index: number) => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;

    const sectionTop =
      window.scrollY +
      section.getBoundingClientRect().top;

    const scrollableDistance =
      section.offsetHeight - window.innerHeight;

    const targetProgress =
      (index + 0.15) / total;

    window.scrollTo({
      top:
        sectionTop +
        scrollableDistance * targetProgress,

      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      className="
        relative
        bg-black
        text-white
        font-cairo

        lg:h-[320vh]
      "
    >
      <div
        className="
          relative
          overflow-hidden

          py-16

          lg:sticky
          lg:top-0
          lg:flex
          lg:h-screen
          lg:items-center
          lg:py-0
        "
      >
        <div className="pointer-events-none absolute inset-0">
          <img
            src={blackBg}
            alt=""
            className="absolute inset-0 h-full w-full opacity-60 object-cover select-none"
          />
        </div>

        <div
          className="
            relative
            z-10

            mx-auto
            w-full
            max-w-7xl
            text-white
            px-6
            lg:px-12
          "
        >
          <div
            className="
              mx-auto
              flex
              h-20
              w-full
              items-center
              justify-between
            "
          >
            <motion.div
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
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                flex
                items-center
                gap-3
              "
            >
              <h2
                className="
                  max-w-[760px]
                  text-[40px]
                  font-black
                  leading-[1.15]
                  tracking-[-0.035em]
                  sm:text-5xl
                  lg:text-[62px]
                  mb-12
                "
              >
                {t('features.heading')}
              </h2>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.span
                key={activeIndex}
                dir="ltr"
                initial={{
                  opacity: 0,
                  y: -7,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 7,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="
                  text-[10px]
                  font-bold
                  tracking-[0.15em]
                  text-white/65
                "
              >
                {formattedCurrent} / {formattedTotal}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="relative">
            <div
              className="
                relative

                h-[420px]
                w-full

                overflow-hidden
                rounded-[22px]

                bg-black

                md:h-[500px]
                lg:h-[510px]
                xl:h-[550px]
              "
            >
              <AnimatePresence mode="sync">
                <motion.div
                  key={`image-${activeIndex}`}
                  initial={{
                    clipPath: isRTL
                      ? 'inset(0 100% 0 0)'
                      : 'inset(0 0 0 100%)',
                  }}
                  animate={{
                    clipPath:
                      'inset(0 0 0 0)',
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className="
                    absolute
                    inset-0
                  "
                >
                  <motion.img
                    src={activeImage}
                    alt={activeItem.title}
                    initial={{
                      scale: 1.12,
                      filter: 'blur(4px)',
                    }}
                    animate={{
                      scale: 1,
                      filter: 'blur(0px)',
                    }}
                    transition={{
                      duration: 1.1,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0

                      bg-gradient-to-t
                      from-black/80
                      via-black/10
                      to-black/5
                    "
                  />

                  <div
                    className={`
                      absolute
                      inset-0

                      ${isRTL
                        ? 'bg-gradient-to-l'
                        : 'bg-gradient-to-r'
                      }

                      from-black/25
                      via-transparent
                      to-transparent
                    `}
                  />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`sweep-${activeIndex}`}
                  initial={{
                    x: isRTL
                      ? '160%'
                      : '-160%',
                  }}
                  animate={{
                    x: isRTL
                      ? '-190%'
                      : '190%',
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
                    pointer-events-none

                    absolute
                    inset-y-0

                    z-20

                    w-[18%]

                    bg-gradient-to-r
                    from-transparent
                    via-accent/25
                    to-transparent

                    blur-xl
                  "
                />
              </AnimatePresence>

              <div
                className="
                  absolute
                  left-5
                  right-5
                  top-5

                  z-30

                  flex
                  items-center
                  justify-between

                  md:left-7
                  md:right-7
                  md:top-7
                "
              >
                <motion.div
                  key={`icon-${activeIndex}`}
                  initial={{
                    scale: 0.3,
                    rotate: 50,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    rotate: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [
                      0.34,
                      1.56,
                      0.64,
                      1,
                    ],
                  }}
                  className="
                    flex
                    h-11
                    w-11

                    items-center
                    justify-center

                    rounded-full

                    bg-accent
                    text-black

                    md:h-12
                    md:w-12
                  "
                >
                  <ActiveIcon
                    size={19}
                    strokeWidth={1.5}
                  />
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.span
                    key={`inside-counter-${activeIndex}`}
                    dir="ltr"
                    initial={{
                      opacity: 0,
                      y: -8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 8,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="
                      text-[10px]
                      font-bold
                      tracking-[0.15em]
                      text-white/85
                    "
                  >
                    {formattedCurrent}/
                    {formattedTotal}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0

                  z-30

                  p-6
                  md:p-8
                  lg:p-9
                "
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`bottom-content-${activeIndex}`}
                    initial={{
                      opacity: 0,
                      y: 35,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -25,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="
                      flex
                      items-end
                      justify-between
                      gap-6
                    "
                  >
                    <div className="max-w-[850px]">
                      <div className="overflow-hidden pb-1">
                        <motion.h3
                          initial={{
                            y: '110%',
                          }}
                          animate={{
                            y: 0,
                          }}
                          transition={{
                            duration: 0.65,
                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          }}
                          className="
                            text-2xl
                            font-black
                            leading-tight
                            text-white

                            md:text-3xl
                            lg:text-[38px]
                          "
                        >
                          {activeItem.title}
                        </motion.h3>
                      </div>

                      <motion.p
                        initial={{
                          opacity: 0,
                          y: 12,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.12,
                          duration: 0.45,
                        }}
                        className="
                          mt-3

                          max-w-[750px]

                          text-xs
                          leading-6

                          text-white/60

                          md:text-sm
                          md:leading-7
                        "
                      >
                        {activeItem.body}
                      </motion.p>

                      {activeItem.bullets?.length > 0 && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay: 0.18,
                          }}
                          className="
                            mt-4
                            hidden
                            flex-wrap
                            gap-2

                            md:flex
                          "
                        >
                          {activeItem.bullets
                            .slice(0, 4)
                            .map(
                              (
                                bullet,
                                bulletIndex
                              ) => (
                                <span
                                  key={
                                    bulletIndex
                                  }
                                  className="
                                    rounded-full

                                    border
                                    border-white/15

                                    bg-black/15

                                    px-3
                                    py-1.5

                                    text-[9px]
                                    font-medium

                                    text-white/70

                                    backdrop-blur-sm
                                  "
                                >
                                  {bullet}
                                </span>
                              )
                            )}
                        </motion.div>
                      )}
                    </div>

                    <motion.button
                      whileHover={{
                        scale: 1.08,
                        rotate: isRTL
                          ? -6
                          : 6,
                      }}
                      whileTap={{
                        scale: 0.94,
                      }}
                      className="
                        flex
                        h-13
                        w-13
                        shrink-0

                        items-center
                        justify-center

                        rounded-full

                        border
                        border-white/25

                        bg-black/20

                        text-white

                        backdrop-blur-md

                        transition-colors
                        duration-300

                        hover:border-accent
                        hover:bg-accent
                        hover:text-black

                        md:h-14
                        md:w-14
                      "
                      type="button"
                    >
                      <ArrowUpRight size={20} />
                    </motion.button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div
              className={`
                absolute
                top-1/2

                hidden
                -translate-y-1/2

                flex-col
                items-start
                gap-4

                xl:flex

                ${isRTL
                  ? '-right-[70px]'
                  : '-left-[70px]'
                }
              `}
            >
              {pillarsData.map(
                (_, index) => {
                  const active =
                    activeIndex === index;

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        goToService(index)
                      }
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <motion.span
                        animate={{
                          opacity: active
                            ? 1
                            : 0.22,

                          scale: active
                            ? 1.05
                            : 1,
                        }}
                        transition={{
                          duration: 0.35,
                        }}
                        dir="ltr"
                        className="
                          min-w-[20px]

                          text-[11px]
                          font-semibold
                          tabular-nums

                          text-white
                        "
                      >
                        {String(
                          index + 1
                        ).padStart(2, '0')}
                      </motion.span>

                      <motion.span
                        animate={{
                          width: active
                            ? 20
                            : 0,

                          opacity: active
                            ? 1
                            : 0,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        }}
                        className="
                          h-[2px]
                          bg-accent
                        "
                      />
                    </button>
                  );
                }
              )}
            </div>

            <div
              className={`
                absolute
                top-1/2

                hidden
                -translate-y-1/2

                flex-col
                gap-3

                xl:flex

                ${isRTL
                  ? '-left-[90px]'
                  : '-right-[90px]'
                }
              `}
            >
              {pillarsData.map(
                (item, index) => {
                  const active =
                    activeIndex === index;

                  return (
                    <motion.button
                      key={
                        item.number ||
                        index
                      }
                      type="button"
                      onClick={() =>
                        goToService(index)
                      }
                      animate={{
                        opacity: active
                          ? 1
                          : 0.38,

                        scale: active
                          ? 1.05
                          : 0.9,
                      }}
                      whileHover={{
                        opacity: 1,
                        scale: 1.05,
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                      className={`
                        relative

                        h-[56px]
                        w-[74px]

                        overflow-hidden

                        rounded-[7px]

                        border-2

                        ${active
                          ? 'border-accent'
                          : 'border-transparent'
                        }
                      `}
                    >
                      <img
                        src={
                          PILLAR_IMAGES[
                          index %
                          PILLAR_IMAGES.length
                          ]
                        }
                        alt={item.title}
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />

                      {!active && (
                        <div
                          className="
                            absolute
                            inset-0

                            bg-black/35
                          "
                        />
                      )}

                      <AnimatePresence>
                        {active && (
                          <motion.div
                            initial={{
                              scaleX: 0,
                            }}
                            animate={{
                              scaleX: 1,
                            }}
                            exit={{
                              scaleX: 0,
                            }}
                            style={{
                              transformOrigin:
                                isRTL
                                  ? 'right'
                                  : 'left',
                            }}
                            className="
                              absolute
                              bottom-0
                              left-0
                              right-0

                              h-[2px]

                              bg-accent
                            "
                          />
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                }
              )}
            </div>
          </div>

          <div
            className="
              mt-5

              hidden
              items-center
              gap-4

              lg:flex
            "
          >
            <span
              dir="ltr"
              className="
                text-[10px]
                font-semibold
                text-white/30
              "
            >
              01
            </span>

            <div
              className="
                relative

                h-[2px]
                flex-1

                overflow-hidden

                bg-white/[0.07]
              "
            >
              <motion.div
                style={{
                  scaleX: progressScale,

                  transformOrigin: isRTL
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

            <span
              dir="ltr"
              className="
                text-[10px]
                font-semibold
                text-white/30
              "
            >
              {formattedTotal}
            </span>

            <span
              className="
                ms-2

                text-[9px]
                uppercase
                tracking-[0.2em]

                text-white/25
              "
            >
              Scroll
            </span>
          </div>

          <div
            className="
              mt-5

              flex
              gap-2

              overflow-x-auto
              pb-2

              lg:hidden
            "
          >
            {pillarsData.map(
              (item, index) => {
                const active =
                  activeIndex === index;

                return (
                  <button
                    key={
                      item.number ||
                      index
                    }
                    type="button"
                    onClick={() =>
                      setActiveIndex(index)
                    }
                    className={`
                      shrink-0

                      rounded-full

                      border

                      px-4
                      py-2

                      text-xs
                      font-bold

                      transition-all
                      duration-300

                      ${active
                        ? `
                            border-accent
                            bg-accent
                            text-black
                          `
                        : `
                            border-white/10
                            text-white/45
                          `
                      }
                    `}
                  >
                    <span dir="ltr">
                      {String(
                        index + 1
                      ).padStart(2, '0')}
                    </span>

                    <span className="mx-2 opacity-30">
                      /
                    </span>

                    {item.title}
                  </button>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
}