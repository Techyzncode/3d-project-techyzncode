import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo, TwitterLogo, PaperPlaneTilt } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Form inputs fade from left
    gsap.fromTo('.form-input', {
      x: -50,
      opacity: 0,
      filter: 'blur(5px)'
    }, {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: formRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

    // Social icons glow animation
    gsap.fromTo('.social-icon', {
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
        trigger: socialRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Show success message
    toast({
      title: "Message Sent! 🚀",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });

    setIsSubmitting(false);

    // Submit button animation
    gsap.to('.submit-btn', {
      scale: 1.1,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });
  };

  const socialLinks = [
    { 
      icon: GithubLogo, 
      href: 'https://github.com/techyzncode',
      color: 'hover:text-primary hover:glow-primary'
    },
    { 
      icon: LinkedinLogo, 
      href: 'https://linkedin.com/in/techyzncode',
      color: 'hover:text-accent hover:glow-accent'
    },
    { 
      icon: TwitterLogo, 
      href: 'https://twitter.com/techyzncode',
      color: 'hover:text-pink hover:glow-pink'
    }
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-primary/10 rounded-full blur-3xl float" />
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-accent/15 rounded-full blur-2xl float-delayed" />
        
        {/* Floating particles */}
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-pink rounded-full opacity-60 float" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-primary rounded-full opacity-40 float-delayed" />
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-accent rounded-full opacity-50 float" />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's{' '}
            <span className="text-gradient-secondary">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="glass rounded-3xl p-8">
            <h3 className="text-2xl font-semibold mb-8 text-foreground">
              Send a Message
            </h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="form-input">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="glass border-primary/30 focus:border-primary focus:glow-primary bg-transparent text-foreground placeholder:text-muted-foreground rounded-2xl py-6 px-4 text-lg transition-all duration-300"
                />
              </div>
              
              <div className="form-input">
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="glass border-primary/30 focus:border-primary focus:glow-primary bg-transparent text-foreground placeholder:text-muted-foreground rounded-2xl py-6 px-4 text-lg transition-all duration-300"
                />
              </div>
              
              <div className="form-input">
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="glass border-primary/30 focus:border-primary focus:glow-primary bg-transparent text-foreground placeholder:text-muted-foreground rounded-2xl py-4 px-4 text-lg resize-none transition-all duration-300"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn w-full btn-glow bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground py-6 text-lg rounded-2xl glow-primary transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <PaperPlaneTilt size={20} />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                Get in Touch
              </h3>
              
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  Whether you have a project in mind, need technical consultation, 
                  or just want to say hello, I'd love to hear from you.
                </p>
                
                <div className="pt-4">
                  <p className="font-medium text-foreground mb-2">Response Time</p>
                  <p className="text-sm">Usually within 24 hours</p>
                </div>
                
                <div>
                  <p className="font-medium text-foreground mb-2">Best for</p>
                  <p className="text-sm">Web development, GSAP animations, 3D experiences</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div ref={socialRef} className="glass rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-6 text-foreground">
                Follow Me
              </h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon glass rounded-2xl p-4 text-muted-foreground transition-all duration-300 ${social.color}`}
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;