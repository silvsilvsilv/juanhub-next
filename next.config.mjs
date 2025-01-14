/** @type {import('next').NextConfig} */
const nextConfig = { 
    images: {
    domains: ['localhost','ivory-llama-451678.hostingersite.com'], 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ivory-llama-451678.hostingersite.com',
        pathname: '/storage/images/**',
      }
    ]
  },
};

export default nextConfig;
