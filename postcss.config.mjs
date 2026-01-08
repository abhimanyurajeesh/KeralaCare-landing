/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-env': {
      stage: 3, // Use stage 3 features (widely supported)
      features: {
        'nesting-rules': true,
        'custom-properties': {
          preserve: true, // Keep CSS variables for fallback
        },
      },
      autoprefixer: {
        flexbox: 'no-2009', // Use modern flexbox
        grid: 'autoplace', // Support CSS Grid with autoprefixing
      },
      browsers: [
        '>0.2%',
        'not dead',
        'not op_mini all',
        'IE 11', // Support Internet Explorer 11
        'Firefox ESR', // Support Firefox Extended Support Release
        'Chrome >= 60',
        'Safari >= 12',
        'Edge >= 18',
        'iOS >= 12',
        'Android >= 6',
      ],
    },
  },
};

export default config;
