const withPlugins = require("next-compose-plugins")
const withOptimizedImages = require("next-optimized-images")
const withBundleAnalyzer = require("@next/bundle-analyzer")
const withFonts = require("next-fonts")

module.exports = withPlugins(
  [
    [withFonts],
    [withOptimizedImages],
    [withBundleAnalyzer],
  ],
  {
    sassOptions: {
      includePaths: ['./src/components/']
    },
    compiler: {
      // Enables the styled-components SWC transform
      styledComponents: true
    },
    options: {
      prettier: false,
      svgo: true,
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: { removeViewBox: false },
            },
          },
        ],
      },
      titleProp: true,
    }
  }
);
