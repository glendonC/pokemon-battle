/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
    webpack: (config) => {
      config.externals = config.externals || [];
      config.externals.push({
        canvas: 'canvas',
        'utf-8-validate': 'utf-8-validate',
        'bufferutil': 'bufferutil',
      });
      return config;
    },
  };
  
  export default nextConfig;