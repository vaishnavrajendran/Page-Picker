/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    config.resolve.alias.canvas = false;
    // Add a rule for handling binary files
    config.module.rules.push({
      test: /\.node$/,
      use: "file-loader",
    });

    return config;
  },
};
