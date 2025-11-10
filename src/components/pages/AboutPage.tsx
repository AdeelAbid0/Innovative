import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Users,
  Target,
  Lightbulb,
  Code,
  Smartphone,
  Globe,
  ArrowRight,
  CheckCircle,
  Zap,
  Award,
  Brain,
  Shield,
  Settings,
  Monitor,
  TrendingUp,
  Star,
  Briefcase
} from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';

type Page = 'home' | 'about' | 'services' | 'contact' | 'thank-you' | 'admin';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

const stats = [
  {
    number: "500+",
    label: "Projects Delivered",
    icon: Briefcase,
    description: "Successful implementations"
  },
  {
    number: "150+",
    label: "Happy Clients",
    icon: Users,
    description: "Worldwide partnerships"
  },
  {
    number: "8+",
    label: "Years Experience",
    icon: TrendingUp,
    description: "Industry expertise"
  },
  {
    number: "99%",
    label: "Client Satisfaction",
    icon: Star,
    description: "Project success rate"
  }
];

const journey = [
  {
    year: "2016",
    title: "Company Founded",
    description: "Started as a small team of passionate developers with a vision to create innovative software solutions.",
    icon: Lightbulb
  },
  {
    year: "2018",
    title: "First Enterprise Client",
    description: "Landed our first major enterprise project, establishing our reputation for delivering complex solutions.",
    icon: Briefcase
  },
  {
    year: "2020",
    title: "Team Expansion",
    description: "Grew to a diverse team of 25+ developers, designers, and project managers across multiple specialties.",
    icon: Users
  },
  {
    year: "2024",
    title: "Nexus Core Rebranding",
    description: "Evolved into Nexus Core, focusing on cutting-edge technologies including AI, cloud solutions, and enterprise software.",
    icon: Globe
  }
];

const values = [
  {
    icon: Target,
    title: "Client-Focused",
    description: "Every solution we build is tailored to meet our clients' specific needs and business objectives."
  },
  {
    icon: Zap,
    title: "Innovation First",
    description: "We stay at the forefront of technology, continuously learning and adopting the latest tools and methodologies."
  },
  {
    icon: Shield,
    title: "Quality & Security",
    description: "We never compromise on code quality, security standards, or performance optimization."
  },
  {
    icon: Users,
    title: "Collaborative",
    description: "We believe in transparent communication and close collaboration with our clients throughout every project."
  }
];

const technologies = [
  "React & Next.js",
  ".NET, Node.js & Python",
  "Cloud Platforms (AWS, Azure)",
  "AI & Machine Learning",
  "Mobile Development",
  "Enterprise Solutions"
];

const teamRoles = [
  {
    role: "Full-Stack Developers",
    count: "12+",
    icon: Code
  },
  {
    role: "Mobile Developers",
    count: "6+",
    icon: Smartphone
  },
  {
    role: "Cloud Architects",
    count: "4+",
    icon: Globe
  },
  {
    role: "AI Specialists",
    count: "3+",
    icon: Brain
  },
  {
    role: "DevOps Engineers",
    count: "5+",
    icon: Settings
  },
  {
    role: "UI/UX Designers",
    count: "4+",
    icon: Monitor
  }
];

