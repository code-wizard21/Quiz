// Remove this if you're not using Fullcalendar features
const withTM = require('next-transpile-modules')([

]);

module.exports = withTM({
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/authentication/login',
        permanent: true
      },
      {
        source: '/dashboard',
        destination: '/dashboard/reports',
        permanent: true
      },
      {
        source: '/dashboard/onboarding',
        destination: '/dashboard/onboarding/vertical',
        permanent: true
      }
    ];
  }
});
