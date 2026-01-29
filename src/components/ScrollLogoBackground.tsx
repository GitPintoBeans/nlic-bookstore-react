// Resources for background logo that scales and fades on scroll
// https://htmlburger.com/blog/react-website-examples/
// https://freefrontend.com/react-scroll-effects/
// https://mrpops.ua/en/

import { useEffect, useMemo, useState } from "react";

type Props = {
  src: string;
  alt?: string;
  // How far (px) user scrolls for the full effect
  scrollDistance?: number; // default 500
  // Starting / ending scale
  scaleFrom?: number; // default 0.9
  scaleTo?: number;   // default 2.2
  // Starting / ending opacity
  opacityFrom?: number; // default 0.18
  opacityTo?: number;   // default 0
};

export default function ScrollLogoBackground({
  src,
  alt = "Background logo",
  scrollDistance = 500,
  scaleFrom = 0.9,
  scaleTo = 2.2,
  opacityFrom = 0.18,
  opacityTo = 0,
}: Props) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      // throttle via rAF for smoothness
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrollY(window.scrollY || 0);
      });
    };

    onScroll(); // initialize
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const { scale, opacity } = useMemo(() => {
    const tRaw = scrollDistance <= 0 ? 1 : scrollY / scrollDistance;
    const t = Math.max(0, Math.min(1, tRaw)); // clamp 0..1

    const scale = scaleFrom + (scaleTo - scaleFrom) * t;
    const fadeStart = 0.2; // start background logo after 20% scroll
    const fadeT = Math.max(0, (t - fadeStart) / (1 - fadeStart));

    const opacity = opacityFrom * fadeT;


    return { scale, opacity };
  }, [scrollY, scrollDistance, scaleFrom, scaleTo, opacityFrom, opacityTo]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          position: "absolute",
          left: "50%",
          top: "35%",
          transform: `translate(-50%, -50%) scale(${scale})`,
          opacity,
          filter: "grayscale(100%)",
          maxWidth: "520px",
          width: "70vw",
          height: "auto",
          transition: "opacity 60ms linear, transform 60ms linear",
          userSelect: "none",
        }}
      />
    </div>
  );
}