export function AboutPage({ onNavigate }: AboutPageProps) {
  // Scroll animation hooks for different sections
  const heroRef = useScrollAnimation({ threshold: 0.2 });
  const statsRef = useStaggeredAnimation(stats.length, { threshold: 0.1 });
  const missionRef = useStaggeredAnimation(2, { threshold: 0.2 });
  const journeyRef = useScrollAnimation({ threshold: 0.1 });
  const valuesRef = useStaggeredAnimation(values.length, { threshold: 0.1 });
  const teamRef = useStaggeredAnimation(teamRoles.length, { threshold: 0.1 });
  const techRef = useScrollAnimation({ threshold: 0.2 });
  const whyChooseRef = useScrollAnimation({ threshold: 0.2 });
  const ctaRef = useScrollAnimation({ threshold: 0.2 });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">

        {/* Hero Section */}
        <div
          ref={heroRef.elementRef}
          className={`text-center space-y-8 section-reveal ${heroRef.isVisible ? 'visible' : ''
            }`}
        >
          <div className="space-y-6">
            <Badge variant="outline" className="px-4 py-2 text-sm scroll-animate-badge">
              🚀 About Nexus Core
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Building the <span className="text-primary">Future</span> of Software
            </h1>

            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We are a passionate team of software engineers, designers, and innovators
              dedicated to transforming ideas into powerful digital solutions. Since 2016,
              we've been helping businesses leverage technology to achieve their goals.
            </p>
          </div>

          {/* Company Logo */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/40 rounded-2xl mx-auto flex items-center justify-center">
              <div className="w-24 h-24 bg-primary/10 rounded-xl flex items-center justify-center">
                <Code className="w-12 h-12 text-primary" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef.elementRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 stagger-children ${statsRef.isVisible ? 'animate' : ''
            }`}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="p-4 text-center scroll-animate-card hover:shadow-lg transition-all hover-scale">
                <CardContent className="space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                    <div className="text-sm font-medium text-foreground">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.description}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission & Vision */}
        <div
          ref={missionRef.elementRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 stagger-children ${missionRef.isVisible ? 'animate' : ''
            }`}
        >
          <Card className="p-6 scroll-animate-card card-premium">
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To empower businesses through innovative software solutions that drive growth,
                efficiency, and competitive advantage. We bridge the gap between complex technology
                and practical business needs, making digital transformation accessible and impactful.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 scroll-animate-card card-premium">
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading software development partner that businesses trust for their
                most critical projects. We envision a future where technology seamlessly integrates
                with business processes, creating unprecedented opportunities for innovation and growth.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Company Journey Timeline */}
        <div
          ref={journeyRef.elementRef}
          className={`space-y-8 section-reveal ${journeyRef.isVisible ? 'visible' : ''
            }`}
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From a small startup to a trusted software development partner
            </p>
          </div>

          <div className="relative">
            <div className="space-y-8">
              {journey.map((milestone, index) => {
                const IconComponent = milestone.icon;
                return (
                  <div key={index} className="flex items-start space-x-6 scroll-animate-card">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary-foreground" />
                      </div>
                      {index < journey.length - 1 && (
                        <div className="w-0.5 h-16 bg-muted-foreground/20 mt-4"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant="outline" className="text-xs px-2 py-1 scroll-animate-badge">
                          {milestone.year}
                        </Badge>
                        <h3 className="text-lg font-semibold text-foreground">
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div
          ref={valuesRef.elementRef}
          className={`space-y-8 section-reveal ${valuesRef.isVisible ? 'visible' : ''
            }`}
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and define our company culture
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children ${valuesRef.isVisible ? 'animate' : ''
            }`}>
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="p-6 scroll-animate-card hover:shadow-lg transition-all hover-scale">
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Our Team */}
        <div
          ref={teamRef.elementRef}
          className={`space-y-8 section-reveal ${teamRef.isVisible ? 'visible' : ''
            }`}
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Our Expert Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A diverse group of talented professionals united by our passion for technology
            </p>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-3 gap-6 stagger-children ${teamRef.isVisible ? 'animate' : ''
            }`}>
            {teamRoles.map((team, index) => {
              const IconComponent = team.icon;
              return (
                <Card key={index} className="p-4 text-center scroll-animate-card hover:shadow-lg transition-all hover-scale">
                  <CardContent className="space-y-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-lg font-bold text-primary">{team.count}</div>
                      <div className="text-sm font-medium text-foreground">{team.role}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Technology Stack */}
        <div
          ref={techRef.elementRef}
          className={`bg-muted/30 rounded-2xl p-8 space-y-8 section-reveal ${techRef.isVisible ? 'visible' : ''
            }`}
        >
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Settings className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Technology Expertise</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We work with cutting-edge technologies to deliver robust, scalable solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {technologies.map((tech, index) => (
              <div key={index} className="flex items-center space-x-3 bg-card/50 rounded-lg p-3 scroll-animate-badge">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div
          ref={whyChooseRef.elementRef}
          className={`text-center space-y-6 section-reveal ${whyChooseRef.isVisible ? 'visible' : ''
            }`}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Why Choose Nexus Core?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine technical expertise with business insight to deliver solutions that
              not only work flawlessly but also drive real business value. Our agile approach
              ensures rapid delivery without compromising quality.
            </p>
          </div>

          <div className="flex items-center justify-center space-x-8 text-muted-foreground">
            <div className="flex items-center space-x-2 scroll-animate-badge">
              <span className="text-lg">⚡</span>
              <span className="text-sm">Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-2 scroll-animate-badge">
              <span className="text-lg">🔒</span>
              <span className="text-sm">Secure Code</span>
            </div>
            <div className="flex items-center space-x-2 scroll-animate-badge">
              <span className="text-lg">📈</span>
              <span className="text-sm">Scalable Solutions</span>
            </div>
            <div className="flex items-center space-x-2 scroll-animate-badge">
              <span className="text-lg">🎯</span>
              <span className="text-sm">Business Focus</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          ref={ctaRef.elementRef}
          className={`text-center space-y-8 pt-8 border-t border-muted-foreground/10 section-reveal ${ctaRef.isVisible ? 'visible' : ''
            }`}
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Let's discuss how we can help transform your ideas into powerful software solutions
              that drive your business forward.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate('contact')}
              size="lg"
              className="btn-premium"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={() => onNavigate('services')}
              variant="outline"
              size="lg"
            >
              View Our Services
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2 scroll-animate-badge">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Free consultation</span>
            </div>
            <div className="flex items-center space-x-2 scroll-animate-badge">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Agile development</span>
            </div>
            <div className="flex items-center space-x-2 scroll-animate-badge">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}