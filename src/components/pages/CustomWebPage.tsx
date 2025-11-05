import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Code, Globe, Smartphone, Brain, Shield, Settings,
  CheckCircle, ArrowRight, Users, Zap, 
  Cloud, Database, Search, Layers
} from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';

type Page = 'home' | 'about' | 'services' | 'products' | 'contact' | 'thank-you' | 'admin';

interface CustomWebPageProps {
  onNavigate: (page: Page) => void;
}

const services = [
  {
    icon: Code,
    name: 'Custom Software Development',
    description: 'Tailored software solutions built from the ground up to meet your unique business requirements.',
    features: [
      'Full-stack web applications',
      'Enterprise software solutions',
      'API development & integration',
      'Legacy system modernization',
      'Scalable architecture design'
    ],
    technologies: ['React', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL']
  },
  {
    icon: Smartphone,
    name: 'Mobile Application Development',
    description: 'Native and cross-platform mobile apps that deliver exceptional user experiences.',
    features: [
      'iOS & Android native apps',
      'Cross-platform development',
      'Progressive Web Apps (PWA)',
      'Mobile UI/UX design',
      'App store optimization'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase']
  },
  {
    icon: Globe,
    name: 'Web Development',
    description: 'Modern, responsive websites and web applications built with cutting-edge technologies.',
    features: [
      'Responsive web design',
      'E-commerce platforms',
      'Content management systems',
      'Single Page Applications (SPA)',
      'Performance optimization'
    ],
    technologies: ['Next.js', 'React', 'Vue.js', 'Tailwind CSS', 'Node.js']
  },
  {
    icon: Cloud,
    name: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and services to power your applications.',
    features: [
      'Cloud migration services',
      'DevOps & CI/CD setup',
      'Containerization with Docker',
      'Kubernetes orchestration',
      'Cloud security implementation'
    ],
    technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes']
  },
  {
    icon: Brain,
    name: 'AI & Machine Learning',
    description: 'Intelligent solutions that leverage AI and ML to transform your business processes.',
    features: [
      'Machine learning models',
      'Natural language processing',
      'Computer vision solutions',
      'Predictive analytics',
      'AI-powered automation'
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'Scikit-learn']
  },
  {
    icon: Shield,
    name: 'Enterprise Solutions',
    description: 'Robust, secure systems designed to handle complex business operations at scale.',
    features: [
      'Enterprise resource planning',
      'Customer relationship management',
      'Business intelligence dashboards',
      'Workflow automation',
      'Security & compliance'
    ],
    technologies: ['Java', '.NET', 'Oracle', 'SAP', 'Microsoft SQL Server']
  }
];

const process = [
  {
    step: '01',
    title: 'Discovery & Planning',
    description: 'We analyze your requirements, define project scope, and create a detailed roadmap.',
    icon: Search
  },
  {
    step: '02',
    title: 'Design & Architecture',
    description: 'Our team designs the system architecture and creates user experience mockups.',
    icon: Layers
  },
  {
    step: '03',
    title: 'Development & Testing',
    description: 'Agile development with continuous testing to ensure quality and reliability.',
    icon: Code
  },
  {
    step: '04',
    title: 'Deployment & Support',
    description: 'Seamless deployment with ongoing maintenance and support services.',
    icon: Settings
  }
];

export function CustomWebPage({ onNavigate }: CustomWebPageProps) {
  // Scroll animation hooks for different sections
  const heroRef = useScrollAnimation({ threshold: 0.2 });
  const servicesRef = useStaggeredAnimation(services.length, { threshold: 0.1 });
  const processRef = useStaggeredAnimation(process.length, { threshold: 0.1 });
  const ctaRef = useScrollAnimation({ threshold: 0.2 });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* Hero Section */}
        <div 
          ref={heroRef.elementRef}
          className={`text-center space-y-8 section-reveal ${
            heroRef.isVisible ? 'visible' : ''
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium scroll-animate-badge">
            <Zap className="w-4 h-4" />
            Professional Services
          </div>
          
          <h1 className="text-hero text-foreground max-w-4xl mx-auto leading-tight">
            Comprehensive Software
            <br />
            <span className="text-primary">Development Services</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From concept to deployment, we provide end-to-end software development services 
            that drive innovation and business growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="btn-premium px-8 py-4 text-lg"
              onClick={() => onNavigate('contact')}
            >
              <Users className="w-5 h-5 mr-2" />
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/40 hover:border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg"
              onClick={() => onNavigate('about')}
            >
              <Shield className="w-5 h-5 mr-2" />
              Learn More
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div 
          ref={servicesRef.elementRef}
          className={`space-y-12 section-reveal ${
            servicesRef.isVisible ? 'visible' : ''
          }`}
        >
          <div className="text-center space-y-4">
            <Badge className="bg-primary/20 text-primary border-primary/30 scroll-animate-badge">
              Our Expertise
            </Badge>
            <h2 className="text-mega text-foreground">
              Complete Technology Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We specialize in building robust, scalable software solutions across multiple domains and technologies.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children ${
            servicesRef.isVisible ? 'animate' : ''
          }`}>
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={index} 
                  className="bg-card border-white/10 p-6 scroll-animate-card hover:border-primary/30 transition-all duration-300 hover:scale-105 group h-full"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-bold text-foreground">{service.name}</h3>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 flex-grow">{service.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.slice(0, 3).map((tech, techIndex) => (
                          <Badge 
                            key={techIndex}
                            variant="outline" 
                            className="text-xs bg-primary/5 border-primary/20 scroll-animate-badge"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {service.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs opacity-60 scroll-animate-badge">
                            +{service.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Process Section */}
        <div 
          ref={processRef.elementRef}
          className={`space-y-12 section-reveal ${
            processRef.isVisible ? 'visible' : ''
          }`}
        >
          <div className="text-center space-y-4">
            <h2 className="text-mega text-foreground">
              Our Development Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We follow a proven methodology to ensure successful project delivery and client satisfaction.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children ${
            processRef.isVisible ? 'animate' : ''
          }`}>
            {process.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center space-y-4 scroll-animate-card">
                  <div className="relative">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="font-bold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div 
          ref={ctaRef.elementRef}
          className={`bg-muted/30 rounded-2xl p-12 text-center space-y-6 section-reveal ${
            ctaRef.isVisible ? 'visible' : ''
          }`}
        >
          <h2 className="text-mega text-foreground">
            Ready to Transform Your Ideas?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's discuss your project requirements and create a custom solution that drives your business forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="btn-premium px-8 py-4 text-lg"
              onClick={() => onNavigate('contact')}
            >
              <Users className="w-5 h-5 mr-2" />
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/40 hover:border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg"
              onClick={() => onNavigate('home')}
            >
              <Database className="w-5 h-5 mr-2" />
              View Our Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}