import developmentConfig from './env/development.json';
import productionConfig from './env/production.json';

interface EnvConfig {
  apiBaseUrl: string;
  doctorId: string;
}

const isDevelopment = (): boolean => {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  return (
    hostname === 'localhost' || 
    hostname === '127.0.0.1' ||
    hostname.includes('dev-online-clinic')
  );
};

export const env: EnvConfig = isDevelopment() 
  ? developmentConfig 
  : productionConfig;

export const isDev = isDevelopment();
