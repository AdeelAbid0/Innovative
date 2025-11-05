import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Code, Globe, Smartphone, Brain, Shield, Settings,
  CheckCircle, ArrowRight, Users, Zap, Star,
  Cloud, Database, Search, Layers, Rocket,
  TrendingUp, Target, Award, Clock, DollarSign,
  BarChart, Lightbulb, Cog, Headphones, Building,
  Palette, Monitor, Server, Lock, GitBranch
} from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';

type Page = 'home' | 'about' | 'services' | 'contact' | 'thank-you';

interface ServicesPageProps {
  onNavigate: (page: Page) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('development');
  const [selectedPlan, setSelectedPlan] = useState('standard');

  // Service categories for the hero section
  const serviceCategories = [
    {
      id: 'development',
      title: 'Software Development',
      icon: Code,
      description: 'Custom applications & platforms',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'mobile',
      title: 'Mobile Apps',
      icon: Smartphone,
      description: 'iOS & Android applications',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'web',
      title: 'Web Solutions',
      icon: Globe,
      description: 'Modern websites & web apps',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'ai',
      title: 'AI & Machine Learning',
      icon: Brain,
      description: 'Intelligent automation & insights',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'cloud',
      title: 'Cloud Solutions',
      icon: Cloud,
      description: 'Scalable infrastructure & DevOps',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'enterprise',
      title: 'Enterprise Systems',
      icon: Building,
      description: 'Large-scale business solutions',
      color: 'from-gray-600 to-gray-800'
    }
  ];

  // Detailed service offerings
  const services = [
    {
      category: 'development',
      icon: Code,
      name: 'Custom Software Development',
      description: 'Tailored software solutions built from the ground up to meet your unique business requirements.',
      features: [
        'Full-stack web applications',
        'Desktop applications',
        'API development & integration',
        'Legacy system modernization',
        'Microservices architecture',
        'Database design & optimization'
      ],
      technologies: ['React', 'Node.js', 'Python', 'Java', '.NET', 'PostgreSQL'],
      pricing: { basic: '$15,000', standard: '$35,000', premium: '$75,000' },
      timeline: '8-16 weeks'
    },
    {
      category: 'mobile',
      icon: Smartphone,
      name: 'Mobile Application Development',
      description: 'Native and cross-platform mobile apps that deliver exceptional user experiences.',
      features: [
        'iOS & Android native apps',
        'Cross-platform development',
        'Progressive Web Apps (PWA)',
        'Mobile UI/UX design',
        'App store optimization',
        'Push notifications & analytics'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      pricing: { basic: '$20,000', standard: '$45,000', premium: '$85,000' },
      timeline: '10-18 weeks'
    },
    {
      category: 'web',
      icon: Globe,
      name: 'Web Development & Design',
      description: 'Modern, responsive websites and web applications built with cutting-edge technologies.',
      features: [
        'Responsive web design',
        'E-commerce platforms',
        'Content management systems',
        'Single Page Applications (SPA)',
        'Performance optimization',
        'SEO & analytics integration'
      ],
      technologies: ['Next.js', 'React', 'Vue.js', 'Tailwind CSS', 'Shopify'],
      pricing: { basic: '$8,000', standard: '$20,000', premium: '$45,000' },
      timeline: '6-12 weeks'
    },
    {
      category: 'ai',
      icon: Brain,
      name: 'AI & Machine Learning',
      description: 'Intelligent solutions that leverage AI and ML to transform your business processes.',
      features: [
        'Machine learning models',
        'Natural language processing',
        'Computer vision solutions',
        'Predictive analytics',
        'AI-powered automation',
        'Data science consulting'
      ],
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'AWS ML'],
      pricing: { basic: '$25,000', standard: '$60,000', premium: '$120,000' },
      timeline: '12-24 weeks'
    },
    {
      category: 'cloud',
      icon: Cloud,
      name: 'Cloud Infrastructure & DevOps',
      description: 'Scalable cloud infrastructure and DevOps solutions to power your applications.',
      features: [
        'Cloud migration services',
        'DevOps & CI/CD setup',
        'Containerization with Docker',
        'Kubernetes orchestration',
        'Infrastructure as Code',
        'Monitoring & logging'
      ],
      technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes'],
      pricing: { basic: '$12,000', standard: '$28,000', premium: '$55,000' },
      timeline: '6-14 weeks'
    },
    {
      category: 'enterprise',
      icon: Building,
      name: 'Enterprise Software Solutions',
      description: 'Robust, secure systems designed to handle complex business operations at scale.',
      features: [
        'Enterprise resource planning',
        'Customer relationship management',
        'Business intelligence dashboards',
        'Workflow automation',
        'Security & compliance',
        'System integration'
      ],
      technologies: ['Java', '.NET', 'Oracle', 'SAP', 'Microsoft SQL Server'],
      pricing: { basic: '$50,000', standard: '$120,000', premium: '$250,000' },
      timeline: '16-32 weeks'
    }
  ];

