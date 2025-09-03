import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Code, Coffee } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Footer fade and slide-up animation
    gsap.fromTo(footer, {
      opacity: 0,
      y: 60,
      filter: 'blur(10px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });

    // Floating particles animation
    gsap.to('.particle', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: {
        amount: 2,
        from: "random"
      }
    });

  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative py-16 border-t border-border/20"
    >
      {/* Background floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="particle absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full" />
        <div className="particle absolute top-1/2 right-1/3 w-3 h-3 bg-accent/30 rounded-full" />
        <div className="particle absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-pink/50 rounded-full" />
        <div className="particle absolute top-3/4 left-1/3 w-2.5 h-2.5 bg-secondary/25 rounded-full" />
        <div className="particle absolute bottom-1/4 right-1/4 w-2 h-2 bg-primary/35 rounded-full" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gradient-primary">
              Techyzncode
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Crafting immersive digital experiences with cutting-edge web technologies. 
              Turning ideas into interactive realities.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart size={16} className="text-pink animate-pulse" />
              <span>and</span>
              <Code size={16} className="text-primary" />
              <span>and lots of</span>
              <Coffee size={16} className="text-accent" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Navigation</h4>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Actions</h4>
            <div className="space-y-3">
              <button
                onClick={scrollToTop}
                className="block w-full text-left glass rounded-xl px-4 py-3 text-muted-foreground hover:text-primary transition-all duration-300 hover:glow-primary"
              >
                ↑ Back to Top
              </button>
              <a
                href="mailto:hello@techyzncode.dev"
                className="block glass rounded-xl px-4 py-3 text-muted-foreground hover:text-accent transition-all duration-300 hover:glow-accent"
              >
                📧 Quick Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Techyzncode. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-300">
              Terms of Service
            </a>
            <span className="text-xs opacity-50">
              v2.0.1
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;