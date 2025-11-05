import React from 'react';
import { Button } from './ui/button';
import { CustomArrowIcon } from './CustomArrowIcon';

interface StandardButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  showArrow?: boolean;
}

export function StandardButton({ 
  children, 
  onClick, 
  variant = 'default',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  showArrow = true
}: StandardButtonProps) {
  
  // Base styling that matches the Figma design
  const baseStyles = "relative overflow-hidden transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-[0.98] rounded-[99px]";
  
  // Size configurations
  const sizeStyles = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3 text-base gap-3", 
    lg: "px-8 py-4 text-lg gap-4"
  };

  // Variant configurations
  const variantStyles = {
    default: "bg-primary text-white shadow-[0_4px_12px_0_rgba(0,0,0,0.40)]",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white/10 shadow-[0px_2px_8px_0px_rgba(255,255,255,0.2)]",
    secondary: "bg-primary/10 text-primary border-2 border-primary/30 hover:bg-primary/20 shadow-[0px_4px_12px_0px_rgba(12,218,32,0.3)]",
    ghost: "bg-transparent text-white hover:bg-white/5 shadow-none"
  };

  const arrowIconBg = {
    default: 'bg-black/10',
    outline: 'bg-white/10', 
    secondary: 'bg-primary/20',
    ghost: 'bg-white/5'
  };

  const arrowColor = variant === 'default' ? 'text-white' : 'text-current';

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        bebas-neue-regular
        flex items-center justify-center
        tracking-[0.64px] font-normal
        ${className}
      `}
    >
      <span className="flex-1 text-center">
        {children}
      </span>
      {showArrow && (
        <CustomArrowIcon 
          size={size} 
          className={`${arrowColor} ${arrowIconBg[variant]}`}
        />
      )}
    </Button>
  );
}