  // Technology expertise levels
  const technologies = [
    { name: 'React/Next.js', level: 95, category: 'Frontend' },
    { name: 'Node.js', level: 92, category: 'Backend' },
    { name: 'Python', level: 90, category: 'Backend' },
    { name: 'TypeScript', level: 88, category: 'Language' },
    { name: 'AWS', level: 85, category: 'Cloud' },
    { name: 'PostgreSQL', level: 87, category: 'Database' },
    { name: 'Docker', level: 83, category: 'DevOps' },
    { name: 'React Native', level: 80, category: 'Mobile' },
    { name: 'AI/ML', level: 78, category: 'AI' },
    { name: 'Blockchain', level: 70, category: 'Emerging' }
  ];

  // Development process steps
  const process = [
    {
      step: '01',
      title: 'Discovery & Strategy',
      description: 'We analyze your requirements, define project scope, and create a comprehensive strategy.',
      icon: Search,
      duration: '1-2 weeks',
      deliverables: ['Requirements document', 'Project roadmap', 'Technical architecture']
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      description: 'Our team creates wireframes, designs, and interactive prototypes.',
      icon: Palette,
      duration: '2-3 weeks',
      deliverables: ['Wireframes', 'UI/UX designs', 'Interactive prototype']
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'Agile development with continuous testing and quality assurance.',
      icon: Code,
      duration: '6-16 weeks',
      deliverables: ['Working software', 'Test reports', 'Documentation']
    },
    {
      step: '04',
      title: 'Deployment & Launch',
      description: 'Seamless deployment with monitoring and performance optimization.',
      icon: Rocket,
      duration: '1-2 weeks',
      deliverables: ['Live application', 'Deployment guide', 'Performance metrics']
    },
    {
      step: '05',
      title: 'Support & Maintenance',
      description: 'Ongoing support, updates, and feature enhancements.',
      icon: Headphones,
      duration: 'Ongoing',
      deliverables: ['24/7 support', 'Regular updates', 'Performance monitoring']
    }
  ];

  // Pricing plans
  const pricingPlans = [
    {
      id: 'basic',
      name: 'Starter',
      description: 'Perfect for small businesses and startups',
      features: [
        'Up to 5 pages/screens',
        'Basic functionality',
        'Responsive design',
        '3 months support',
        'Source code included'
      ],
      popular: false
    },
    {
      id: 'standard',
      name: 'Professional',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 15 pages/screens',
        'Advanced functionality',
        'Custom integrations',
        '6 months support',
        'Performance optimization',
        'SEO optimization'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Enterprise',
      description: 'For large-scale applications',
      features: [
        'Unlimited pages/screens',
        'Complex functionality',
        'Third-party integrations',
        '12 months support',
        'Dedicated project manager',
        'Priority support',
        'Training included'
      ],
      popular: false
    }
  ];

