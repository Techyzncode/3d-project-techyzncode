import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 4 }); // After preloader

    // Initial states
    gsap.set([headlineRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    });

    gsap.set(splineRef.current, {
      opacity: 0,
      x: 100,
      scale: 0.8
    });

    // Animate in sequence
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: "power3.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power3.out"
    }, "-=0.8")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .to(splineRef.current, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.5,
      ease: "power3.out"
    }, "-=1");

    // Floating animation for background elements
    gsap.to('.glow-orb', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5
    });

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating orbs */}
        <div className="glow-orb absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-xl" />
        <div className="glow-orb absolute top-3/4 right-1/4 w-48 h-48 bg-accent/15 rounded-full blur-2xl" />
        <div className="glow-orb absolute bottom-1/4 left-1/3 w-24 h-24 bg-pink/25 rounded-full blur-lg" />
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 min-h-screen">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen pt-32 pb-16">
            {/* Content */}
            <div className="space-y-8">
              <h1 
                ref={headlineRef}
                className="text-5xl md:text-7xl font-bold leading-tight"
              >
                Hi, I'm{' '}
                <span className="text-gradient-primary">
                  Techyzncode
                </span>
                <br />
                <span className="text-2xl md:text-4xl font-light text-muted-foreground">
                  Web Developer
                </span>
              </h1>

              <p 
                ref={subtitleRef}
                className="text-xl text-muted-foreground max-w-lg leading-relaxed"
              >
                Crafting immersive digital experiences with cutting-edge technologies. 
                Specializing in modern web development, 3D graphics, and interactive animations.
              </p>

              <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={scrollToContact}
                  className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-2xl glow-primary hover-lift transition-all duration-300"
                >
                  Hire Me
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-6 text-lg rounded-2xl glass transition-all duration-300"
                >
                  View Projects
                </Button>
              </div>
            </div>

            {/* Spline 3D Model */}
            <div 
              ref={splineRef}
              className="relative h-[600px] rounded-3xl overflow-hidden glass"
            >
              <iframe 
                src='https://my.spline.design/genkubgreetingrobot-BbRJKfSc9hma6TjtJicr6cUm/' 
                frameBorder='0' 
                width='100%' 
                height='100%'
                className="rounded-3xl"
              />
              
              {/* Overlay glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-4 w-20 h-20 bg-primary/20 rounded-full blur-xl" />
                <div className="absolute bottom-4 right-4 w-16 h-16 bg-accent/30 rounded-full blur-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;