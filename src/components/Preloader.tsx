import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial state
    gsap.set([progressBarRef.current, logoRef.current, percentRef.current], {
      opacity: 0,
      y: 30
    });

    // Animate in elements
    tl.to([logoRef.current, percentRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(progressBarRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4");

    // Progress bar animation
    let progress = 0;
    const progressAnimation = gsap.to({}, {
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        progress = Math.round(this.progress() * 100);
        if (percentRef.current) {
          percentRef.current.textContent = `${progress}%`;
        }
        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, {
            width: `${progress}%`
          });
        }
      },
      onComplete: () => {
        // Exit animation
        gsap.to(preloaderRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "power3.inOut",
          onComplete: () => {
            onComplete();
          }
        });
      }
    });

    return () => {
      tl.kill();
      progressAnimation.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="text-center">
        {/* Logo/Brand */}
        <div
          ref={logoRef}
          className="mb-8"
        >
          <h1 className="text-6xl font-bold text-gradient-primary mb-4">
            Techyzncode
          </h1>
          <p className="text-muted-foreground text-lg">Loading Experience...</p>
        </div>

        {/* Progress Container */}
        <div className="w-80 mx-auto">
          {/* Progress Bar Background */}
          <div className="relative h-1 bg-muted rounded-full overflow-hidden">
            {/* Progress Bar */}
            <div
              ref={progressBarRef}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent rounded-full glow-primary"
              style={{ width: '0%' }}
            />
          </div>
          
          {/* Percentage */}
          <div className="mt-4">
            <span
              ref={percentRef}
              className="text-2xl font-semibold text-primary"
            >
              0%
            </span>
          </div>
        </div>

        {/* Floating orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary rounded-full opacity-20 float" />
          <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-accent rounded-full opacity-15 float-delayed" />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-pink rounded-full opacity-25 float" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;