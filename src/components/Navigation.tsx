import React, { useState, useEffect } from 'react';
import { List, X } from 'phosphor-react';
import { gsap } from 'gsap';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Animate nav on load
    gsap.fromTo('.nav-item', 
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        ease: "power3.out",
        delay: 3.5 // After preloader
      }
    );
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-2xl px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="nav-item">
              <h2 className="text-xl font-bold text-gradient-primary">
                Techyzncode
              </h2>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="nav-item text-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden nav-item p-2 rounded-lg glass hover:glow-primary transition-all duration-300"
            >
              <List size={24} className="text-primary" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={toggleMenu}
          />
          
          {/* Menu Content */}
          <div className="relative h-full flex items-center justify-center">
            <div className="glass rounded-3xl p-8 mx-4 w-full max-w-sm">
              {/* Close Button */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-lg hover:bg-muted transition-colors duration-300"
                >
                  <X size={24} className="text-primary" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="space-y-6">
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-xl font-semibold text-foreground hover:text-primary transition-colors duration-300 py-3"
                    style={{ 
                      animationDelay: `${index * 0.1}s` 
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;