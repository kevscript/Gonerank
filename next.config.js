/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "pbs.twimg.com",
      "obiidvredbcigmtiepbg.supabase.co",
      "countryflagsapi.com",
      "flagcdn.com",
    ],
  },
};

module.exports = nextConfig;