  // Client testimonials
  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      role: 'CEO',
      content: 'Nexus Core delivered an exceptional mobile app that exceeded our expectations. Their attention to detail and technical expertise is outstanding.',
      rating: 5,
      project: 'E-commerce Mobile App'
    },
    {
      name: 'Michael Chen',
      company: 'DataFlow Systems',
      role: 'CTO',
      content: 'The AI solution they built transformed our data processing capabilities. ROI was evident within the first quarter.',
      rating: 5,
      project: 'AI Analytics Platform'
    },
    {
      name: 'Emily Rodriguez',
      company: 'GreenTech Solutions',
      role: 'Operations Director',
      content: 'Professional, reliable, and innovative. They took our complex requirements and delivered a elegant solution.',
      rating: 5,
      project: 'Enterprise Management System'
    }
  ];

  // Success metrics
  const metrics = [
    { label: 'Projects Delivered', value: '100+', icon: Rocket },
    { label: 'Client Satisfaction', value: '92%', icon: Star },
    { label: 'Years Experience', value: '10+', icon: Award },
    { label: 'Team Members', value: '25+', icon: Users }
  ];

  // Scroll animation hooks
  const heroRef = useScrollAnimation({ threshold: 0.2 });
  const categoriesRef = useStaggeredAnimation(serviceCategories.length, { threshold: 0.1 });
  const servicesRef = useStaggeredAnimation(6, { threshold: 0.1 });
  const techRef = useStaggeredAnimation(technologies.length, { threshold: 0.1 });
  const processRef = useStaggeredAnimation(process.length, { threshold: 0.1 });
  const pricingRef = useScrollAnimation({ threshold: 0.2 });
  const testimonialsRef = useStaggeredAnimation(testimonials.length, { threshold: 0.1 });
  const ctaRef = useScrollAnimation({ threshold: 0.2 });

  const filteredServices = services.filter(service => service.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        ref={heroRef.elementRef}
        className={`min-h-screen flex flex-col justify-center py-16 sm:py-20 md:py-24 lg:py-32 bg-background section-reveal snap-start ${
          heroRef.isVisible ? 'visible' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-6 sm:space-y-8 mb-12 sm:mb-16">
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-4 scroll-animate-badge">
              <Zap className="w-4 h-4 mr-2" />
              Professional Services
            </Badge>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-foreground max-w-4xl mx-auto leading-tight px-2">
              Transform Your Ideas Into
              <span className="text-primary"> Digital Reality</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              We deliver cutting-edge software solutions that drive business growth and innovation. 
              From web applications to AI-powered systems, we build technology that makes a difference.
            </p>
          </div>

          {/* Service Categories Grid */}
          <div 
            ref={categoriesRef.elementRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children ${
              categoriesRef.isVisible ? 'animate' : ''
            }`}
          >
            {serviceCategories.map((category, index) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <Card 
                  key={category.id}
                  className={`p-6 cursor-pointer transition-all duration-300 scroll-animate-card hover:scale-105 ${
                    isSelected 
                      ? 'border-primary/50 bg-primary/5' 
                      : 'border-white/10 hover:border-primary/30'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="space-y-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${category.color}`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">{category.title}</h3>
                      <p className="text-muted-foreground text-sm">{category.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section 
        ref={servicesRef.elementRef}
        className={`min-h-screen flex flex-col justify-center py-20 bg-muted/30 section-reveal snap-start ${
          servicesRef.isVisible ? 'visible' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-mega text-foreground mb-4">
              Service Details
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions tailored to your specific needs
            </p>
          </div>

          <div className={`space-y-8 stagger-children ${
            servicesRef.isVisible ? 'animate' : ''
          }`}>
            {filteredServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.name} className="p-8 scroll-animate-card hover:border-primary/30 transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Service Info */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">{service.name}</h3>
                          <p className="text-muted-foreground">{service.timeline}</p>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Key Features</h4>
                          <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech, idx) => (
                              <Badge 
                                key={idx}
                                variant="outline" 
                                className="text-xs bg-primary/5 border-primary/20"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Starting From</h4>
                      <div className="space-y-3">
                        {Object.entries(service.pricing).map(([plan, price]) => (
                          <div 
                            key={plan}
                            className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                              selectedPlan === plan
                                ? 'border-primary bg-primary/5'
                                : 'border-white/10 hover:border-primary/30'
                            }`}
                            onClick={() => setSelectedPlan(plan)}
                          >
                            <div className="flex justify-between items-center">
                              <span className="capitalize font-medium text-foreground">{plan}</span>
                              <span className="text-primary font-bold">{price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button 
                        className="w-full btn-premium"
                        onClick={() => onNavigate('contact')}
                      >
                        Get Quote
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Expertise */}
      <section 
        ref={techRef.elementRef}
        className={`min-h-screen flex flex-col justify-center py-20 bg-background section-reveal snap-start ${
          techRef.isVisible ? 'visible' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-mega text-foreground mb-4">
              Technology Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our team masters the latest technologies and frameworks
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 stagger-children ${
            techRef.isVisible ? 'animate' : ''
          }`}>
            {technologies.map((tech, index) => (
              <div key={tech.name} className="space-y-3 scroll-animate-card">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium text-foreground">{tech.name}</span>
                    <Badge className="ml-2 text-xs bg-primary/20 text-primary border-primary/30">
                      {tech.category}
                    </Badge>
                  </div>
                  <span className="text-primary font-bold">{tech.level}%</span>
                </div>
                <div className="w-full bg-muted/50 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: techRef.isVisible ? `${tech.level}%` : '0%',
                      transitionDelay: `${index * 100}ms`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section 
        ref={processRef.elementRef}
        className={`min-h-screen flex flex-col justify-center py-20 bg-muted/30 section-reveal snap-start ${
          processRef.isVisible ? 'visible' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-mega text-foreground mb-4">
              Our Development Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery
            </p>
          </div>

          <div className={`space-y-8 stagger-children ${
            processRef.isVisible ? 'animate' : ''
          }`}>
            {process.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={step.step} className="p-6 scroll-animate-card hover:border-primary/30 transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                    <div className="flex items-center gap-4 lg:col-span-1">
                      <div className="relative">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                          <IconComponent className="w-8 h-8 text-primary" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                          {step.step}
                        </div>
                      </div>
                      <div className="lg:hidden">
                        <h3 className="font-bold text-foreground">{step.title}</h3>
                        <p className="text-sm text-primary">{step.duration}</p>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-2">
                      <div className="hidden lg:block">
                        <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                        <p className="text-sm text-primary mb-2">{step.duration}</p>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                    
                    <div className="lg:col-span-1">
                      <h4 className="font-semibold text-foreground mb-2">Deliverables</h4>
                      <ul className="space-y-1">
                        {step.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section 
        ref={pricingRef.elementRef}
        className={`min-h-screen flex flex-col justify-center py-20 bg-background section-reveal snap-start ${
          pricingRef.isVisible ? 'visible' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-mega text-foreground mb-4">
              Flexible Pricing Plans
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that best fits your project needs and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.id}
                className={`p-8 relative scroll-animate-card hover:scale-105 transition-all duration-300 ${
                  plan.popular ? 'border-primary/50 bg-primary/5' : 'border-white/10'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                    <p className="text-muted-foreground mt-2">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.popular ? 'btn-premium' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => onNavigate('contact')}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section 
        ref={testimonialsRef.elementRef}
        className={`min-h-screen flex flex-col justify-center py-20 bg-muted/30 section-reveal snap-start ${
          testimonialsRef.isVisible ? 'visible' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-mega text-foreground mb-4">
              Client Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children ${
            testimonialsRef.isVisible ? 'animate' : ''
          }`}>
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 scroll-animate-card hover:border-primary/30 transition-all duration-300">
                <CardContent className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  
                  <div className="border-t pt-4">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                    <Badge className="mt-2 text-xs bg-primary/20 text-primary border-primary/30">
                      {testimonial.project}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Success Metrics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <div key={index} className="text-center space-y-2 scroll-animate-card">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section 
        ref={ctaRef.elementRef}
        className={`min-h-screen flex flex-col justify-center py-20 bg-background section-reveal snap-start ${
          ctaRef.isVisible ? 'visible' : ''
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-mega text-foreground mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's discuss your requirements and create a custom solution that drives your business forward.
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
              <Target className="w-5 h-5 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}