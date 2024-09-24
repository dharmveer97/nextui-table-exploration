/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/auth/login',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
