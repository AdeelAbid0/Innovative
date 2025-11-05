import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, Home, Grid3X3, HelpCircle, Code, ArrowRight } from 'lucide-react';

type Page = 'home' | 'templates' | 'template-detail' | 'how-to-launch' | 'custom-web' | 'thank-you';

interface LeftSidebarNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function LeftSidebarNav({ currentPage, onNavigate }: LeftSidebarNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { id: 'home', label: 'Home', page: 'home' as Page, icon: Home },
    { id: 'templates', label: 'Templates', page: 'templates' as Page, icon: Grid3X3 },
    { id: 'how-to-launch', label: 'How it Works', page: 'how-to-launch' as Page, icon: HelpCircle },
    { id: 'custom-web', label: 'Custom Development', page: 'custom-web' as Page, icon: Code },
  ];

  const isActive = (page: Page) => {
    if (page === 'templates') {
      return currentPage === 'templates' || currentPage === 'template-detail';
    }
    return currentPage === page;
  };

  return (
    <>
      {/* Mobile Header */}
      <header className={`
        lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-[#212121]/95 backdrop-blur-md border-b border-white/10' 
          : 'bg-[#212121]/80'
        }
      `}>
        <div className="flex items-center justify-between h-16 px-4">
          <div onClick={() => onNavigate('home')} className="cursor-pointer">
            <Logo size="sm" showText={true} />
          </div>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white/80 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Desktop Left Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 sidebar-glass z-50">
        <div className="flex flex-col w-full p-6">
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')} 
            className="cursor-pointer mb-12 group"
          >
            <Logo 
              size="sm" 
              showText={true} 
              className="group-hover:opacity-80 transition-opacity duration-300" 
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-3">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onNavigate(item.page)}
                      className={`
                        sidebar-nav-item w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left
                        transition-all duration-300 group relative
                        ${isActive(item.page)
                          ? 'bg-primary/15 text-white border border-primary/30 active' 
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                        }
                      `}
                    >
                      <IconComponent 
                        size={18} 
                        className={`
                          transition-colors duration-300
                          ${isActive(item.page) ? 'text-primary' : 'text-white/60 group-hover:text-white/80'}
                        `} 
                      />
                      <span className="font-medium">{item.label}</span>
                      
                      {/* Active indicator */}
                      {isActive(item.page) && (
                        <div className="absolute right-3 w-2 h-2 bg-primary rounded-full animate-pulse" />
                      )}
                      
                      {/* Hover arrow */}
                      {!isActive(item.page) && (
                        <ArrowRight 
                          size={14} 
                          className="absolute right-3 opacity-0 group-hover:opacity-50 transform translate-x-1 group-hover:translate-x-0 transition-all duration-300" 
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Section */}
          <div className="pt-6 border-t border-white/10">
            <div className="text-center">
              <div className="text-xs text-white/40 mb-2">Ready To Launch</div>
              <div className="text-xs text-white/60">Premium Templates</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          <div className="fixed top-16 left-4 right-4 z-50 bg-[#2a2a2a] rounded-xl shadow-2xl lg:hidden border border-white/10">
            <div className="p-6 space-y-3">
              {navigationItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.page);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      mobile-nav-item w-full flex items-center justify-between px-4 py-3 rounded-lg
                      transition-colors duration-200
                      ${isActive(item.page)
                        ? 'text-white bg-primary/20 border border-primary/30'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                      }
                    `}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent size={18} className={isActive(item.page) ? 'text-primary' : 'text-white/60'} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    
                    {isActive(item.page) ? (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    ) : (
                      <ArrowRight size={16} className="opacity-50" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}