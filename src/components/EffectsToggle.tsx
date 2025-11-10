import React, { useState } from 'react';
import { Sparkles, SparklesIcon } from 'lucide-react';
import { Button } from './ui/button';

interface EffectsToggleProps {
  onToggle?: (enabled: boolean) => void;
}

/**
 * Optional component to let users toggle coding effects on/off
 * Can be added to the hero section if needed
 */
export function EffectsToggle({ onToggle }: EffectsToggleProps) {
  const [effectsEnabled, setEffectsEnabled] = useState(true);

  const handleToggle = () => {
    const newState = !effectsEnabled;
    setEffectsEnabled(newState);
    
    // Store preference in localStorage
    localStorage.setItem('coding-effects-enabled', JSON.stringify(newState));
    
    // Notify parent component
    onToggle?.(newState);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 hidden lg:block">
      <Button
        onClick={handleToggle}
        variant="outline"
        size="sm"
        className={`
          backdrop-blur-sm border-primary/30 transition-all duration-300
          ${effectsEnabled 
            ? 'bg-primary/10 text-primary hover:bg-primary/20' 
            : 'bg-background/50 text-muted-foreground hover:bg-background/70'
          }
        `}
        title={effectsEnabled ? 'Disable effects' : 'Enable effects'}
      >
        <Sparkles className={`w-4 h-4 mr-2 ${effectsEnabled ? 'animate-pulse' : ''}`} />
        {effectsEnabled ? 'Effects On' : 'Effects Off'}
      </Button>
    </div>
  );
}

/**
 * Usage in HomePage.tsx:
 * 
 * const [effectsEnabled, setEffectsEnabled] = useState(true);
 * 
 * <section id="home" ...>
 *   {effectsEnabled && (
 *     <>
 *       <CodeRainEffect />
 *       <EnhancedCodingEffects />
 *       <CodingBackground />
 *       <CodeTerminal />
 *     </>
 *   )}
 *   ...
 * </section>
 * 
 * <EffectsToggle onToggle={setEffectsEnabled} />
 */
