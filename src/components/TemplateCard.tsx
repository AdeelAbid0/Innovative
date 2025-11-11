import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Star, Heart, Eye, ShoppingCart } from "lucide-react";
import { formatPrice } from "./data/TemplateData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CompactBuyButton } from "./GumroadIntegration";

interface TemplateCardProps {
  template: any;
  onSelect: (templateId: string) => void;
  onBuy?: (templateId: string) => void;
  className?: string;
}

export function TemplateCard({
  template,
  onSelect,
  onBuy,
  className = "",
}: TemplateCardProps) {
  // Figma demo URL for all previews
  const FIGMA_DEMO_URL = "https://clap-handle-87301877.figma.site";

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(FIGMA_DEMO_URL, "_blank", "noopener,noreferrer");
  };

  const handleCardClick = () => {
    onSelect(template.id);
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBuy) {
      onBuy(template.id);
    }
  };

  return (
    <Card
      className={`bg-card border-white/10 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:scale-105 group cursor-pointer ${className}`}
      onClick={handleCardClick}
    >
      <div className="aspect-video relative overflow-hidden">
        <ImageWithFallback
          src={template.thumbnail}
          alt={template.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {template.isNew && (
            <Badge className="bg-primary/90 text-primary-foreground border-none">
              New
            </Badge>
          )}
          {template.isBestSeller && (
            <Badge className="bg-yellow-500/90 text-white border-none">
              Best Seller
            </Badge>
          )}
        </div>

        {/* Price */}
        <div className="absolute top-4 right-4">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
            <span className="text-white font-bold">
              {formatPrice(template.price)}
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white"
              onClick={(e) => {
                e.stopPropagation();
                // Handle like functionality
              }}
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white"
              onClick={handlePreviewClick}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-foreground mb-1">{template.title}</h3>
            <p className="text-sm text-muted-foreground">{template.category}</p>
          </div>
        </div>

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
          <Badge variant="outline" className="text-xs">
            {template.difficulty}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {template.description}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-primary/40 hover:border-primary text-primary hover:bg-primary/10"
            onClick={handlePreviewClick}
          >
            <Eye className="w-4 h-4 mr-1" />
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
              onClick={handleBuyClick}
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Buy
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
