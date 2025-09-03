import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Palette, 
  Lightbulb, 
  Rocket, 
  Lightning, 
  Globe 
} from 'phosphor-react';
import profileImage from '@/assets/profile.jpg';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { icon: Code, name: 'React', color: 'text-primary' },
    { icon: Lightning, name: 'TypeScript', color: 'text-accent' },
    { icon: Palette, name: 'GSAP', color: 'text-pink' },
    { icon: Globe, name: 'Next.js', color: 'text-secondary' },
    { icon: Lightbulb, name: 'Three.js', color: 'text-primary' },
    { icon: Rocket, name: 'Node.js', color: 'text-accent' }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Section fade and blur clear animation
    gsap.fromTo(section, {
      opacity: 0,
      filter: 'blur(10px)'
    }, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.5,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Image animation - slide from left with rotation
    gsap.fromTo(imageRef.current, {
      x: -100,
      opacity: 0,
      rotation: -10
    }, {
      x: 0,
      opacity: 1,
      rotation: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

    // Content animation
    gsap.fromTo(contentRef.current, {
      x: 50,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

    // Skills icons staggered animation
    gsap.fromTo('.skill-icon', {
      scale: 0,
      opacity: 0,
      rotation: -180
    }, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: skillsRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-accent/15 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div 
            ref={imageRef}
            className="relative group"
          >
            <div className="relative">
              {/* Glowing frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full p-1 glow-primary">
                <div className="w-full h-full bg-background rounded-full p-4">
                  <img 
                    src={profileImage}
                    alt="Techyzncode - Web Developer"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              
              {/* Hover effects */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Floating elements around image */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full opacity-60 float" />
            <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-accent rounded-full opacity-40 float-delayed" />
            <div className="absolute top-1/2 -right-8 w-4 h-4 bg-pink rounded-full opacity-50 float" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                About{' '}
                <span className="text-gradient-secondary">Me</span>
              </h2>
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm a passionate web developer who thrives on creating immersive digital experiences 
                  that push the boundaries of what's possible on the web.
                </p>
                <p>
                  With expertise in modern frameworks like React and Next.js, combined with advanced 
                  animation libraries like GSAP and Three.js, I craft websites that don't just look 
                  amazing—they feel alive.
                </p>
                <p>
                  My approach blends technical precision with creative vision, ensuring every project 
                  delivers both stunning visuals and seamless user experiences.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef}>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                Core Technologies
              </h3>
              
              <div className="grid grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="skill-icon glass rounded-2xl p-6 text-center hover-lift group cursor-pointer"
                  >
                    <skill.icon 
                      size={40} 
                      className={`${skill.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                    />
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                      {skill.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;