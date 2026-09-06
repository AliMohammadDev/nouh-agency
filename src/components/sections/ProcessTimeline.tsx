import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'motion/react';
import {
  Search,
  MousePointer2,
  Route,
  PenTool,
  Hammer,
  Rocket,
  type LucideIcon,
} from 'lucide-react';
import { useDirection } from '../../hooks/useDirection';
import blackBg from '../../assets/images/black2.jpg';

interface StepItem {
  number: string;
  stepKey: string;
  titleKey: string;
  descKey: string;
  icon: LucideIcon;
}

const STEPS: StepItem[] = [
  {
    number: '01',
    stepKey: 'process.steps.01.step',
    titleKey: 'process.steps.01.title',
    descKey: 'process.steps.01.desc',
    icon: Search,
  },
  {
    number: '02',
    stepKey: 'process.steps.02.step',
    titleKey: 'process.steps.02.title',
    descKey: 'process.steps.02.desc',
    icon: MousePointer2,
  },
  {
    number: '03',
    stepKey: 'process.steps.03.step',
    titleKey: 'process.steps.03.title',
    descKey: 'process.steps.03.desc',
    icon: Route,
  },
  {
    number: '04',
    stepKey: 'process.steps.04.step',
    titleKey: 'process.steps.04.title',
    descKey: 'process.steps.04.desc',
    icon: PenTool,
  },
  {
    number: '05',
    stepKey: 'process.steps.05.step',
    titleKey: 'process.steps.05.title',
    descKey: 'process.steps.05.desc',
    icon: Hammer,
  },
  {
    number: '06',
    stepKey: 'process.steps.06.step',
    titleKey: 'process.steps.06.title',
    descKey: 'process.steps.06.desc',
    icon: Rocket,
  },
];

