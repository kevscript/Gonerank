/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "pbs.twimg.com",
      "obiidvredbcigmtiepbg.supabase.co",
      "flagsapi.com",
      "flagcdn.com",
    ],
  },
};

module.exports = nextConfig;
