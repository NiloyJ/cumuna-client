export const API_URL = import.meta.env.MODE === 'development' 
  ? import.meta.env.VITE_DEV_API_URL 
  : import.meta.env.VITE_API_URL; 