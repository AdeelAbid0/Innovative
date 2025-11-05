import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use("*", cors());
app.use("*", logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Routes
app.get("/make-server-dedf14fe/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Process order and payment
app.post("/make-server-dedf14fe/orders", async (c) => {
  try {
    const { templateId, customer, payment, template } = await c.req.json();
    
    // Generate unique order ID
    const orderId = `RTL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create order object
    const order = {
      id: orderId,
      templateId,
      template,
      customer,
      amount: payment.amount,
      status: 'completed',
      createdAt: new Date().toISOString(),
      paymentMethod: 'card',
      downloadToken: `download_${orderId}_${Math.random().toString(36).substr(2, 16)}`
    };
    
    // Store order in KV store
    await kv.set(`order:${orderId}`, order);
    await kv.set(`download:${order.downloadToken}`, {
      orderId,
      templateId,
      downloadUrl: `https://your-cdn.com/templates/${templateId}.zip`,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
    });
    
    // Store customer info for email
    await kv.set(`customer:${customer.email}`, {
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      orders: [orderId]
    });
    
    console.log(`Order created: ${orderId} for template: ${templateId}`);
    
    return c.json({ 
      success: true, 
      order: {
        id: orderId,
        downloadToken: order.downloadToken,
        template: template.title
      }
    });
    
  } catch (error) {
    console.error('Order creation error:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to process order' 
    }, 500);
  }
});

// Get order details
app.get("/make-server-dedf14fe/orders/:orderId", async (c) => {
  try {
    const orderId = c.req.param('orderId');
    const order = await kv.get(`order:${orderId}`);
    
    if (!order) {
      return c.json({ error: 'Order not found' }, 404);
    }
    
    return c.json({ success: true, order });
    
  } catch (error) {
    console.error('Get order error:', error);
    return c.json({ error: 'Failed to fetch order' }, 500);
  }
});

// Download endpoint
app.get("/make-server-dedf14fe/download/:token", async (c) => {
  try {
    const token = c.req.param('token');
    const downloadData = await kv.get(`download:${token}`);
    
    if (!downloadData) {
      return c.json({ error: 'Download token invalid or expired' }, 404);
    }
    
    // Check if expired
    if (new Date() > new Date(downloadData.expiresAt)) {
      return c.json({ error: 'Download link has expired' }, 410);
    }
    
    // In production, this would redirect to actual file or signed URL
    return c.json({ 
      success: true, 
      downloadUrl: downloadData.downloadUrl,
      templateId: downloadData.templateId,
      message: 'Download ready'
    });
    
  } catch (error) {
    console.error('Download error:', error);
    return c.json({ error: 'Failed to process download' }, 500);
  }
});

// Get customer orders
app.get("/make-server-dedf14fe/customer/:email/orders", async (c) => {
  try {
    const email = c.req.param('email');
    const customer = await kv.get(`customer:${email}`);
    
    if (!customer) {
      return c.json({ orders: [] });
    }
    
    const orders = [];
    for (const orderId of customer.orders) {
      const order = await kv.get(`order:${orderId}`);
      if (order) {
        orders.push(order);
      }
    }
    
    return c.json({ success: true, orders });
    
  } catch (error) {
    console.error('Get customer orders error:', error);
    return c.json({ error: 'Failed to fetch orders' }, 500);
  }
});

// Analytics endpoint
app.get("/make-server-dedf14fe/analytics", async (c) => {
  try {
    // Get all orders for analytics
    const allOrders = await kv.getByPrefix('order:');
    
    const analytics = {
      totalOrders: allOrders.length,
      totalRevenue: allOrders.reduce((sum, order) => sum + (order.amount || 0), 0),
      popularTemplates: {},
      recentOrders: allOrders.slice(-5)
    };
    
    // Count template popularity
    allOrders.forEach(order => {
      const templateId = order.templateId;
      analytics.popularTemplates[templateId] = (analytics.popularTemplates[templateId] || 0) + 1;
    });
    
    return c.json({ success: true, analytics });
    
  } catch (error) {
    console.error('Analytics error:', error);
    return c.json({ error: 'Failed to fetch analytics' }, 500);
  }
});

// Start server
Deno.serve(app.fetch);