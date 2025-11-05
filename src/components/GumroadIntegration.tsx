import React from 'react';
import { Button } from './ui/button';
import { ShoppingCart, ExternalLink, Zap } from 'lucide-react';

interface GumroadButtonProps {
  productUrl: string;
  templateName?: string;
  price?: string;
  variant?: 'default' | 'premium' | 'outline' | 'minimal';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

// Simple Gumroad integration without script dependency
export function GumroadIntegration() {
  // This component doesn't need to do anything since we're using direct links
  return null;
}

export function GumroadButton({ 
  productUrl, 
  templateName, 
  price, 
  variant = 'premium', 
  size = 'default',
  className = '',
  children 
}: GumroadButtonProps) {
  const getButtonStyles = () => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background";
    
    const sizeStyles = {
      sm: "px-4 py-2 text-sm",
      default: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base"
    };

    const variantStyles = {
      default: "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-primary/25",
      premium: "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-xl hover:shadow-primary/30",
      outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
      minimal: "text-primary hover:text-primary/80 underline-offset-4 hover:underline"
    };

    return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;
  };

  const defaultContent = (
    <>
      <ShoppingCart className="w-4 h-4 mr-2" />
      {price ? `Buy Now - ${price}` : 'Buy Now'}
    </>
  );

  const handleClick = () => {
    // Open Gumroad purchase page in new window with optimal dimensions
    const width = 800;
    const height = 700;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    const gumroadWindow = window.open(
      productUrl,
      'gumroad-purchase',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );

    // Focus the popup window
    if (gumroadWindow) {
      gumroadWindow.focus();
    }
  };

  return (
    <Button 
      className={getButtonStyles()} 
      size={size as any}
      onClick={handleClick}
    >
      {children || defaultContent}
    </Button>
  );
}

// Hook for Gumroad status (simplified)
export function useGumroad() {
  return { isReady: true, isError: false };
}

// Utility function to generate Gumroad product URLs
export function getGumroadUrl(productId: string): string {
  return `https://readytolaunch.gumroad.com/l/${productId}`;
}

// Pre-built button components for common use cases
export function QuickBuyButton({ productUrl, price, templateName }: { 
  productUrl: string; 
  price?: string; 
  templateName?: string; 
}) {
  return (
    <GumroadButton 
      productUrl={productUrl}
      price={price}
      templateName={templateName}
      variant="premium"
      size="lg"
      className="w-full"
    >
      <Zap className="w-5 h-5 mr-2" />
      Instant Purchase - {price || '$49'}
    </GumroadButton>
  );
}

export function CompactBuyButton({ productUrl, price }: { 
  productUrl: string; 
  price?: string; 
}) {
  return (
    <GumroadButton 
      productUrl={productUrl}
      price={price}
      variant="premium"
      size="sm"
    >
      <ShoppingCart className="w-4 h-4 mr-1" />
      {price || 'Buy'}
    </GumroadButton>
  );
}

export function OutlineBuyButton({ productUrl, price }: { 
  productUrl: string; 
  price?: string; 
}) {
  return (
    <GumroadButton 
      productUrl={productUrl}
      price={price}
      variant="outline"
      size="default"
    >
      <ExternalLink className="w-4 h-4 mr-2" />
      Purchase {price && `- ${price}`}
    </GumroadButton>
  );
}

// Alternative overlay-style button that opens in a centered popup
export function GumroadOverlayButton({ 
  productUrl, 
  price, 
  children,
  className = "",
  variant = "premium",
  size = "default"
}: {
  productUrl: string;
  price?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'premium' | 'outline' | 'minimal';
  size?: 'sm' | 'default' | 'lg';
}) {
  const handleOverlayPurchase = () => {
    // Create a more overlay-like experience
    const width = Math.min(900, window.innerWidth - 100);
    const height = Math.min(800, window.innerHeight - 100);
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    const purchaseWindow = window.open(
      productUrl,
      'gumroad-checkout',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,centerscreen=yes`
    );

    if (purchaseWindow) {
      purchaseWindow.focus();
      
      // Optional: Listen for window close to refresh page or show thank you message
      const checkClosed = setInterval(() => {
        if (purchaseWindow.closed) {
          clearInterval(checkClosed);
          console.log('Purchase window closed');
          // Could trigger a thank you message or page refresh here
        }
      }, 1000);
    }
  };

  const defaultContent = (
    <>
      <ShoppingCart className="w-4 h-4 mr-2" />
      {price ? `Buy Now - ${price}` : 'Buy Now'}
    </>
  );

  return (
    <GumroadButton 
      productUrl={productUrl}
      price={price}
      variant={variant}
      size={size}
      className={className}
    >
      {children || defaultContent}
    </GumroadButton>
  );
}

// Simple direct link button (no popup)
export function GumroadDirectButton({ 
  productUrl, 
  price, 
  children,
  className = "",
  variant = "premium",
  size = "default"
}: {
  productUrl: string;
  price?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'premium' | 'outline' | 'minimal';
  size?: 'sm' | 'default' | 'lg';
}) {
  const getButtonStyles = () => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background";
    
    const sizeStyles = {
      sm: "px-4 py-2 text-sm",
      default: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base"
    };

    const variantStyles = {
      default: "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-primary/25",
      premium: "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-xl hover:shadow-primary/30",
      outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
      minimal: "text-primary hover:text-primary/80 underline-offset-4 hover:underline"
    };

    return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;
  };

  const defaultContent = (
    <>
      <ExternalLink className="w-4 h-4 mr-2" />
      {price ? `Buy Now - ${price}` : 'Buy Now'}
    </>
  );

  return (
    <a
      href={productUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={getButtonStyles()}
      style={{ textDecoration: 'none' }}
    >
      {children || defaultContent}
    </a>
  );
}