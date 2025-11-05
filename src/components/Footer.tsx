import React from 'react';
import { Button } from './ui/button';
import { Logo } from './Logo';
import { Separator } from './ui/separator';
import { ArrowRight, Mail, MapPin, Phone, Globe, Heart, Code } from 'lucide-react';

type Page = 'home' | 'about' | 'services' | 'products' | 'contact' | 'thank-you';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About Us', page: 'about' as Page },
    { label: 'Services', page: 'services' as Page },
    { label: 'Products', page: 'products' as Page },
    { label: 'Contact', page: 'contact' as Page },
  ];

  const services = [
    { label: 'Web Development', href: '#' },
    { label: 'Mobile Apps', href: '#' },
    { label: 'Cloud Solutions', href: '#' },
    { label: 'AI Development', href: '#' },
  ];

  const handleEmailSubscription = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    
    if (email) {
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        // Here you would typically send to your email service
        console.log('Email subscription:', email);
        alert('Thank you for subscribing! You will receive updates about our latest developments.');
        (e.target as HTMLFormElement).reset();
      } else {
        alert('Please enter a valid email address.');
      }
    }
  };

  return (
    <footer className="bg-[#1a1a1a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div onClick={() => onNavigate('home')} className="cursor-pointer inline-block">
              <Logo size="md" showText={true} />
            </div>
            
            <p className="text-muted-foreground text-sm leading-relaxed">
              Nexus Core is a leading software development company specializing in custom solutions, 
              mobile applications, and cutting-edge technology implementations.
            </p>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Code className="w-3 h-3 text-primary" />
                <span>500+ Projects</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3 text-red-500" />
                <span>150+ Clients</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Company</h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm text-left hover:translate-x-1 transition-transform duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Services</h3>
            <div className="space-y-3">
              {services.map((service) => (
                <a
                  key={service.label}
                  href={service.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm hover:translate-x-1 transition-transform duration-200"
                >
                  {service.label}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Stay Connected</h3>
            <p className="text-muted-foreground text-sm">
              Get updates on our latest projects and technology insights.
            </p>
            
            <form onSubmit={handleEmailSubscription} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-[#2d2d2d] border border-white/10 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  required
                />
                <Button 
                  type="submit"
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {currentYear} Nexus Core. All rights reserved.</p>
            
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Support
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}