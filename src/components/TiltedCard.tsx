'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface TiltedCardProps {
  imageSrc?: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  displayOverlayContent?: boolean;
  overlayContent?: React.ReactNode;
  className?: string;
}

const springParams = { stiffness: 300, damping: 20, mass: 0.5 };

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted Card Image',
  captionText = '',
  containerHeight = '100%',
  containerWidth = '100%',
  imageHeight = '100%',
  imageWidth = '100%',
  rotateAmplitude = 12,
  scaleOnHover = 1.05,
  showMobileWarning = false,
  showTooltip = true,
  displayOverlayContent = false,
  overlayContent = null,
  className = '',
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useSpring(0, springParams);
  const y = useSpring(0, springParams);
  const scale = useSpring(1, springParams);

  const [opacity, setOpacity] = useState(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseEnter() {
    setOpacity(1);
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    scale.set(1);
    setOpacity(0);
  }

  return (
    <figure
      ref={ref}
      style={{
        width: containerWidth,
        height: containerHeight,
        perspective: '1000px',
      }}
      className="relative flex items-center justify-center cursor-pointer m-0 p-0 overflow-visible group"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX: useSpring(y.get() * -rotateAmplitude, springParams),
          rotateY: useSpring(x.get() * rotateAmplitude, springParams),
          scale,
        }}
        className={`relative z-10 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-shadow duration-300 transform-gpu ${className}`}
      >
        {imageSrc && (
          <img
            src={imageSrc}
            alt={altText}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            className="absolute inset-0 block rounded-2xl pointer-events-none"
          />
        )}

        {displayOverlayContent && overlayContent && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            {overlayContent}
          </div>
        )}
      </motion.div>

      {showTooltip && captionText && (
        <motion.figcaption
          style={{ opacity }}
          className="absolute left-1/2 bottom-[-40px] z-30 transform -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
        >
          {captionText}
        </motion.figcaption>
      )}

      {showMobileWarning && (
        <div className="absolute top-4 right-4 z-40 md:hidden bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
          Hover effects work best on desktop
        </div>
      )}
    </figure>
  );
}
