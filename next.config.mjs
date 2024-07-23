import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'
/** @type {import('next').NextConfig} */
if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform()
  }
  
const nextConfig = {};

export default nextConfig;
