/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "media.giphy.com",
      "res.cloudinary.com",
    ],
    unoptimized: true,
  },
};

export default nextConfig;
