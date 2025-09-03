import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Code, Eye } from 'phosphor-react';
import { Button } from '@/components/ui/button';

// Import project images
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';
import project5 from '@/assets/project-5.jpg';
import project6 from '@/assets/project-6.jpg';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Modern shopping experience with advanced filtering and smooth animations",
      image: project1,
      tech: ["React", "TypeScript", "GSAP"],
      category: "Web App"
    },
    {
      id: 2,
      title: "AI Dashboard",
      description: "Data visualization platform with real-time analytics and neural network insights",
      image: project2,
      tech: ["Next.js", "Three.js", "D3.js"],
      category: "Dashboard"
    },
    {
      id: 3,
      title: "Crypto Trading Platform",
      description: "Real-time trading interface with advanced charting and portfolio management",
      image: project3,
      tech: ["React", "WebSocket", "Charts.js"],
      category: "FinTech"
    },
    {
      id: 4,
      title: "VR Experience Hub",
      description: "Immersive virtual reality interface with 3D interactions and spatial design",
      image: project4,
      tech: ["Three.js", "WebXR", "GSAP"],
      category: "VR/AR"
    },
    {
      id: 5,
      title: "Smart Home Control",
      description: "IoT device management with intuitive controls and energy monitoring",
      image: project5,
      tech: ["React Native", "IoT", "Node.js"],
      category: "IoT"
    },
    {
      id: 6,
      title: "Social Media Platform",
      description: "Next-generation social platform with real-time interactions and AR filters",
      image: project6,
      tech: ["React", "WebRTC", "AR.js"],
      category: "Social"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Title animation
    gsap.fromTo(titleRef.current, {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

    // Project cards staggered animation
    gsap.fromTo('.project-card', {
      opacity: 0,
      y: 100,
      scale: 0.8
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-accent/10 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Featured{' '}
            <span className="text-gradient-primary">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of cutting-edge web applications and immersive digital experiences
          </p>
        </div>

        {/* Projects Grid */}
        <div 
          ref={containerRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card glass rounded-3xl overflow-hidden hover-lift group cursor-pointer"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    className="glass rounded-full p-3 hover:glow-primary"
                  >
                    <Eye size={16} className="text-primary" />
                  </Button>
                  <Button
                    size="sm"
                    className="glass rounded-full p-3 hover:glow-accent"
                  >
                    <Code size={16} className="text-accent" />
                  </Button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="glass rounded-full px-3 py-1 text-xs font-medium text-primary">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <ArrowUpRight 
                    size={20} 
                    className="text-muted-foreground group-hover:text-primary transition-colors duration-300" 
                  />
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="bg-muted rounded-lg px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-16">
          <Button 
            className="btn-glow bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 py-4 text-lg rounded-2xl glow-primary transition-all duration-300"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;