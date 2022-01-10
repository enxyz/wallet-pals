/** @type {import('next').NextConfig} */
module.exports = {
  experiments: {
    asyncWebAssembly: true,
    topLevelAwait: true,
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  webpack: (config, options) => {
    config.experiments = {
      topLevelAwait: true,
    };
    return config;
  },
};
