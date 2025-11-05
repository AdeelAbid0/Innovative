import React, { memo } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Code, 
  TrendingUp, 
  Star,
  ExternalLink,
  CheckCircle,
  Target,
  Clock
} from 'lucide-react';

interface ProjectDetailProps {
  project: {
    id: number;
    title: string;
    description: string;
    category: string;
    year: string;
    client: string;
    duration: string;
    team: string;
    tech: string[];
    results: {
      metric: string;
      description: string;
    };
    challenge: string;
    solution: string;
    outcome: string;
    testimonial?: {
      quote: string;
      author: string;
      role: string;
    };
    metrics: {
      label: string;
      value: string;
    }[];
    features: string[];
  };
  onBack: () => void;
}

const ProjectDetailView: React.FC<ProjectDetailProps> = memo(({ project, onBack }) => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 hover:bg-primary/10 text-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>

        {/* Project Header */}
        <div className="text-center mb-12">
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-4 px-4 py-2">
            {project.category}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Project Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Visual */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 border border-primary/20">
              <div className="h-80 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                <Code className="w-24 h-24 text-primary/80 relative z-10" />
                
                {/* Status Indicator */}
                <div className="absolute top-6 right-6">
                  <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-full border border-white/10">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-foreground">Live</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Project Info */}
          <div className="space-y-6">
            <Card className="p-6 bg-card/50 border border-white/10">
              <h3 className="font-semibold text-foreground mb-4">Project Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Year</div>
                    <div className="font-medium text-foreground">{project.year}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Client</div>
                    <div className="font-medium text-foreground">{project.client}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                    <div className="font-medium text-foreground">{project.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Team Size</div>
                    <div className="font-medium text-foreground">{project.team}</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Live Project
              </Button>
              <Button 
                variant="outline"
                onClick={onBack}
                className="w-full border-primary/20 text-primary hover:bg-primary/10"
              >
                Back to Portfolio
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Project Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.metrics.map((metric, index) => (
              <Card key={index} className="p-6 text-center bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10">
                <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                <div className="text-muted-foreground">{metric.label}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Challenge, Solution, Outcome */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 bg-card/50 border border-white/10">
            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="font-semibold text-foreground mb-3">Challenge</h3>
            <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
          </Card>

          <Card className="p-6 bg-card/50 border border-white/10">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-semibold text-foreground mb-3">Solution</h3>
            <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
          </Card>

          <Card className="p-6 bg-card/50 border border-white/10">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-3">Outcome</h3>
            <p className="text-muted-foreground leading-relaxed">{project.outcome}</p>
          </Card>
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Technology Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {project.tech.map((tech, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="bg-primary/5 text-primary border-primary/20 px-4 py-2 text-sm"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {project.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Client Testimonial */}
        {project.testimonial && (
          <Card className="p-8 bg-gradient-to-r from-muted/50 to-muted/30 border border-white/10 mb-16">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-lg text-foreground italic mb-6 max-w-3xl mx-auto">
                "{project.testimonial.quote}"
              </p>
              <div className="text-center">
                <div className="font-semibold text-foreground">{project.testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{project.testimonial.role}</div>
              </div>
            </div>
          </Card>
        )}

        {/* Next Steps CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Start Your Project?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can create a similar solution tailored to your specific needs and goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
            >
              Start Your Project
            </Button>
            <Button 
              variant="outline"
              onClick={onBack}
              className="border-primary/20 text-primary hover:bg-primary/10 px-8 py-3"
            >
              View More Projects
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectDetailView.displayName = 'ProjectDetailView';

export { ProjectDetailView };