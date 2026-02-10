/** @type {import('next').NextConfig} */

let domainName = process.env.NEXT_PUBLIC_BASE_URL;

if (domainName && (domainName.startsWith('https://') || domainName.startsWith('http://'))) {
  try {
    const url = new URL(domainName);
    domainName = url.hostname;
  } catch (e) {
    // ignore error, domainName remains as is or consider invalid
  }
}

const remotePatterns = [
  {
    protocol: "https",
    hostname: "cdn.sanity.io",
    port: "",
  },
  {
    protocol: "https",
    hostname: "ik.imagekit.io",
    port: "",
  },
  {
    protocol: "http",
    hostname: "localhost",
    port: "",
  },
  {
    protocol: "https",
    hostname: "plus.unsplash.com",
    port: "",
  },
];

if (domainName) {
  remotePatterns.push({
    protocol: "https",
    hostname: domainName,
    port: "",
  });
}

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: remotePatterns,
  },
};

module.exports = nextConfig;
