import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ImageUpload } from '../ImageUpload';
import { 
  Lock, Shield, Plus, Upload, Save, Trash2, Eye, Edit,
  ArrowLeft, CheckCircle, AlertCircle, Image as ImageIcon,
  Globe, Code, Palette, Star, Download, Users, Clock, Sparkles,
  DollarSign, Link2, Settings, Tags, Zap, BarChart3, Award,
  FileText, Layers, Monitor, Smartphone, Package, Target, X
} from 'lucide-react';
import { addTemplate, getAllTemplates, deleteTemplate, updateTemplate, type Template } from '../data/TemplateData';

type Page = 'home' | 'templates' | 'template-detail' | 'how-to-launch' | 'custom-web' | 'thank-you' | 'checkout' | 'admin';

interface AdminPortalProps {
  onNavigate: (page: Page) => void;
}

interface NewTemplate {
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  category: string;
  demoUrl: string;
  gumroadUrl: string;
  downloadUrl: string;
  thumbnail: string;
  tags: string[];
  features: string[];
  isFeatured: boolean;
  isPopular: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  technologies: string[];
}

const ADMIN_PIN = '2024'; // Change this to your preferred PIN

export function AdminPortal({ onNavigate }: AdminPortalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [currentView, setCurrentView] = useState<'dashboard' | 'add-template' | 'manage-templates' | 'edit-template'>('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  const [newTemplate, setNewTemplate] = useState<NewTemplate>({
    title: '',
    description: '',
    price: '49',
    originalPrice: '99',
    category: 'Portfolio',
    demoUrl: '',
    gumroadUrl: '',
    downloadUrl: '',
    thumbnail: '',
    tags: [],
    features: [],
    isFeatured: false,
    isPopular: false,
    difficulty: 'Intermediate',
    estimatedTime: '2-3 hours',
    technologies: []
  });

  const categories = ['Portfolio', 'Business', 'E-commerce', 'Blog', 'Agency', 'Restaurant', 'SaaS', 'Landing Page'];
  const availableTechnologies = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'Vercel'];
  const commonFeatures = [
    'Responsive Design', 'SEO Optimized', 'Clean Code', 'Easy Customization',
    'Dark Mode', 'Light Mode', 'Mobile First', 'Performance Optimized',
    'Accessible Design', 'Modern UI/UX', 'Cross Browser', 'Documentation'
  ];

  useEffect(() => {
    if (isAuthenticated) {
      loadTemplates();
    }
  }, [isAuthenticated]);

  const loadTemplates = () => {
    const allTemplates = getAllTemplates();
    setTemplates(allTemplates);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      setMessage({ type: 'success', text: 'Access granted! Welcome to Admin Portal.' });
    } else {
      setMessage({ type: 'error', text: 'Invalid PIN code. Access denied.' });
      setPinInput('');
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    setNewTemplate(prev => ({ ...prev, thumbnail: imageUrl }));
  };

  const resetForm = () => {
    setNewTemplate({
      title: '',
      description: '',
      price: '49',
      originalPrice: '99',
      category: 'Portfolio',
      demoUrl: '',
      gumroadUrl: '',
      downloadUrl: '',
      thumbnail: '',
      tags: [],
      features: [],
      isFeatured: false,
      isPopular: false,
      difficulty: 'Intermediate',
      estimatedTime: '2-3 hours',
      technologies: []
    });
    setEditingTemplate(null);
  };

  const handleEditTemplate = (template: Template) => {
    // Populate form with existing template data
    setNewTemplate({
      title: template.title,
      description: template.description,
      price: template.price.toString(),
      originalPrice: template.originalPrice?.toString() || '99',
      category: template.category,
      demoUrl: template.demoUrl || '',
      gumroadUrl: template.gumroadUrl || '',
      downloadUrl: template.downloadUrl || '',
      thumbnail: template.thumbnail,
      tags: template.tags || [],
      features: template.features || [],
      isFeatured: (template as any).isFeatured || false,
      isPopular: (template as any).isPopular || false,
      difficulty: template.difficulty || 'Intermediate',
      estimatedTime: (template as any).estimatedTime || '2-3 hours',
      technologies: (template as any).technologies || []
    });
    setEditingTemplate(template);
    setCurrentView('edit-template');
  };

  const handleAddTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      if (!newTemplate.title || !newTemplate.description || !newTemplate.demoUrl) {
        throw new Error('Please fill in all required fields (Title, Description, Demo URL).');
      }

      // Generate unique ID for new templates only
      const id = editingTemplate ? editingTemplate.id : newTemplate.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

      // Create template object
      const templateToAdd: Template = {
        id,
        title: newTemplate.title,
        description: newTemplate.description,
        price: parseInt(newTemplate.price),
        originalPrice: parseInt(newTemplate.originalPrice),
        category: newTemplate.category,
        demoUrl: newTemplate.demoUrl,
        gumroadUrl: newTemplate.gumroadUrl || '#',
        downloadUrl: newTemplate.downloadUrl || '#',
        thumbnail: newTemplate.thumbnail || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        tags: newTemplate.tags,
        features: newTemplate.features.length > 0 ? newTemplate.features : [
          'Responsive Design',
          'Clean Code',
          'Easy Customization',
          'SEO Optimized'
        ],
        isFeatured: newTemplate.isFeatured,
        isPopular: newTemplate.isPopular,
        rating: editingTemplate?.rating || 4.8,
        reviews: editingTemplate?.reviews || Math.floor(Math.random() * 100) + 50,
        sales: editingTemplate?.sales || Math.floor(Math.random() * 500) + 100,
        lastUpdated: new Date().toISOString(),
        difficulty: newTemplate.difficulty,
        estimatedTime: newTemplate.estimatedTime,
        technologies: newTemplate.technologies.length > 0 ? newTemplate.technologies : ['React', 'Tailwind CSS'],
        livePreview: newTemplate.demoUrl,
        sourceCode: newTemplate.downloadUrl || '#',
        documentation: editingTemplate?.documentation || '#',
        support: editingTemplate?.support !== undefined ? editingTemplate.support : true
      };

      if (editingTemplate) {
        // Update existing template
        updateTemplate(templateToAdd.id, templateToAdd);
        setMessage({ type: 'success', text: `Template "${templateToAdd.title}" updated successfully!` });
      } else {
        // Add new template
        addTemplate(templateToAdd);
        setMessage({ type: 'success', text: `Template "${templateToAdd.title}" added successfully!` });
      }
      
      // Reset form and reload templates
      resetForm();
      loadTemplates();
      setCurrentView('manage-templates');

    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to save template. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (window.confirm('Are you sure you want to delete this template? This action cannot be undone.')) {
      try {
        deleteTemplate(templateId);
        loadTemplates();
        setMessage({ type: 'success', text: 'Template deleted successfully!' });
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to delete template.' });
      }
    }
  };

  const handleCancelEdit = () => {
    resetForm();
    setCurrentView('manage-templates');
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !newTemplate.tags.includes(tag.trim())) {
      setNewTemplate(prev => ({ ...prev, tags: [...prev.tags, tag.trim()] }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewTemplate(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addFeature = (feature: string) => {
    if (feature.trim() && !newTemplate.features.includes(feature.trim())) {
      setNewTemplate(prev => ({ ...prev, features: [...prev.features, feature.trim()] }));
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setNewTemplate(prev => ({
      ...prev,
      features: prev.features.filter(feature => feature !== featureToRemove)
    }));
  };

  const toggleTechnology = (tech: string) => {
    setNewTemplate(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech]
    }));
  };

  const toggleFeature = (feature: string) => {
    setNewTemplate(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  // Show message and auto-hide after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-6">
        <Card className="w-full max-w-md bg-[#2d2d2d] border-white/10">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">Admin Portal</CardTitle>
              <p className="text-muted-foreground">Enter your PIN to access the admin panel</p>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">PIN Code</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Enter 4-digit PIN"
                    className="pl-10 bg-[#1a1a1a] border-white/20 text-center text-lg tracking-widest"
                    maxLength={4}
                    autoFocus
                    required
                  />
                </div>
              </div>

              {message && (
                <div className={`p-3 rounded-lg text-sm ${
                  message.type === 'success' 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  <div className="flex items-center gap-2">
                    {message.type === 'success' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    {message.text}
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full btn-premium">
                Access Admin Portal
              </Button>

              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onNavigate('home')}
                className="w-full border-white/20 hover:bg-white/5"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Website
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main Admin Portal
  return (
    <div className="min-h-screen bg-[#1a1a1a] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              Admin Portal
            </h1>
            <p className="text-muted-foreground">Manage templates and website content</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              onClick={() => onNavigate('home')}
              className="border-white/20 hover:bg-white/5"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Website
            </Button>
            
            <Button 
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <Lock className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-primary/10 text-primary border border-primary/20' 
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            <div className="flex items-center gap-2">
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              {message.text}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4">
          <Button
            onClick={() => setCurrentView('dashboard')}
            variant={currentView === 'dashboard' ? 'default' : 'outline'}
            className={currentView === 'dashboard' ? 'btn-premium' : 'border-white/20 hover:bg-white/5'}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <Button
            onClick={() => {
              resetForm();
              setCurrentView('add-template');
            }}
            variant={currentView === 'add-template' ? 'default' : 'outline'}
            className={currentView === 'add-template' ? 'btn-premium' : 'border-white/20 hover:bg-white/5'}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Template
          </Button>
          <Button
            onClick={() => setCurrentView('manage-templates')}
            variant={currentView === 'manage-templates' ? 'default' : 'outline'}
            className={currentView === 'manage-templates' ? 'btn-premium' : 'border-white/20 hover:bg-white/5'}
          >
            <Package className="w-4 h-4 mr-2" />
            Manage Templates
          </Button>
        </div>

        <Separator className="bg-white/10" />

        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#2d2d2d] border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{templates.length}</p>
                    <p className="text-muted-foreground">Total Templates</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#2d2d2d] border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {templates.filter(t => (t as any).isFeatured).length}
                    </p>
                    <p className="text-muted-foreground">Featured</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#2d2d2d] border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {templates.filter(t => (t as any).isPopular).length}
                    </p>
                    <p className="text-muted-foreground">Popular</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add/Edit Template View */}
        {(currentView === 'add-template' || currentView === 'edit-template') && (
          <div className="space-y-8">
            
            {/* Header Section */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                {currentView === 'edit-template' ? (
                  <>
                    <Edit className="w-6 h-6 text-primary" />
                    Edit Template
                  </>
                ) : (
                  <>
                    <Plus className="w-6 h-6 text-primary" />
                    Add New Template
                  </>
                )}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {currentView === 'edit-template' 
                  ? 'Update the template details below. All changes will be saved automatically.'
                  : 'Create a new template for the marketplace. Fill in all the details below to make your template discoverable and attractive to users.'
                }
              </p>

              {/* Cancel Edit Button */}
              {currentView === 'edit-template' && (
                <div className="pt-4">
                  <Button
                    variant="outline"
                    onClick={handleCancelEdit}
                    className="border-white/20 hover:bg-white/5"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel Edit
                  </Button>
                </div>
              )}
            </div>

            <form onSubmit={handleAddTemplate} className="space-y-8">
              
              {/* Section 1: Visual & Basic Info */}
              <Card className="bg-[#2d2d2d] border-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    Visual & Basic Information
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">Upload an image and provide basic details about your template</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  
                  {/* Image Upload */}
                  <ImageUpload
                    onImageChange={handleImageUpload}
                    currentImage={newTemplate.thumbnail}
                  />
                  
                  {/* Title and Category Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        Template Title *
                      </label>
                      <Input
                        value={newTemplate.title}
                        onChange={(e) => setNewTemplate(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="E.g., Modern Portfolio Template"
                        className="bg-[#1a1a1a] border-white/20"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-1">
                        <Layers className="w-4 h-4" />
                        Category
                      </label>
                      <select
                        value={newTemplate.category}
                        onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 bg-[#1a1a1a] border border-white/20 rounded-lg text-foreground"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Description *
                    </label>
                    <Textarea
                      value={newTemplate.description}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your template features, target audience, and what makes it special..."
                      className="bg-[#1a1a1a] border-white/20 min-h-[120px] resize-none"
                      required
                    />
                    <p className="text-xs text-muted-foreground">Write a compelling description that highlights the key benefits and features</p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2: Pricing & Marketplace Info */}
              <Card className="bg-[#2d2d2d] border-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Pricing & Marketplace
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">Set pricing and configure marketplace settings</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  
                  {/* Pricing Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Current Price ($)</label>
                      <Input
                        type="number"
                        value={newTemplate.price}
                        onChange={(e) => setNewTemplate(prev => ({ ...prev, price: e.target.value }))}
                        className="bg-[#1a1a1a] border-white/20"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Original Price ($)</label>
                      <Input
                        type="number"
                        value={newTemplate.originalPrice}
                        onChange={(e) => setNewTemplate(prev => ({ ...prev, originalPrice: e.target.value }))}
                        className="bg-[#1a1a1a] border-white/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Difficulty</label>
                      <select
                        value={newTemplate.difficulty}
                        onChange={(e) => setNewTemplate(prev => ({ ...prev, difficulty: e.target.value as any }))}
                        className="w-full px-3 py-2 bg-[#1a1a1a] border border-white/20 rounded-lg text-foreground"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Setup Time</label>
                      <Input
                        value={newTemplate.estimatedTime}
                        onChange={(e) => setNewTemplate(prev => ({ ...prev, estimatedTime: e.target.value }))}
                        placeholder="2-3 hours"
                        className="bg-[#1a1a1a] border-white/20"
                      />
                    </div>
                  </div>

                  {/* Marketplace Flags */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      Marketplace Settings
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newTemplate.isFeatured}
                          onChange={(e) => setNewTemplate(prev => ({ ...prev, isFeatured: e.target.checked }))}
                          className="rounded border-white/20 bg-[#1a1a1a] text-primary focus:ring-primary"
                        />
                        <Award className="w-4 h-4 text-yellow-500" />
                        Featured Template
                      </label>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newTemplate.isPopular}
                          onChange={(e) => setNewTemplate(prev => ({ ...prev, isPopular: e.target.checked }))}
                          className="rounded border-white/20 bg-[#1a1a1a] text-primary focus:ring-primary"
                        />
                        <Zap className="w-4 h-4 text-blue-500" />
                        Popular Template
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 3: Links & Resources */}
              <Card className="bg-[#2d2d2d] border-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Link2 className="w-5 h-5 text-primary" />
                    Links & Resources
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">Provide demo links and download resources</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-1">
                          <Monitor className="w-4 h-4" />
                          Demo URL *
                        </label>
                        <Input
                          type="url"
                          value={newTemplate.demoUrl}
                          onChange={(e) => setNewTemplate(prev => ({ ...prev, demoUrl: e.target.value }))}
                          placeholder="https://demo.example.com"
                          className="bg-[#1a1a1a] border-white/20"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          Gumroad URL
                        </label>
                        <Input
                          type="url"
                          value={newTemplate.gumroadUrl}
                          onChange={(e) => setNewTemplate(prev => ({ ...prev, gumroadUrl: e.target.value }))}
                          placeholder="https://yoursite.gumroad.com/l/product"
                          className="bg-[#1a1a1a] border-white/20"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          Download URL
                        </label>
                        <Input
                          type="url"
                          value={newTemplate.downloadUrl}
                          onChange={(e) => setNewTemplate(prev => ({ ...prev, downloadUrl: e.target.value }))}
                          placeholder="https://download.example.com"
                          className="bg-[#1a1a1a] border-white/20"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 4: Tags & Features */}
              <Card className="bg-[#2d2d2d] border-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Tags className="w-5 h-5 text-primary" />
                    Tags & Features
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">Add tags and features to help users discover your template</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Tags */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground">Template Tags</label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a tag"
                          className="bg-[#1a1a1a] border-white/20 w-40"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const input = e.target as HTMLInputElement;
                              addTag(input.value);
                              input.value = '';
                            }
                          }}
                        />
                        <Button
                          type="button"
                          size="sm"
                          className="btn-premium"
                          onClick={(e) => {
                            const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
                            addTag(input.value);
                            input.value = '';
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {newTemplate.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="bg-primary/20 text-primary border-primary/30 cursor-pointer"
                          onClick={() => removeTag(tag)}
                        >
                          {tag}
                          <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Common Features */}
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-foreground">Quick Add Features</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {commonFeatures.map((feature, index) => (
                        <label key={index} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newTemplate.features.includes(feature)}
                            onChange={() => toggleFeature(feature)}
                            className="rounded border-white/20 bg-[#1a1a1a] text-primary focus:ring-primary"
                          />
                          <span className="text-foreground">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Custom Features */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground">Custom Features</label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a custom feature"
                          className="bg-[#1a1a1a] border-white/20 w-60"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const input = e.target as HTMLInputElement;
                              addFeature(input.value);
                              input.value = '';
                            }
                          }}
                        />
                        <Button
                          type="button"
                          size="sm"
                          className="btn-premium"
                          onClick={(e) => {
                            const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
                            addFeature(input.value);
                            input.value = '';
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {newTemplate.features.filter(feature => !commonFeatures.includes(feature)).map((feature, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="border-white/20 text-foreground cursor-pointer"
                          onClick={() => removeFeature(feature)}
                        >
                          {feature}
                          <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-foreground">Technologies Used</label>
                    <div className="flex flex-wrap gap-3">
                      {availableTechnologies.map((tech, index) => (
                        <label key={index} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newTemplate.technologies.includes(tech)}
                            onChange={() => toggleTechnology(tech)}
                            className="rounded border-white/20 bg-[#1a1a1a] text-primary focus:ring-primary"
                          />
                          <span className="text-foreground">{tech}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="btn-premium px-12 py-4 text-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      {currentView === 'edit-template' ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-3" />
                      {currentView === 'edit-template' ? 'Update Template' : 'Add Template'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Manage Templates View - Enhanced with Edit buttons */}
        {currentView === 'manage-templates' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2 mb-2">
                <Package className="w-6 h-6 text-primary" />
                Manage Templates
              </h2>
              <p className="text-muted-foreground">
                Edit, delete, and organize your template collection
              </p>
            </div>

            {templates.length === 0 ? (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Templates Found</h3>
                <p className="text-muted-foreground mb-6">Get started by adding your first template</p>
                <Button 
                  onClick={() => {
                    resetForm();
                    setCurrentView('add-template');
                  }}
                  className="btn-premium"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Template
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template, index) => (
                  <Card key={template.id} className="bg-[#2d2d2d] border-white/10 overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={template.thumbnail}
                        alt={template.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Action Buttons Overlay */}
                      <div className="absolute top-3 right-3 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-black/70 border-white/20 hover:bg-black/80 text-white"
                          onClick={() => handleEditTemplate(template)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-red-500/70 border-red-500/50 hover:bg-red-500/80 text-white"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {(template as any).isNew && (
                          <Badge className="bg-primary/90 text-primary-foreground">New</Badge>
                        )}
                        {(template as any).isBestSeller && (
                          <Badge className="bg-yellow-500/90 text-white">Best Seller</Badge>
                        )}
                        {(template as any).isFeatured && (
                          <Badge className="bg-purple-500/90 text-white">Featured</Badge>
                        )}
                        {(template as any).isPopular && (
                          <Badge className="bg-blue-500/90 text-white">Popular</Badge>
                        )}
                      </div>

                      {/* Price */}
                      <div className="absolute bottom-3 right-3">
                        <div className="bg-black/70 text-white px-3 py-1 rounded-lg font-bold">
                          ${template.price}
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground mb-1 line-clamp-1">{template.title}</h3>
                          <p className="text-sm text-muted-foreground">{template.category}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-foreground">{template.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({template.reviews})</span>
                        <div className="flex-1" />
                        <Badge variant="outline" className="text-xs border-white/20">
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
                          className="flex-1 border-white/20 hover:bg-white/5"
                          onClick={() => handleEditTemplate(template)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}