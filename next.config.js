

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  scope: '/',
  sw: '/sw.js',
  disable: process.env.NODE_ENV === 'development'
})

const nextConfig = {
    // reactStrictMode: true, // if ON, all compoennts are rendered twice in dev mode
    basePath: '',
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

module.exports = withPWA(nextConfig)

