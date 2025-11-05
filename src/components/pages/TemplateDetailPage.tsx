import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft, Star, Eye, ShoppingCart, 
  Code, Smartphone, Zap, Globe, Heart, Share2,
  CheckCircle, Download, Users, Monitor,
  ExternalLink, ThumbsUp, Package, Clock, Shield
} from 'lucide-react';
import { getTemplateById, getAllTemplates, Template, formatPrice } from '../data/TemplateData';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { CompactBuyButton } from '../GumroadIntegration';

type Page = 'home' | 'templates' | 'template-detail' | 'how-to-launch' | 'custom-web' | 'thank-you' | 'checkout' | 'admin';

interface TemplateDetailPageProps {
  templateId: string;
  onNavigate: (page: Page) => void;
  onSelectTemplate: (templateId: string) => void;
}

export function TemplateDetailPage({ templateId, onNavigate, onSelectTemplate }: TemplateDetailPageProps) {
  const template = getTemplateById(templateId);
  const allTemplates = getAllTemplates();
  const relatedTemplates = allTemplates
    .filter(t => t.id !== templateId && t.category === template?.category)
    .slice(0, 3);

  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isLiked, setIsLiked] = useState(false);

  // Figma demo URL for all previews
  const FIGMA_DEMO_URL = 'https://clap-handle-87301877.figma.site';

  const handlePreviewClick = () => {
    window.open(FIGMA_DEMO_URL, '_blank', 'noopener,noreferrer');
  };

  const handleRelatedTemplateSelect = (relatedTemplateId: string) => {
    onSelectTemplate(relatedTemplateId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!template) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Template Not Found</h2>
          <p className="text-muted-foreground mb-6">The template you're looking for doesn't exist.</p>
          <Button onClick={() => onNavigate('templates')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Templates
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      
      {/* CLEAN HEADER */}
      <div className="border-b border-white/10 bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('templates')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Templates
              </Button>
              <div className="text-sm text-muted-foreground hidden md:block">
                {template.category} Template
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-foreground'}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* TEMPLATE TITLE SECTION */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="bg-primary/20 text-primary border-primary/30">
              {template.category}
            </Badge>
            <Badge variant="outline" className="border-white/20 text-muted-foreground">
              {template.difficulty}
            </Badge>
            {template.isNew && (
              <Badge className="bg-primary text-primary-foreground">New</Badge>
            )}
            {template.isBestSeller && (
              <Badge className="bg-yellow-500 text-white">Best Seller</Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {template.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${
                      i < Math.floor(template.rating) 
                        ? 'text-yellow-500 fill-current' 
                        : 'text-muted-foreground/30'
                    }`} 
                  />
                ))}
              </div>
              <span className="font-semibold text-foreground">{template.rating}</span>
              <span className="text-muted-foreground">({template.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground">
              <Download className="w-4 h-4" />
              <span>{template.downloads}+ downloads</span>
            </div>
          </div>

          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {template.description}
          </p>
        </div>

        {/* MAIN SPLIT LAYOUT */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          
          {/* LEFT: TEMPLATE PREVIEW - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Device Selector */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Preview</h2>
              
              <div className="flex bg-card rounded-lg p-1 border border-white/10">
                <button
                  onClick={() => setSelectedDevice('desktop')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedDevice === 'desktop'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  Desktop
                </button>
                <button
                  onClick={() => setSelectedDevice('mobile')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedDevice === 'mobile'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  Mobile
                </button>
              </div>
            </div>

            {/* Template Preview */}
            <div className="group relative">
              <div 
                className={`bg-card rounded-xl border border-white/10 p-4 transition-all duration-500 ${
                  selectedDevice === 'desktop' ? 'aspect-video' : 'aspect-[9/16] max-w-sm mx-auto'
                }`}
              >
                <div className="relative w-full h-full bg-background rounded-lg overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src={template.thumbnail}
                    alt={`${template.title} preview`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <Button
                      onClick={handlePreviewClick}
                      size="lg"
                      className="btn-premium shadow-xl"
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      View Live Demo
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                variant="outline"
                size="lg" 
                className="border-white/20 hover:border-primary/50 h-12"
                onClick={handlePreviewClick}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview Template
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              
              {template.gumroadUrl ? (
                <div className="w-full">
                  <CompactBuyButton 
                    productUrl={template.gumroadUrl}
                    price={`Buy Now - ${formatPrice(template.price)}`}
                  />
                </div>
              ) : (
                <Button
                  size="lg"
                  className="btn-premium h-12"
                  onClick={() => {
                    onSelectTemplate(template.id);
                    onNavigate('checkout');
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Buy Now - {formatPrice(template.price)}
                </Button>
              )}
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Code, label: 'Clean Code', desc: 'Semantic HTML' },
                { icon: Smartphone, label: 'Responsive', desc: 'All devices' },
                { icon: Zap, label: 'Fast', desc: '< 2s load' },
                { icon: Globe, label: 'SEO Ready', desc: 'Optimized' }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="text-center p-4 bg-card rounded-lg border border-white/10">
                    <IconComponent className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-sm font-medium text-foreground mb-1">{feature.label}</div>
                    <div className="text-xs text-muted-foreground">{feature.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: INFO PANEL - 1/3 width */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Pricing Card */}
            <Card className="p-6 bg-card border-white/10 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-foreground mb-2">
                  {formatPrice(template.price)}
                </div>
                <div className="text-sm text-muted-foreground mb-4">One-time purchase</div>
                
                <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2 mb-6">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500 font-medium">30% off regular price</span>
                </div>
              </div>
              
              {/* Trust Signals */}
              <div className="space-y-3 mb-6">
                {[
                  { icon: Shield, text: '30-day money back guarantee' },
                  { icon: Clock, text: 'Lifetime updates included' },
                  { icon: CheckCircle, text: 'Commercial license included' },
                  { icon: Users, text: 'Priority email support' }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <IconComponent className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-foreground">{item.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                {template.gumroadUrl ? (
                  <CompactBuyButton 
                    productUrl={template.gumroadUrl}
                    price={`Buy Now - ${formatPrice(template.price)}`}
                  />
                ) : (
                  <Button
                    size="lg"
                    className="w-full btn-premium h-12"
                    onClick={() => {
                      onSelectTemplate(template.id);
                      onNavigate('checkout');
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Now - {formatPrice(template.price)}
                  </Button>
                )}
                
                <Button 
                  variant="outline"
                  size="lg" 
                  className="w-full border-white/20 hover:border-primary/50 h-12"
                  onClick={handlePreviewClick}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Live Demo
                </Button>
              </div>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4 text-center bg-card border-white/10">
                <div className="text-2xl font-bold text-primary mb-1">{template.downloads}+</div>
                <div className="text-xs text-muted-foreground">Downloads</div>
              </Card>
              <Card className="p-4 text-center bg-card border-white/10">
                <div className="text-2xl font-bold text-primary mb-1">{template.reviews}</div>
                <div className="text-xs text-muted-foreground">Reviews</div>
              </Card>
            </div>

            {/* What's Included */}
            <Card className="p-6 bg-card border-white/10">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Package className="w-4 h-4 text-primary" />
                What's Included
              </h3>
              <div className="space-y-3">
                {[
                  'Complete HTML/CSS/JS files',
                  'Responsive design system',
                  'Setup documentation',
                  'Browser compatibility',
                  'Email support'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Technical Details */}
            <Card className="p-6 bg-card border-white/10">
              <h3 className="font-semibold text-foreground mb-4">Technical Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Technology</span>
                  <span className="text-foreground font-medium">HTML/CSS/JS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">File Size</span>
                  <span className="text-foreground font-medium">&lt; 2MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Browser Support</span>
                  <span className="text-foreground font-medium">All Modern</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mobile Ready</span>
                  <span className="text-foreground font-medium text-green-500">✓ Responsive</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* REVIEWS & DETAILS TABS */}
        <div className="mb-12">
          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-card border border-white/10">
              <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Reviews ({template.reviews})
              </TabsTrigger>
              <TabsTrigger value="details" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Details & Features
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reviews" className="space-y-6">
              {/* Review Summary */}
              <Card className="p-6 bg-card border-white/10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-foreground mb-2">{template.rating}</div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-6 h-6 ${
                            i < Math.floor(template.rating) 
                              ? 'text-yellow-500 fill-current' 
                              : 'text-muted-foreground/30'
                          }`} 
                        />
                      ))}
                    </div>
                    <div className="text-muted-foreground">Based on {template.reviews} reviews</div>
                  </div>
                  
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-3">
                        <span className="text-muted-foreground w-6 text-sm">{rating}★</span>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-500" 
                            style={{ width: rating === 5 ? '85%' : rating === 4 ? '15%' : '0%' }}
                          ></div>
                        </div>
                        <span className="text-muted-foreground w-10 text-sm">
                          {rating === 5 ? '85%' : rating === 4 ? '15%' : '0%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Sample Reviews */}
              <div className="space-y-4">
                {[
                  {
                    name: "Sarah Chen",
                    role: "Startup Founder",
                    rating: 5,
                    comment: "This template saved me weeks of development time. The code quality is exceptional and the design is clean and modern."
                  },
                  {
                    name: "David Rodriguez", 
                    role: "Freelance Designer",
                    rating: 5,
                    comment: "I've purchased many templates before, but this one stands out. Well-documented and easy to customize."
                  },
                  {
                    name: "Emily Johnson",
                    role: "Agency Owner", 
                    rating: 5,
                    comment: "We use this template for client projects. It's flexible, fast, and our clients love the professional look."
                  }
                ].map((review, index) => (
                  <Card key={index} className="p-6 bg-card border-white/10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground">{review.name}</h4>
                            <p className="text-sm text-muted-foreground">{review.role}</p>
                          </div>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-foreground mb-3">{review.comment}</p>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                          <ThumbsUp className="w-3 h-3 mr-2" />
                          Helpful
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <Card className="p-6 bg-card border-white/10">
                <h3 className="font-semibold text-foreground mb-6">Complete Feature List</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-primary uppercase tracking-wide">Design Features</h4>
                    <div className="space-y-3">
                      {[
                        'Modern, minimal design',
                        'Professional typography',
                        'Consistent color scheme',
                        'Clean layout structure',
                        'High-quality imagery'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-foreground text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-primary uppercase tracking-wide">Technical Features</h4>
                    <div className="space-y-3">
                      {[
                        'Clean, semantic HTML5',
                        'Modern CSS3 styling',
                        'JavaScript interactions',
                        'Mobile-first responsive',
                        'SEO-optimized structure'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-foreground text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* RELATED TEMPLATES */}
        {relatedTemplates.length > 0 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                More {template.category} Templates
              </h2>
              <p className="text-muted-foreground">
                Other templates you might like
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedTemplates.map((relatedTemplate) => (
                <Card 
                  key={relatedTemplate.id} 
                  className="bg-card border-white/10 overflow-hidden hover:border-primary/30 transition-colors group cursor-pointer"
                  onClick={() => handleRelatedTemplateSelect(relatedTemplate.id)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <ImageWithFallback
                      src={relatedTemplate.thumbnail}
                      alt={relatedTemplate.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    <div className="absolute top-3 right-3">
                      <div className="bg-black/80 text-white px-2 py-1 rounded text-sm font-semibold">
                        {formatPrice(relatedTemplate.price)}
                      </div>
                    </div>

                    <div className="absolute top-3 left-3 flex gap-1">
                      {relatedTemplate.isNew && (
                        <Badge className="bg-primary/90 text-primary-foreground text-xs">New</Badge>
                      )}
                      {relatedTemplate.isBestSeller && (
                        <Badge className="bg-yellow-500/90 text-white text-xs">Best Seller</Badge>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                      {relatedTemplate.title}
                    </h3>
                    
                    <div className="flex items-center gap-1 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < Math.floor(relatedTemplate.rating) 
                                ? 'text-yellow-500 fill-current' 
                                : 'text-muted-foreground/30'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({relatedTemplate.reviews})
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-white/20 hover:border-primary/50"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreviewClick();
                        }}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Preview
                      </Button>
                      
                      <Button
                        size="sm"
                        className="flex-1 btn-premium"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTemplate(relatedTemplate.id);
                          onNavigate('checkout');
                        }}
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Buy
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}