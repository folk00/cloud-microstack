/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Make browser calls same-origin; Next rewrites them to backend containers.
  async rewrites() {
    return [
      { source: "/api/:path*", destination: "http://api:8000/api/:path*" },
      { source: "/svc/:path*", destination: "http://svc-echo:8001/svc/:path*" },
    ];
  },
};

export default nextConfig;
