import React, { useState, useCallback } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import { 
  ArrowRight, Star, Code, Users, Shield, Smartphone,
  TrendingUp, CheckCircle, Globe, Zap, 
  Briefcase, Settings, Brain, Target,
  Mail, Phone, Calendar, MessageSquare, Building
} from 'lucide-react';


type Page = 'home' | 'about' | 'services' | 'work' | 'contact' | 'thank-you' | 'case-study';

interface HomePageProps {
  onNavigate: (page: Page, caseStudy?: any) => void;
}

// Typewriter component with character-by-character animation
function TypewriterText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const services = ['Web Applications', 'Mobile Apps', 'Cloud Solutions'];
  
  React.useEffect(() => {
    const currentService = services[currentIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseDuration = isDeleting ? 500 : 2000;

    if (!isDeleting && displayText === currentService) {
      // Pause before starting to delete
      const timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === '') {
      // Move to next service
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % services.length);
      return;
    }

    // Type or delete one character
    const timeout = setTimeout(() => {
      setDisplayText(prev => {
        if (isDeleting) {
          return currentService.substring(0, prev.length - 1);
        } else {
          return currentService.substring(0, prev.length + 1);
        }
      });
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, displayText, isDeleting, services]);

  return (
    <span 
      className="inline-block text-primary px-8 py-2 border-2 border-primary/30 rounded-xl bg-primary/5 mx-4 typewriter-glow relative"
    >
      {displayText}
      <span className="animate-pulse ml-1">|</span>
    </span>
  );
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '',
    projectType: '', budget: '', timeline: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll animations for all sections
  const heroAnimation = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const servicesAnimation = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const aboutAnimation = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const workAnimation = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const contactAnimation = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  // Staggered animations for cards and grids
  const servicesCardsAnimation = useStaggeredAnimation(3, { threshold: 0.2, triggerOnce: true });
  const aboutStatsAnimation = useStaggeredAnimation(4, { threshold: 0.2, triggerOnce: true });
  const missionVisionAnimation = useStaggeredAnimation(2, { threshold: 0.2, triggerOnce: true });
  const coreValuesAnimation = useStaggeredAnimation(4, { threshold: 0.2, triggerOnce: true });
  const caseStudiesAnimation = useStaggeredAnimation(3, { threshold: 0.2, triggerOnce: true });
  const contactMethodsAnimation = useStaggeredAnimation(3, { threshold: 0.2, triggerOnce: true });


  const services = [
    {
      icon: Code,
      title: 'Software Development',
      description: 'Tailored software solutions built to meet your specific business requirements.',
      features: ['Custom Architecture', 'Scalable Solutions', 'Modern Tech Stack'],
      popular: false
    },
    {
      icon: Smartphone,
      title: 'Mobile Applications',
      description: 'Native and cross-platform mobile apps for iOS and Android.',
      features: ['iOS & Android', 'Cross-Platform', 'App Store Ready'],
      popular: false
    },
    {
      icon: Globe,
      title: 'Web Applications',
      description: 'Modern, responsive web applications with cutting-edge technologies.',
      features: ['Responsive Design', 'Fast Performance', 'SEO Optimized'],
      popular: false
    }
  ];

  // Complete case studies data - optimized for performance
  const caseStudies = [
    {
      id: 1,
      title: 'E-Commerce Revolution',
      subtitle: 'Transforming Online Retail Experience',
      industry: 'E-Commerce',
      challenge: 'Outdated infrastructure, slow load times, poor mobile experience causing high cart abandonment rates.',
      solution: 'Modern microservices architecture with advanced caching, CDN implementation, and mobile-first responsive design.',
      results: {
        metrics: [
          { label: 'Sales Increase', value: '150%' },
          { label: 'Page Load Speed', value: '3x Faster' },
          { label: 'Mobile Conversion', value: '+85%' }
        ],
        quote: 'Sales increased by 150% within the first quarter after launch. The new platform exceeded all our expectations.',
        author: 'Mark Thompson',
        role: 'CEO, RetailMax Group'
      },
      timeline: '6 months',
      teamSize: '8 developers',
      technologies: ['React', 'Node.js', 'AWS', 'MongoDB', 'Redis', 'Docker']
    },
    {
      id: 2,
      title: 'Healthcare Platform',
      subtitle: 'Revolutionizing Patient Care',
      industry: 'Healthcare',
      challenge: 'Streamline patient management and improve healthcare provider communication while ensuring HIPAA compliance.',
      solution: 'Comprehensive healthcare management system with secure patient portals, telemedicine capabilities, and automated workflows.',
      results: {
        metrics: [
          { label: 'Efficiency Gain', value: '70%' },
          { label: 'Patient Satisfaction', value: '95%' },
          { label: 'Cost Reduction', value: '40%' }
        ],
        quote: 'Efficiency improved dramatically while maintaining the highest standards of patient care and data security.',
        author: 'Dr. Sarah Martinez',
        role: 'Chief Medical Officer, HealthTech Solutions'
      },
      timeline: '8 months',
      teamSize: '10 developers',
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'AWS', 'Redis', 'Docker']
    },
    {
      id: 3,
      title: 'FinTech Innovation',
      subtitle: 'Next-Gen Financial Services',
      industry: 'Financial Technology',
      challenge: 'Modernize legacy banking systems and implement real-time fraud detection while maintaining regulatory compliance.',
      solution: 'AI-powered fraud detection system with real-time processing, intuitive mobile banking app, and seamless API integrations.',
      results: {
        metrics: [
          { label: 'Fraud Reduction', value: '90%' },
          { label: 'User Engagement', value: '+200%' },
          { label: 'Transaction Speed', value: '10x Faster' }
        ],
        quote: 'Fraud incidents dropped by 90% and customer engagement increased dramatically. This transformed our business.',
        author: 'James Wilson',
        role: 'CTO, SecureBank Financial'
      },
      timeline: '12 months',
      teamSize: '12 developers',
      technologies: ['React', 'Python', 'PostgreSQL', 'TensorFlow', 'AWS', 'Kubernetes']
    }
  ];

  const contactMethods = [
    {
      icon: Mail, title: 'Email Us', description: 'Send us a detailed message',
      value: 'hello@nexuscore.dev', action: 'mailto:hello@nexuscore.dev',
      note: 'Response within 24 hours'
    },
    {
      icon: Phone, title: 'Call Us', description: 'Speak with our team directly',
      value: '+1 (555) 123-4567', action: 'tel:+15551234567',
      note: 'Mon-Fri, 9 AM - 6 PM EST'
    },
    {
      icon: Calendar, title: 'Schedule a Call', description: 'Book a consultation meeting',
      value: 'Free 30-min consultation', action: '#contact-form',
      note: 'Available this week'
    }
  ];

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      onNavigate('thank-you');
    }, 2000);
  }, [formData, onNavigate]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleCaseStudyClick = useCallback((caseStudy: any) => {
    onNavigate('case-study', caseStudy);
  }, [onNavigate]);

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section 
        ref={heroAnimation.elementRef}
        id="home" 
        className={`min-h-screen flex items-center justify-center bg-background relative pt-20 md:pt-24 section-reveal snap-start ${heroAnimation.isVisible ? 'visible' : ''}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 opacity-50"></div>
        
        <div className={`max-w-6xl mx-auto px-6 text-center relative z-10 stagger-children ${heroAnimation.isVisible ? 'animate' : ''}`}>
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 scroll-animate-badge">
            <Zap className="w-4 h-4" />
            Software Development Company
          </div>
          
          <h1 className="text-hero bebas-neue-regular text-foreground mb-8 max-w-4xl mx-auto text-center leading-tight">
            We Build Powerful
            <br />
            <TypewriterText />
            <br />
            <span className="whitespace-nowrap">for Modern Businesses</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto text-center leading-tight">
            Transform your ideas into reality with custom software solutions. 
            We specialize in building scalable, secure, and innovative technology.
          </p>
          
          <Button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary hover:bg-primary/90 text-gray-900 hover:text-gray-900 px-8 py-3 text-lg hover:scale-105 transition-all duration-300 hero-cta-button"
          >
            Get Free Quotations
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section 
        ref={servicesAnimation.elementRef}
        id="services" 
        className={`min-h-screen flex flex-col justify-center py-20 bg-muted/30 section-reveal snap-start ${servicesAnimation.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 stagger-children ${servicesAnimation.isVisible ? 'animate' : ''}`}>
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-6 px-4 py-2 scroll-animate-badge">
              <Settings className="w-4 h-4 mr-2" />
              Our Services
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Complete Software <span className="text-primary">Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From concept to deployment, we provide end-to-end software development services.
            </p>
          </div>

          <div 
            ref={servicesCardsAnimation.elementRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children ${servicesCardsAnimation.isVisible ? 'animate' : ''}`}
          >
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const isVisible = servicesCardsAnimation.visibleItems[index];
              return (
                <Card 
                  key={index} 
                  className={`relative overflow-hidden bg-card border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] group scroll-animate-card ${service.popular ? 'ring-2 ring-primary/20' : ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {service.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-primary text-primary-foreground font-medium px-3 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  )}

                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground">{service.description}</p>

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-foreground flex items-center">
                        <CheckCircle className="w-4 h-4 text-primary mr-2" />
                        What's Included:
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="w-3 h-3 text-primary mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground"
                    >
                      Get Started <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Work Section with Case Studies */}
      <section 
        ref={workAnimation.elementRef}
        id="work" 
        className={`min-h-screen flex flex-col justify-center py-20 bg-muted/20 section-reveal snap-start ${workAnimation.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 stagger-children ${workAnimation.isVisible ? 'animate' : ''}`}>
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-6 px-4 py-2 scroll-animate-badge">
              <Briefcase className="w-4 h-4 mr-2" />
              Our Portfolio
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our most impactful projects that showcase our expertise.
            </p>
          </div>

          {/* Three Case Study Cards - Professional Modal Integration */}
          <div 
            ref={caseStudiesAnimation.elementRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 stagger-children ${caseStudiesAnimation.isVisible ? 'animate' : ''}`}
          >
            {caseStudies.map((caseStudy, index) => {
              // Professional case study images
              const thumbnailImages = [
                "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzaG9wcGluZyUyMHdlYnNpdGV8ZW58MXx8fHwxNzU3OTMyMjk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                "https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMHRlY2hub2xvZ3klMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzU3OTMyMzAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                "https://images.unsplash.com/photo-1642055509518-adafcad1d22e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW50ZWNoJTIwYmFua2luZyUyMG1vYmlsZSUyMGFwcHxlbnwxfHx8fDE3NTc4NTQzODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              ];
              const isVisible = caseStudiesAnimation.visibleItems[index];
              
              return (
                <Card 
                  key={caseStudy.id}
                  onClick={() => handleCaseStudyClick(caseStudy)}
                  className={`group cursor-pointer overflow-hidden bg-card border border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl scroll-animate-card ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {/* Professional Thumbnail Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={thumbnailImages[index]}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Industry Badge */}
                    <Badge className="absolute top-3 right-3 bg-black/70 text-white text-xs border-0 backdrop-blur-sm">
                      {caseStudy.industry}
                    </Badge>
                    
                    {/* Project Icon Overlay */}
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-primary/30">
                        <Building className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                      {caseStudy.title}
                    </h3>
                    
                    {/* Subtitle */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {caseStudy.subtitle}
                    </p>



                    {/* Technologies Used */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Built With
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {caseStudy.technologies.slice(0, 3).map((tech, i) => (
                          <Badge 
                            key={i} 
                            variant="outline" 
                            className="text-xs bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {caseStudy.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs bg-muted/50 text-muted-foreground border-muted-foreground/20">
                            +{caseStudy.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Read Case Study Button */}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-primary hover:bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mt-4"
                    >
                      Read Case Study
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        ref={aboutAnimation.elementRef}
        id="about" 
        className={`min-h-screen flex flex-col justify-center py-20 bg-background section-reveal snap-start ${aboutAnimation.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 stagger-children ${aboutAnimation.isVisible ? 'animate' : ''}`}>
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-6 px-4 py-2 scroll-animate-badge">
              <Users className="w-4 h-4 mr-2" />
              About Nexus Core
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Building the <span className="text-primary">Future</span> of Software
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are a passionate team of software engineers, designers, and innovators 
              dedicated to transforming ideas into powerful digital solutions.
            </p>
          </div>

          {/* Company Stats */}
          <div 
            ref={aboutStatsAnimation.elementRef}
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 stagger-children ${aboutStatsAnimation.isVisible ? 'animate' : ''}`}
          >
            {[
              { number: "50+", label: "Projects Delivered", icon: Briefcase },
              { number: "35+", label: "Happy Clients", icon: Users },
              { number: "8+", label: "Years Experience", icon: TrendingUp },
              { number: "92%", label: "Client Satisfaction", icon: Star }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              const isVisible = aboutStatsAnimation.visibleItems[index];
              return (
                <Card 
                  key={index} 
                  className={`p-6 text-center bg-card border border-white/10 hover:border-primary/30 transition-all duration-300 scroll-animate-card ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <CardContent className="space-y-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                      <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Mission & Vision */}
          <div 
            ref={missionVisionAnimation.elementRef}
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 stagger-children ${missionVisionAnimation.isVisible ? 'animate' : ''}`}
          >
            <Card className={`p-8 bg-card border border-white/10 hover:border-primary/30 transition-all duration-300 scroll-animate-card ${missionVisionAnimation.visibleItems[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To empower businesses through innovative software solutions that drive growth, 
                  efficiency, and competitive advantage. We bridge the gap between complex technology 
                  and practical business needs.
                </p>
              </CardContent>
            </Card>

            <Card className={`p-8 bg-card border border-white/10 hover:border-primary/30 transition-all duration-300 scroll-animate-card ${missionVisionAnimation.visibleItems[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To be the leading software development partner that businesses trust for their 
                  most critical projects. We envision a future where technology seamlessly integrates 
                  with business processes.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Core Values */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Core Values</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and define our company culture
            </p>
          </div>

          <div 
            ref={coreValuesAnimation.elementRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 stagger-children ${coreValuesAnimation.isVisible ? 'animate' : ''}`}
          >
            {[
              {
                icon: Target,
                title: "Client-Focused",
                description: "Every solution we build is tailored to meet our clients' specific needs and business objectives."
              },
              {
                icon: Zap,
                title: "Innovation First",
                description: "We stay at the forefront of technology, continuously learning and adopting the latest tools."
              },
              {
                icon: Shield,
                title: "Quality & Security",
                description: "We never compromise on code quality, security standards, or performance optimization."
              },
              {
                icon: Users,
                title: "Collaborative",
                description: "We believe in transparent communication and close collaboration with our clients."
              }
            ].map((value, index) => {
              const IconComponent = value.icon;
              const isVisible = coreValuesAnimation.visibleItems[index];
              return (
                <Card 
                  key={index} 
                  className={`p-6 bg-card border border-white/10 hover:border-primary/30 transition-all duration-300 scroll-animate-card ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <CardContent className="space-y-4 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Technology Stack - Redesigned */}
          <div className="rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Technology Expertise</h3>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
              We work with cutting-edge technologies to deliver robust, scalable solutions
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "React & Next.js", icon: Code, description: "Modern web frameworks" },
                { name: "Node.js & Python", icon: Settings, description: "Powerful backend technologies" },
                { name: "Cloud Platforms (AWS, Azure)", icon: Globe, description: "Scalable cloud infrastructure" },
                { name: "AI & Machine Learning", icon: Brain, description: "Intelligent solutions" },
                { name: "Mobile Development", icon: Smartphone, description: "iOS & Android apps" },
                { name: "Enterprise Solutions", icon: Briefcase, description: "Business-grade systems" }
              ].map((tech, index) => {
                const TechIcon = tech.icon;
                return (
                  <Card 
                    key={index} 
                    className="relative overflow-hidden bg-[#393939] border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-[1.03] group tech-card-shadow"
                  >
                    <CardContent className="p-6 space-y-4">
                      {/* Icon with gradient background */}
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mx-auto group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
                          <TechIcon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 glow-effect-radial">
                        </div>
                      </div>
                      
                      {/* Technology name */}
                      <h4 className="text-foreground font-semibold group-hover:text-primary transition-colors duration-300">
                        {tech.name}
                      </h4>
                      
                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tech.description}
                      </p>
                      
                      {/* Bottom accent line */}
                      <div className="h-1 w-0 bg-gradient-to-r from-primary/50 to-primary mx-auto group-hover:w-full transition-all duration-500 rounded-full"></div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        ref={contactAnimation.elementRef}
        id="contact" 
        className={`min-h-screen flex flex-col justify-center py-20 bg-muted/30 section-reveal snap-start ${contactAnimation.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 stagger-children ${contactAnimation.isVisible ? 'animate' : ''}`}>
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-6 px-4 py-2 scroll-animate-badge">
              <MessageSquare className="w-4 h-4 mr-2" />
              Get In Touch
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Ready to Start Your <span className="text-primary">Project?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Let's discuss your vision and turn your ideas into reality.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Methods */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-foreground mb-8">Contact Information</h3>
              
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <Card 
                    key={index} 
                    className="group cursor-pointer border border-white/10 hover:border-primary/30 bg-card transition-all duration-300"
                    onClick={() => {
                      if (method.action.startsWith('mailto:') || method.action.startsWith('tel:')) {
                        window.location.href = method.action;
                      } else if (method.action === '#contact-form') {
                        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                            {method.title}
                          </h4>
                          <p className="text-muted-foreground text-sm mb-2">{method.description}</p>
                          <p className="text-foreground font-medium mb-2">{method.value}</p>
                          <p className="text-xs text-muted-foreground">{method.note}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Contact Form */}
            <Card className="border border-white/10 bg-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-8">Send us a Message</h3>
                
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">Name *</Label>
                      <Input
                        id="name" name="name" value={formData.name} onChange={handleChange}
                        required className="bg-background/50 border-white/10 focus:border-primary"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">Email *</Label>
                      <Input
                        id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                        required className="bg-background/50 border-white/10 focus:border-primary"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">Project Details *</Label>
                    <Textarea
                      id="message" name="message" value={formData.message} onChange={handleChange}
                      required rows={12} className="bg-background/50 border-white/10 focus:border-primary resize-none min-h-[250px]"
                      placeholder="Tell us about your project, goals, and requirements..."
                    />
                  </div>

                  <Button
                    type="submit" disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                        Sending Message...
                      </>
                    ) : (
                      <>Send Message <ArrowRight className="w-4 h-4 ml-2" /></>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}