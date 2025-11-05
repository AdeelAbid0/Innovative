import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { 
  Search, Star, Eye, ShoppingCart, ArrowRight,
  Download, Users, TrendingUp, Heart
} from 'lucide-react';
import { getAllTemplates, Template, formatPrice } from '../data/TemplateData';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { CompactBuyButton } from '../GumroadIntegration';

type Page = 'home' | 'templates' | 'template-detail' | 'how-to-launch' | 'custom-web' | 'thank-you' | 'checkout' | 'admin';

interface TemplatesPageProps {
  onNavigate: (page: Page) => void;
  onSelectTemplate: (templateId: string) => void;
}

export function TemplatesPage({ onNavigate, onSelectTemplate }: TemplatesPageProps) {
  const [allTemplates] = useState<Template[]>(getAllTemplates());
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(allTemplates);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Figma demo URL for all previews
  const FIGMA_DEMO_URL = 'https://clap-handle-87301877.figma.site';

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(FIGMA_DEMO_URL, '_blank', 'noopener,noreferrer');
  };

  const handleTemplateSelect = (templateId: string) => {
    onSelectTemplate(templateId);
    onNavigate('template-detail');
  };

  // Get unique categories for simple filtering
  const categories = ['All', ...Array.from(new Set(allTemplates.map(t => t.category)))];

  // Simple filter logic
  useEffect(() => {
    let filtered = allTemplates;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(template =>
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by popularity (reviews)
    filtered.sort((a, b) => b.reviews - a.reviews);

    setFilteredTemplates(filtered);
  }, [searchQuery, selectedCategory, allTemplates]);

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Hero Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-mega text-foreground mb-4">
            Website Templates
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Choose from our collection of professional templates and launch your website in minutes.
          </p>

          {/* Simple Search */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-base bg-card border-white/10 focus:border-primary rounded-xl"
              />
            </div>
          </div>

          {/* Simple Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {category}
                {category !== 'All' && (
                  <span className="ml-2 text-xs opacity-70">
                    {allTemplates.filter(t => t.category === category).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground mb-8">
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">No templates found</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Try adjusting your search or browse all categories
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                variant="outline"
                className="border-primary/40 hover:border-primary text-primary hover:bg-primary/10"
              >
                Show All Templates
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((template, index) => (
                <Card 
                  key={template.id} 
                  className="bg-card border-white/10 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
                  onClick={() => handleTemplateSelect(template.id)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Template Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={template.thumbnail}
                      alt={template.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                          onClick={handlePreviewClick}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          className="btn-premium"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle purchase
                          }}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Buy
                        </Button>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {template.isNew && (
                        <Badge className="bg-primary/90 text-primary-foreground border-none text-xs">
                          New
                        </Badge>
                      )}
                      {template.isBestSeller && (
                        <Badge className="bg-yellow-500/90 text-white border-none text-xs">
                          Best Seller
                        </Badge>
                      )}
                    </div>

                    {/* Price */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-white font-bold text-sm">
                          {formatPrice(template.price)}
                        </span>
                      </div>
                    </div>

                    {/* Like Button */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white w-8 h-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle like functionality
                        }}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground mb-1 line-clamp-1">
                          {template.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {template.category}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-foreground">
                          {template.rating}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({template.reviews})
                      </span>
                      <div className="flex-1" />
                      <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                        {template.difficulty}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                      {template.description}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-primary/40 hover:border-primary text-primary hover:bg-primary/10"
                        onClick={handlePreviewClick}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      
                      {/* Gumroad Purchase Button */}
                      {template.gumroadUrl ? (
                        <div onClick={(e) => e.stopPropagation()}>
                          <CompactBuyButton 
                            productUrl={template.gumroadUrl}
                            price={formatPrice(template.price)}
                          />
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          className="flex-1 btn-premium"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectTemplate(template.id);
                            onNavigate('checkout');
                          }}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Buy
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Simple Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Download className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">10K+</div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </div>
            <div>
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">2.5K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <Star className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">4.9</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div>
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-mega text-foreground mb-4">
            Need Something Custom?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Can't find the perfect template? Let our expert team build a custom website tailored to your specific needs.
          </p>
          <Button 
            size="lg" 
            className="btn-premium px-8 py-4 text-lg"
            onClick={() => onNavigate('custom-web')}
          >
            Request Custom Website
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}