// Environment utilities for the Ready To Launch application

export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'http://localhost:3000';
};

export const getApiUrl = () => {
  // For demo purposes, return a mock API URL
  return getBaseUrl() + '/api';
};

export const isClientSide = () => {
  return typeof window !== 'undefined';
};

export const isServerSide = () => {
  return typeof window === 'undefined';
};

export const getEnvVar = (name: string, defaultValue: string = '') => {
  if (isClientSide()) {
    // On client side, only NEXT_PUBLIC_ vars are available
    return (window as any).env?.[name] || defaultValue;
  }
  return process.env[name] || defaultValue;
};

export const debugLog = (...args: any[]) => {
  if (isDevelopment()) {
    console.log('[DEBUG]', ...args);
  }
};

export const errorLog = (...args: any[]) => {
  console.error('[ERROR]', ...args);
};

export const warnLog = (...args: any[]) => {
  if (isDevelopment()) {
    console.warn('[WARN]', ...args);
  }
};