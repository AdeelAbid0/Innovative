import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { StandardButton } from './StandardButton';

type Page = 'home' | 'about' | 'services' | 'work' | 'contact' | 'thank-you' | 'case-study' | 'admin';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page, caseStudy?: any) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);

      // Determine which section is currently in view
      const sections = ['home', 'services', 'work', 'about', 'contact'];
      const sectionElements = sections.map(id => document.getElementById(id));
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section is in the top half of the viewport
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when page changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  const navigationItems = [
    { id: 'home', label: 'Home', section: 'home' },
    { id: 'services', label: 'Services', section: 'services' },
    { id: 'work', label: 'Portfolio', section: 'work' },
    { id: 'about', label: 'About', section: 'about' },
    { id: 'contact', label: 'Contact', section: 'contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (sectionId: string) => {
    return activeSection === sectionId;
  };

  return (
    <>
      {/* STICKY HEADER - Clean and working */}
      <header 
        className={`
          sticky-nav transition-all duration-300 ease-out header-blur
          ${isScrolled 
            ? 'bg-[#212121]/98 backdrop-blur-xl border-b border-white/10 header-shadow-scrolled' 
            : 'bg-[#212121]/90 backdrop-blur-sm header-shadow'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className={`
            flex items-center justify-between lg:justify-center relative transition-all duration-300
            ${isScrolled ? 'h-14' : 'h-16'}
          `}>
            
            {/* Logo - Left positioned on desktop */}
            <div 
              className={`
                cursor-pointer lg:absolute lg:left-0 transition-all duration-300 
                hover:scale-110 active:scale-95
                ${isScrolled ? 'scale-90' : 'scale-100'}
              `}
              onClick={() => {
                if (currentPage === 'case-study') {
                  onNavigate('home');
                } else {
                  scrollToSection('home');
                }
              }}
            >
              <Logo size="md" showText={true} />
            </div>

            {/* Centered Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (currentPage === 'case-study') {
                      onNavigate('home');
                      setTimeout(() => scrollToSection(item.section), 100);
                    } else {
                      scrollToSection(item.section);
                    }
                  }}
                  className={`
                    relative px-4 py-2 text-sm font-medium transition-all duration-300 
                    rounded-lg group hover:scale-105 active:scale-95 nav-item
                    ${isActive(item.section) 
                      ? 'text-primary font-bold bg-primary/10 shadow-lg shadow-primary/20 nav-item-active' 
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Active state indicator - Green dot */}
                  {isActive(item.section) && (
                    <>
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg"></div>
                    </>
                  )}
                  
                  {/* Hover effect for non-active items */}
                  {!isActive(item.section) && (
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-all duration-300"></div>
                  )}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`
                lg:hidden p-3 rounded-xl transition-all duration-300 
                hover:scale-110 active:scale-95
                ${isMobileMenuOpen 
                  ? 'text-primary bg-primary/20 shadow-lg shadow-primary/30' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
                }
              `}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Enhanced scroll progress indicator */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80 animate-pulse"></div>
        )}
      </header>

      {/* Mobile Menu with enhanced positioning */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop with blur */}
          <div 
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ top: isScrolled ? '56px' : '64px' }} // Adjust for header height
          />
          
          {/* Mobile menu panel */}
          <div className={`
            fixed left-4 right-4 z-50 lg:hidden mobile-menu-panel
            bg-[#2a2a2a]/98 backdrop-blur-xl rounded-2xl shadow-2xl 
            border border-white/10 transform transition-all duration-300
            ${isScrolled ? 'top-16' : 'top-18'}
          `}>
            <div className="p-6 space-y-3">
              {navigationItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (currentPage === 'case-study') {
                      onNavigate('home');
                      setTimeout(() => scrollToSection(item.section), 100);
                    } else {
                      scrollToSection(item.section);
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full px-6 py-4 rounded-xl text-sm font-medium mobile-menu-item
                    transition-all duration-300 flex items-center justify-between
                    hover:scale-[1.02] active:scale-[0.98]
                    ${isActive(item.section)
                      ? 'text-primary bg-primary/20 border border-primary/40 shadow-lg shadow-primary/20'
                      : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent'
                    }
                  `}
                  style={{ 
                    animationName: 'slideIn',
                    animationDuration: '0.4s',
                    animationTimingFunction: 'ease-out',
                    animationFillMode: 'forwards',
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <span className="flex-1 text-center font-medium">{item.label}</span>
                  {isActive(item.section) ? (
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/60"></div>
                  ) : (
                    <ArrowRight size={16} className="opacity-40 transition-all group-hover:translate-x-1 group-hover:opacity-60" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}