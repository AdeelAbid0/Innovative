import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { 
  ArrowLeft, CreditCard, Shield, CheckCircle, Download, 
  Star, Lock, Gift, Sparkles, Trophy, Zap, FileText,
  User, Mail, Phone, MapPin
} from 'lucide-react';
import { getTemplateById } from '../data/TemplateData';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type Page = 'home' | 'templates' | 'template-detail' | 'how-to-launch' | 'custom-web' | 'thank-you' | 'checkout' | 'admin';

interface CheckoutPageProps {
  templateId: string;
  onNavigate: (page: Page) => void;
}

export function CheckoutPage({ templateId, onNavigate }: CheckoutPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderData, setOrderData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    paymentMethod: 'card'
  });
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const template = getTemplateById(templateId);
  
  // Fix: Handle price as number, not string
  const price = template ? (typeof template.price === 'number' ? template.price : parseFloat(template.price.toString().replace('$', ''))) : 49;
  const tax = Math.round(price * 0.1 * 100) / 100; // 10% tax
  const total = Math.round((price + tax) * 100) / 100; // Round to 2 decimal places

  useEffect(() => {
    // Auto-fill demo data for testing
    setOrderData({
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      country: 'United States',
      paymentMethod: 'card'
    });
    setCardData({
      number: '4242 4242 4242 4242',
      expiry: '12/25',
      cvv: '123',
      name: 'John Doe'
    });
  }, []);

  const validateStep = (step: number) => {
    const newErrors: {[key: string]: string} = {};

    if (step === 1) {
      if (!orderData.email) newErrors.email = 'Email is required';
      if (!orderData.firstName) newErrors.firstName = 'First name is required';
      if (!orderData.lastName) newErrors.lastName = 'Last name is required';
      if (!orderData.country) newErrors.country = 'Country is required';
    }

    if (step === 2) {
      if (!cardData.number) newErrors.cardNumber = 'Card number is required';
      if (!cardData.expiry) newErrors.expiry = 'Expiry date is required';
      if (!cardData.cvv) newErrors.cvv = 'CVV is required';
      if (!cardData.name) newErrors.cardName = 'Cardholder name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const processPayment = async () => {
    if (!validateStep(2)) return;

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate successful payment
      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('lastOrderId', orderId);
      localStorage.setItem('demoOrder', JSON.stringify({
        id: orderId,
        templateId,
        customer: orderData,
        template: template,
        amount: total,
        downloadToken: `demo_token_${orderId}`,
        createdAt: new Date().toISOString()
      }));
      
      onNavigate('thank-you');
    } catch (error) {
      console.error('Payment error:', error);
      setErrors({ payment: 'Payment failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardData(prev => ({ ...prev, number: formatted }));
  };

  const formatPrice = (amount: number) => {
    return amount.toFixed(2);
  };

  if (!template) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Template Not Found</h2>
          <p className="text-muted-foreground mb-6">The requested template could not be found.</p>
          <Button onClick={() => onNavigate('templates')} className="btn-premium">
            Browse Templates
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('template-detail')}
            className="hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Template
          </Button>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Secure Checkout</span>
            <Badge variant="outline" className="ml-2">Demo Mode</Badge>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            {[
              { step: 1, label: 'Information' },
              { step: 2, label: 'Payment' },
              { step: 3, label: 'Complete' }
            ].map(({ step, label }) => (
              <div key={step} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all
                    ${currentStep >= step 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {currentStep > step ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">{label}</span>
                </div>
                {step < 3 && (
                  <div className={`w-12 h-0.5 transition-all ${
                    currentStep > step ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-white/10 p-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Customer Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={orderData.firstName}
                        onChange={(e) => setOrderData(prev => ({ ...prev, firstName: e.target.value }))}
                        className={errors.firstName ? 'border-red-500' : ''}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={orderData.lastName}
                        onChange={(e) => setOrderData(prev => ({ ...prev, lastName: e.target.value }))}
                        className={errors.lastName ? 'border-red-500' : ''}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={orderData.email}
                      onChange={(e) => setOrderData(prev => ({ ...prev, email: e.target.value }))}
                      className={errors.email ? 'border-red-500' : ''}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    <p className="text-sm text-muted-foreground mt-1">
                      Download link will be sent to this email
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={orderData.phone}
                        onChange={(e) => setOrderData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        value={orderData.country}
                        onChange={(e) => setOrderData(prev => ({ ...prev, country: e.target.value }))}
                        className={errors.country ? 'border-red-500' : ''}
                        placeholder="United States"
                      />
                      {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                    </div>
                  </div>

                  <Button onClick={handleNext} className="w-full btn-premium" size="lg">
                    Continue to Payment
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Payment Information</h2>
                    <Badge variant="outline" className="ml-2">Demo - No Real Charges</Badge>
                  </div>

                  <div>
                    <Label htmlFor="cardName">Cardholder Name *</Label>
                    <Input
                      id="cardName"
                      value={cardData.name}
                      onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                      className={errors.cardName ? 'border-red-500' : ''}
                      placeholder="John Doe"
                    />
                    {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      value={cardData.number}
                      onChange={handleCardNumberChange}
                      className={errors.cardNumber ? 'border-red-500' : ''}
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date *</Label>
                      <Input
                        id="expiry"
                        value={cardData.expiry}
                        onChange={(e) => setCardData(prev => ({ ...prev, expiry: e.target.value }))}
                        className={errors.expiry ? 'border-red-500' : ''}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        value={cardData.cvv}
                        onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value }))}
                        className={errors.cvv ? 'border-red-500' : ''}
                        placeholder="123"
                        maxLength={4}
                      />
                      {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                    </div>
                  </div>

                  {errors.payment && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                      {errors.payment}
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={handleBack} className="flex-1">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button 
                      onClick={processPayment} 
                      className="flex-1 btn-premium" 
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Complete Demo Purchase - ${formatPrice(total)}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Template Preview */}
            <Card className="bg-card border-white/10 p-6">
              <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
              
              <div className="flex gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={template.thumbnail}
                    alt={template.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-foreground">{template.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{template.category}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-foreground">{template.rating}</span>
                    <span className="text-xs text-muted-foreground">({template.reviews})</span>
                  </div>
                </div>
              </div>

              <Separator className="my-4 bg-white/10" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Template Price</span>
                  <span className="text-foreground">${formatPrice(price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span className="text-foreground">${formatPrice(tax)}</span>
                </div>
                <Separator className="bg-white/10" />
                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">${formatPrice(total)}</span>
                </div>
              </div>
            </Card>

            {/* Features Included */}
            <Card className="bg-card border-white/10 p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Gift className="w-4 h-4 text-primary" />
                What's Included
              </h3>
              
              <div className="space-y-3 text-sm">
                {[
                  'Complete website template',
                  'Source code files',
                  'Installation guide',
                  'Customization documentation',
                  '30-day money back guarantee',
                  'Lifetime updates',
                  'Premium support'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Security Badge */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 p-6">
              <div className="text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-sm mb-1 text-foreground">
                  Demo Mode
                </h4>
                <p className="text-xs text-muted-foreground">
                  This is a demonstration - no real charges will be made
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}