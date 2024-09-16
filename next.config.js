/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/** @type {import('next').NextConfig} */
const path = require('path')
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NEXT_PUBLIC_ENV === 'predev' || process.env.NEXT_PUBLIC_ENV === 'dev'
})


module.exports = withPWA({
  output: 'export',
  trailingSlash: true,
  reactStrictMode: false,
  staticPageGenerationTimeout: 1000,
  experimental: {
    esmExternals: false
  },
  images: {
    loader: 'custom',
    loaderFile: './src/@core/configs/image.ts',
    path: "/"
  },
  exportPathMap: async function(
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/home": { page: "/home"},
    };
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
})
