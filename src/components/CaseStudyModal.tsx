import React, { memo } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  X, 
  Calendar, 
  Users, 
  Target,
  CheckCircle,
  TrendingUp,
  Star,
  Building,
  Clock
} from 'lucide-react';
// Professional case study images
const caseStudyImages = {
  1: "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzaG9wcGluZyUyMHdlYnNpdGV8ZW58MXx8fHwxNzU3OTMyMjk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  2: "https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMHRlY2hub2xvZ3klMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzU3OTMyMzAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  3: "https://images.unsplash.com/photo-1642055509518-adafcad1d22e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW50ZWNoJTIwYmFua2luZyUyMG1vYmlsZSUyMGFwcHxlbnwxfHx8fDE3NTc4NTQzODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
};

interface CaseStudy {
  id: number;
  title: string;
  subtitle: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metrics: { label: string; value: string; }[];
    quote: string;
    author: string;
    role: string;
  };
  timeline: string;
  teamSize: string;
  technologies: string[];
}

interface CaseStudyModalProps {
  caseStudy: CaseStudy;
  onClose: () => void;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = memo(({ caseStudy, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-background border border-white/10 rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{caseStudy.title}</h2>
            <p className="text-muted-foreground">{caseStudy.subtitle}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Project Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Image */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <img 
                  src={caseStudyImages[caseStudy.id as keyof typeof caseStudyImages]} 
                  alt={caseStudy.title}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              </Card>
            </div>

            {/* Project Details */}
            <div className="space-y-4">
              <Card className="p-4 bg-card/50 border border-white/10">
                <h3 className="font-semibold text-foreground mb-3">Project Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Building className="w-4 h-4 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Industry</div>
                      <div className="text-sm font-medium text-foreground">{caseStudy.industry}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Timeline</div>
                      <div className="text-sm font-medium text-foreground">{caseStudy.timeline}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Team Size</div>
                      <div className="text-sm font-medium text-foreground">{caseStudy.teamSize}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Key Metrics */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">Key Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {caseStudy.results.metrics.map((metric, index) => (
                <Card key={index} className="p-4 text-center bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10">
                  <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </Card>
              ))}
            </div>
          </div>

          {/* Challenge, Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-card/50 border border-white/10">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-3">Challenge</h3>
              <p className="text-muted-foreground leading-relaxed">{caseStudy.challenge}</p>
            </Card>

            <Card className="p-6 bg-card/50 border border-white/10">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-3">Solution</h3>
              <p className="text-muted-foreground leading-relaxed">{caseStudy.solution}</p>
            </Card>
          </div>

          {/* Technologies Used */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((tech, index) => (
                <Badge 
                  key={index}
                  variant="outline" 
                  className="bg-primary/5 text-primary border-primary/20 px-3 py-1"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Client Testimonial */}
          <Card className="p-6 bg-gradient-to-r from-muted/50 to-muted/30 border border-white/10">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
              ))}
            </div>
            <p className="text-lg text-foreground italic mb-4 text-center">
              "{caseStudy.results.quote}"
            </p>
            <div className="text-center">
              <div className="font-semibold text-foreground">{caseStudy.results.author}</div>
              <div className="text-sm text-muted-foreground">{caseStudy.results.role}</div>
            </div>
          </Card>

          {/* Call to Action */}
          <div className="text-center pt-4">
            <p className="text-muted-foreground mb-4">
              Ready to achieve similar results for your business?
            </p>
            <Button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
            >
              Start Your Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

CaseStudyModal.displayName = 'CaseStudyModal';

export { CaseStudyModal };