export default function ProcessTimeline() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 70%', 'end 35%'],
  });

  const progressTop = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '100%']
  );

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextStep = Math.min(
      STEPS.length - 1,
      Math.floor(latest * STEPS.length)
    );

    setActiveStep(nextStep);
  });

  const displayStep =
    hoveredStep !== null ? hoveredStep : activeStep;

  return (
    <section
      ref={sectionRef}
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
          className="absolute inset-0 h-full w-full opacity-60 object-cover select-none"
        />
        <div
          className="
            absolute
            inset-0
            opacity-[0.018]
            bg-[linear-gradient(to_right,var(--color-accent)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-accent)_1px,transparent_1px)]
            bg-[size:64px_64px]
          "
        />
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_0%,#101010_84%)]
          "
        />
        <motion.div
          animate={{
            y: displayStep * 120,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`
            absolute
            top-1/4
            h-[450px]
            w-[450px]
            rounded-full
            bg-accent/[0.025]
            blur-[160px]
            ${
              isRTL
                ? 'right-1/4'
                : 'left-1/4'
            }
          `}
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
        <div className="mb-16 max-w-3xl lg:mb-24">
          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
            }}
            className="
              mb-4
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
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
              }}
              style={{
                transformOrigin: isRTL
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
                tracking-[0.2em]
                text-accent
              "
            >
              {t('process.tagline')}
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
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                text-[44px]
                font-black
                leading-[1.05]
                tracking-tight
                text-white
                sm:text-5xl
                lg:text-[70px]
              "
            >
              {t('process.title')}
            </motion.h2>
          </div>

          <motion.p
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
              delay: 0.12,
            }}
            className="
              mt-4
              max-w-2xl
              text-sm
              leading-8
              text-white/40
              md:text-base
            "
          >
            {t('process.subtitle')}
          </motion.p>
        </div>

        <div
          ref={timelineRef}
          className="relative"
        >
          <div className="relative hidden lg:block">
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                z-0
                grid
                grid-cols-[0.9fr_90px_1.1fr]
              "
            >
              <div />
              <div className="relative">
                <div
                  className="
                    absolute
                    bottom-[130px]
                    left-1/2
                    top-[130px]
                    w-[2px]
                    -translate-x-1/2
                    overflow-visible
                    bg-white/[0.09]
                  "
                >
                  <motion.div
                    style={{
                      scaleY: scrollYProgress,
                    }}
                    className="
                      absolute
                      inset-0
                      origin-top
                      bg-accent
                    "
                  />
                  <motion.div
                    style={{
                      top: progressTop,
                    }}
                    className="
                      absolute
                      left-1/2
                      z-30
                      h-3
                      w-3
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      bg-accent
                      shadow-[0_0_0_5px_rgba(214,166,0,0.10),0_0_22px_var(--color-accent)]
                    "
                  />
                </div>
              </div>
              <div />
            </div>

            <div className="relative z-10 space-y-10">
              {STEPS.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = displayStep === index;
                const isPassed = activeStep > index;

                return (
                  <div
                    key={item.number}
                    onMouseEnter={() => setHoveredStep(index)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className="
                      group
                      grid
                      min-h-[260px]
                      cursor-pointer
                      grid-cols-[0.9fr_90px_1.1fr]
                      items-center
                    "
                  >
                    <motion.div
                      animate={{
                        x: isActive
                          ? isRTL
                            ? -12
                            : 12
                          : 0,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <motion.span
                        animate={{
                          color: isActive
                            ? 'var(--color-accent)'
                            : 'rgba(255,255,255,0.28)',
                        }}
                        dir="ltr"
                        className="
                          mb-2
                          block
                          text-[10px]
                          font-bold
                          tracking-[0.18em]
                        "
                      >
                        {t(item.stepKey)}
                      </motion.span>

                      <motion.h3
                        animate={{
                          opacity: isActive ? 1 : 0.28,
                          scale: isActive ? 1 : 0.97,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
                          origin-start
                          text-3xl
                          font-bold
                          leading-tight
                          text-white
                          lg:text-[42px]
                        "
                      >
                        {t(item.titleKey)}
                      </motion.h3>
                    </motion.div>

                    <div
                      className="
                        relative
                        flex
                        h-full
                        items-center
                        justify-center
                      "
                    >
                      <motion.div
                        animate={{
                          scale: isActive
                            ? 1.3
                            : isPassed
                              ? 1
                              : 0.82,
                          backgroundColor:
                            isActive || isPassed
                              ? 'var(--color-accent)'
                              : '#101010',
                          borderColor:
                            isActive || isPassed
                              ? 'var(--color-accent)'
                              : 'rgba(255,255,255,.18)',
                        }}
                        transition={{
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`
                          relative
                          z-20
                          flex
                          h-5
                          w-5
                          items-center
                          justify-center
                          rounded-full
                          border-2
                          ${
                            isActive
                              ? 'shadow-[0_0_22px_var(--color-accent)]'
                              : ''
                          }
                        `}
                      >
                        <motion.span
                          animate={{
                            scale: isActive ? 1 : 0,
                          }}
                          className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-black
                          "
                        />
                      </motion.div>
                    </div>

                    <motion.article
                      animate={{
                        opacity: isActive ? 1 : 0.35,
                        y: isActive ? -4 : 7,
                        scale: isActive ? 1 : 0.98,
                        borderColor: isActive
                          ? 'rgba(214,166,0,.3)'
                          : 'rgba(255,255,255,.07)',
                        backgroundColor: isActive
                          ? 'rgba(255,255,255,.04)'
                          : 'rgba(255,255,255,.018)',
                      }}
                      transition={{
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="
                        relative
                        overflow-hidden
                        rounded-[22px]
                        border
                        p-8
                      "
                    >
                      <motion.div
                        animate={{
                          opacity: isActive ? 1 : 0,
                        }}
                        className={`
                          pointer-events-none
                          absolute
                          -top-20
                          h-[220px]
                          w-[220px]
                          rounded-full
                          bg-accent/[0.06]
                          blur-[90px]
                          ${
                            isRTL
                              ? '-left-20'
                              : '-right-20'
                          }
                        `}
                      />

                      <motion.div
                        animate={{
                          scale: isActive ? 1 : 0.82,
                          rotate: isActive
                            ? isRTL
                              ? -8
                              : 8
                            : 0,
                          color: isActive
                            ? 'var(--color-accent)'
                            : 'rgba(255,255,255,.35)',
                          backgroundColor: isActive
                            ? 'rgba(214,166,0,.08)'
                            : 'rgba(255,255,255,.025)',
                        }}
                        transition={{
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
                          relative
                          z-10
                          mb-6
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/[0.09]
                        "
                      >
                        <IconComponent className="h-5 w-5" />
                      </motion.div>

                      <div className="relative z-10 overflow-hidden pb-1">
                        <motion.h4
                          animate={{
                            y: isActive ? 0 : 6,
                            opacity: isActive ? 1 : 0.65,
                          }}
                          transition={{
                            duration: 0.5,
                          }}
                          className="
                            text-xl
                            font-bold
                            text-white
                            md:text-2xl
                          "
                        >
                          {t(item.titleKey)}
                        </motion.h4>
                      </div>

                      <motion.p
                        animate={{
                          opacity: isActive ? 1 : 0.5,
                          y: isActive ? 0 : 5,
                        }}
                        transition={{
                          duration: 0.5,
                        }}
                        className="
                          relative
                          z-10
                          mt-3
                          text-xs
                          leading-7
                          text-white/55
                          md:text-sm
                        "
                      >
                        {t(item.descKey)}
                      </motion.p>

                      <motion.div
                        animate={{
                          scaleX: isActive ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.65,
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
                    </motion.article>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative block lg:hidden">
            <div
              className={`
                pointer-events-none
                absolute
                bottom-2
                top-2
                w-[2px]
                bg-white/10
                ${
                  isRTL
                    ? 'right-4'
                    : 'left-4'
                }
              `}
            >
              <motion.div
                style={{
                  scaleY: scrollYProgress,
                }}
                className="
                  absolute
                  inset-0
                  origin-top
                  bg-accent
                "
              />
            </div>

            <div className="space-y-10">
              {STEPS.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = activeStep === index;
                const isPassed = activeStep > index;

                return (
                  <motion.div
                    key={item.number}
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.25,
                    }}
                    transition={{
                      duration: 0.55,
                    }}
                    className={`
                      relative
                      ${
                        isRTL
                          ? 'pr-12'
                          : 'pl-12'
                      }
                    `}
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1.2 : 1,
                        backgroundColor:
                          isActive || isPassed
                            ? 'var(--color-accent)'
                            : '#101010',
                        borderColor:
                          isActive || isPassed
                            ? 'var(--color-accent)'
                            : 'rgba(255,255,255,.2)',
                      }}
                      className={`
                        absolute
                        top-5
                        z-20
                        h-4
                        w-4
                        rounded-full
                        border-2
                        ${
                          isRTL
                            ? 'right-2'
                            : 'left-2'
                        }
                        ${
                          isActive
                            ? 'shadow-[0_0_14px_var(--color-accent)]'
                            : ''
                        }
                      `}
                    />

                    <motion.article
                      animate={{
                        borderColor: isActive
                          ? 'rgba(214,166,0,.25)'
                          : 'rgba(255,255,255,.08)',
                        backgroundColor: isActive
                          ? 'rgba(255,255,255,.04)'
                          : 'rgba(255,255,255,.025)',
                      }}
                      className="
                        w-full
                        rounded-[18px]
                        border
                        p-6
                      "
                    >
                      <div
                        className="
                          mb-4
                          flex
                          items-center
                          justify-between
                        "
                      >
                        <span
                          dir="ltr"
                          className="
                            text-[10px]
                            font-bold
                            tracking-[0.16em]
                            text-accent
                          "
                        >
                          {t(item.stepKey)}
                        </span>

                        <motion.div
                          animate={{
                            rotate: isActive
                              ? isRTL
                                ? -8
                                : 8
                              : 0,
                            scale: isActive ? 1.08 : 1,
                          }}
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-accent/30
                            bg-accent/10
                            text-accent
                          "
                        >
                          <IconComponent className="h-4 w-4" />
                        </motion.div>
                      </div>

                      <h3
                        className="
                          mb-2
                          text-xl
                          font-bold
                          text-white
                        "
                      >
                        {t(item.titleKey)}
                      </h3>

                      <p
                        className="
                          text-xs
                          leading-6
                          text-white/55
                        "
                      >
                        {t(item.descKey)}
                      </p>
                    </motion.article>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}