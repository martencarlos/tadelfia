/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true, // if ON, all compoennts are rendered twice in dev mode
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
          },
          {
            protocol: "http",
            hostname: "**",
          },
        ],
      },
      modularizeImports: {
        '@mui/icons-material/?(((\\w*)?/?)*)': {
            transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
        }
      },
}

module.exports = nextConfig
