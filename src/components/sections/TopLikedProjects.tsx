import { useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  motion,
  useMotionValue,
  useSpring,
  Variants,
} from 'motion/react';

import {
  Heart,
  Loader2,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

import { useDirection } from '../../hooks/useDirection';
import { useGetTopLikedProjects } from '../../api/project';
import { Project } from '@/src/types/project';
import { formatLikes } from '../../utils/numberFormatter';
import blackBg from '../../assets/images/black2.jpg';

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.98,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;

  isRTL: boolean;

  defaultDescription: string;

  onOpen: () => void;

  onCursorEnter: (
    x: number,
    y: number
  ) => void;

  onCursorMove: (
    x: number,
    y: number
  ) => void;

  onCursorLeave: () => void;
}

function ProjectCard({
  project,
  index,
  total,

  isRTL,

  defaultDescription,

  onOpen,

  onCursorEnter,
  onCursorMove,
  onCursorLeave,
}: ProjectCardProps) {
  const [hovered, setHovered] =
    useState(false);

  const imageX = useMotionValue(0);
  const imageY = useMotionValue(0);

  const smoothImageX = useSpring(
    imageX,
    {
      stiffness: 170,
      damping: 25,
    }
  );

  const smoothImageY = useSpring(
    imageY,
    {
      stiffness: 170,
      damping: 25,
    }
  );

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothRotateX = useSpring(
    rotateX,
    {
      stiffness: 180,
      damping: 30,
    }
  );

  const smoothRotateY = useSpring(
    rotateY,
    {
      stiffness: 180,
      damping: 30,
    }
  );

  const handlePointerEnter = (
    event: ReactPointerEvent<HTMLElement>
  ) => {
    setHovered(true);

    if (event.pointerType === 'mouse') {
      onCursorEnter(
        event.clientX,
        event.clientY
      );
    }
  };

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLElement>
  ) => {
    if (event.pointerType !== 'mouse') {
      return;
    }

    onCursorMove(
      event.clientX,
      event.clientY
    );

    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
        rect.width -
      0.5;

    const y =
      (event.clientY - rect.top) /
        rect.height -
      0.5;

    imageX.set(x * 12);
    imageY.set(y * 12);

    rotateY.set(x * 1.6);
    rotateX.set(y * -1.6);
  };

  const handlePointerLeave = () => {
    setHovered(false);

    imageX.set(0);
    imageY.set(0);

    rotateX.set(0);
    rotateY.set(0);

    onCursorLeave();
  };

  return (
    <motion.article
      variants={itemVariants}
      onPointerEnter={
        handlePointerEnter
      }
      onPointerMove={
        handlePointerMove
      }
      onPointerLeave={
        handlePointerLeave
      }
      onClick={onOpen}
      whileTap={{
        scale: 0.985,
      }}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 1200,
      }}
      className="
        group
        relative

        h-[340px]
        w-[88vw]
        max-w-[520px]

        shrink-0

        overflow-hidden

        rounded-[22px]

        border
        border-white/[0.07]

        bg-[#181818]

        cursor-pointer

        md:h-[360px]
        md:w-[500px]

        lg:h-[365px]
        lg:w-[520px]
        lg:cursor-none
      "
    >
      <motion.div
        style={{
          x: smoothImageX,
          y: smoothImageY,
        }}
        className="
          absolute
          -inset-[15px]
        "
      >
        <motion.img
          src={project.main_image || ''}
          alt={project.name}
          referrerPolicy="no-referrer"
          animate={{
            scale: hovered
              ? 1.055
              : 1,
          }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            h-full
            w-full

            object-cover
            object-center
          "
        />
      </motion.div>

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          bg-gradient-to-t
          from-black/95
          via-black/60
          via-45%
          to-transparent
        "
      />

      <div
        className={`
          absolute
          top-5
          z-20

          text-[10px]
          font-bold
          tracking-[0.14em]

          text-white/55

          ${
            isRTL
              ? 'right-5'
              : 'left-5'
          }
        `}
      >
        <span dir="ltr">
          {String(index + 1).padStart(
            2,
            '0'
          )}
          {' / '}
          {String(total).padStart(
            2,
            '0'
          )}
        </span>
      </div>

      <div
        className={`
          absolute
          top-5
          z-20

          flex
          items-center
          gap-2

          rounded-full

          border
          border-white/10

          bg-black/40

          px-3
          py-1.5

          backdrop-blur-md

          ${
            isRTL
              ? 'left-5'
              : 'right-5'
          }
        `}
      >
        <Heart
          className="
            h-3.5
            w-3.5

            fill-red-500
            text-red-500
          "
        />

        <span className="text-[10px] font-bold">
          {formatLikes(
            project.likes_count
          )}
        </span>
      </div>

      <motion.div
        animate={{
          y: hovered ? -8 : 0,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-20

          p-6
          md:p-7
        "
      >
        {project.categories && (
          <motion.div
            animate={{
              opacity: hovered
                ? 1
                : 0.75,
            }}
            className="
              mb-3

              inline-flex

              rounded-full

              border
              border-white/15

              bg-black/25

              px-3
              py-1.5

              text-[9px]
              font-semibold

              text-white/75

              backdrop-blur-md
            "
          >
            {project.categories.name}
          </motion.div>
        )}

        <h3
          className="
            text-[26px]
            font-black

            leading-tight
            tracking-[-0.025em]

            text-white

            md:text-[30px]
          "
        >
          {project.name}
        </h3>

        <motion.p
          animate={{
            opacity: hovered
              ? 0.78
              : 0.52,
          }}
          className="
            mt-3

            max-w-[430px]

            line-clamp-2

            text-xs
            leading-6

            text-white

            md:text-sm
          "
        >
          {project.description ||
            defaultDescription}
        </motion.p>

        <motion.div
          animate={{
            scaleX: hovered ? 1 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            transformOrigin: isRTL
              ? 'right'
              : 'left',
          }}
          className="
            mt-5

            h-[2px]
            w-full

            bg-gradient-to-r
            from-transparent
            via-accent
            to-transparent
          "
        />
      </motion.div>
    </motion.article>
  );
}

export default function TopLikedProjects() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  const navigate = useNavigate();

  const sliderRef =
    useRef<HTMLDivElement>(null);

  const {
    data: topProjects,
    isLoading,
  } = useGetTopLikedProjects() as {
    data: Project[] | undefined;
    isLoading: boolean;
  };

  const [cursorVisible, setCursorVisible] =
    useState(false);

  const cursorX =
    useMotionValue(-200);

  const cursorY =
    useMotionValue(-200);

  const smoothCursorX = useSpring(
    cursorX,
    {
      stiffness: 330,
      damping: 28,
      mass: 0.45,
    }
  );

  const smoothCursorY = useSpring(
    cursorY,
    {
      stiffness: 330,
      damping: 28,
      mass: 0.45,
    }
  );

  const showCursor = (
    x: number,
    y: number
  ) => {
    cursorX.set(x);
    cursorY.set(y);

    setCursorVisible(true);
  };

  const moveCursor = (
    x: number,
    y: number
  ) => {
    cursorX.set(x);
    cursorY.set(y);
  };

  const hideCursor = () => {
    setCursorVisible(false);
  };

  const slide = (
    direction: 'next' | 'prev'
  ) => {
    if (!sliderRef.current) {
      return;
    }

    const amount = 540;

    sliderRef.current.scrollBy({
      left:
        direction === 'next'
          ? isRTL
            ? -amount
            : amount
          : isRTL
            ? amount
            : -amount,

      behavior: 'smooth',
    });
  };

  if (isLoading) {
    return (
      <section className="flex min-h-[500px] items-center justify-center bg-black py-24 text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />

          <span className="font-cairo text-xs uppercase tracking-widest text-zinc-500">
            {t('topLiked.loading')}
          </span>
        </div>
      </section>
    );
  }

  if (
    !topProjects ||
    topProjects.length === 0
  ) {
    return null;
  }

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

        lg:py-28
      "
    >
      <motion.div
        style={{
          x: smoothCursorX,
          y: smoothCursorY,
        }}
        className="
          pointer-events-none

          fixed
          left-0
          top-0

          z-[9999]

          hidden
          lg:block
        "
      >
        <motion.div
          animate={{
            opacity: cursorVisible
              ? 1
              : 0,

            scale: cursorVisible
              ? 1
              : 0.6,
          }}
          transition={{
            opacity: {
              duration: 0.15,
            },

            scale: {
              duration: 0.3,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            },
          }}
          className="
            flex

            -translate-x-1/2
            -translate-y-1/2

            items-center
            gap-3

            whitespace-nowrap

            rounded-full

            border
            border-white/15

            bg-[#181818]/90

            py-2
            ps-4
            pe-2

            text-xs
            font-bold

            text-white

            shadow-[0_12px_40px_rgba(0,0,0,0.4)]

            backdrop-blur-xl
          "
        >
          <span>
            {t('topLiked.viewProject')}
          </span>

          <motion.span
            animate={{
              rotate: cursorVisible
                ? 45
                : 0,
            }}
            className="
              flex
              h-9
              w-9

              items-center
              justify-center

              rounded-full

              bg-accent
              text-black
            "
          >
            <ArrowUpRight size={16} />
          </motion.span>
        </motion.div>
      </motion.div>

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
            mb-12

            flex
            flex-col
            gap-7

            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          <div className="max-w-3xl">
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
                viewport={{
                  once: true,
                }}
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
                  uppercase
                  tracking-[0.2em]

                  text-accent
                "
              >
                {t(
                  'topLiked.tagline'
                )}
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
                  duration: 0.85,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="
                  text-[40px]
                  font-black
                  leading-[1.05]

                  sm:text-5xl
                  lg:text-[58px]
                "
              >
                {t(
                  'topLiked.title'
                )}
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
              viewport={{
                once: true,
              }}
              className="
                mt-4
                max-w-2xl

                text-sm
                leading-7

                text-white/40
              "
            >
              {t(
                'topLiked.subtitle'
              )}
            </motion.p>
          </div>

          {topProjects.length > 2 && (
            <div
              className="
                flex
                shrink-0
                items-center
                gap-2
              "
            >
              <motion.button
                type="button"
                onClick={() =>
                  slide('prev')
                }
                whileHover={{
                  scale: 1.06,
                }}
                whileTap={{
                  scale: 0.94,
                }}
                className="
                  flex
                  h-12
                  w-12

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/10

                  bg-white/[0.03]

                  text-white/65

                  transition-colors

                  hover:border-accent/40
                  hover:bg-accent
                  hover:text-black
                "
              >
                {isRTL ? (
                  <ArrowRight
                    size={18}
                  />
                ) : (
                  <ArrowLeft
                    size={18}
                  />
                )}
              </motion.button>

              <motion.button
                type="button"
                onClick={() =>
                  slide('next')
                }
                whileHover={{
                  scale: 1.06,
                }}
                whileTap={{
                  scale: 0.94,
                }}
                className="
                  flex
                  h-12
                  w-12

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-accent/30

                  bg-accent

                  text-black

                  transition-transform
                "
              >
                {isRTL ? (
                  <ArrowLeft
                    size={18}
                  />
                ) : (
                  <ArrowRight
                    size={18}
                  />
                )}
              </motion.button>
            </div>
          )}
        </div>

        <div className="relative">
          <motion.div
            ref={sliderRef}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: '-80px',
            }}
            className="
              flex

              snap-x
              snap-mandatory

              gap-5

              overflow-x-auto

              pb-3

              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden

              scroll-smooth
            "
          >
            {topProjects.map(
              (project, index) => (
                <div
                  key={project.id}
                  className="
                    shrink-0
                    snap-start
                  "
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    total={
                      topProjects.length
                    }
                    isRTL={isRTL}
                    defaultDescription={t(
                      'topLiked.defaultDesc'
                    )}
                    onOpen={() =>
                      navigate(
                        `/work/project/${project.id}`
                      )
                    }
                    onCursorEnter={
                      showCursor
                    }
                    onCursorMove={
                      moveCursor
                    }
                    onCursorLeave={
                      hideCursor
                    }
                  />
                </div>
              )
            )}
          </motion.div>

          <div
            className="
              pointer-events-none

              absolute
              inset-y-0
              left-0

              hidden
              w-12

              bg-gradient-to-r
              from-black
              to-transparent

              lg:block
            "
          />

          <div
            className="
              pointer-events-none

              absolute
              inset-y-0
              right-0

              hidden
              w-12

              bg-gradient-to-l
              from-black
              to-transparent

              lg:block
            "
          />
        </div>
      </div>
    </section>
  );
}