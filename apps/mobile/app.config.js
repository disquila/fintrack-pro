const { config: dotenvConfig } = require('dotenv');
const path = require('path');
const fs = require('fs');

function loadEnvFile(filePath) {
  if (fs.existsSync(filePath)) {
    const result = dotenvConfig({ path: filePath });
    return result.parsed || {};
  }
  return {};
}

module.exports = ({ config }) => {
  const env = process.env.APP_ENV || 'development';
  const isDev = env === 'development';

  const envFilePath = path.resolve(__dirname, `config/${env}.env`);
  const envVars = loadEnvFile(envFilePath);

  const appDisplayName = envVars.APP_DISPLAY_NAME || (isDev ? 'Fintrack Pro Dev' : 'Fintrack Pro');

  const publicEnvVars = {};
  for (const [key, value] of Object.entries(envVars)) {
    if (key.startsWith('EXPO_PUBLIC_')) {
      const cleanKey = key.replace('EXPO_PUBLIC_', '');
      publicEnvVars[cleanKey] = value;
    }
  }

  return {
    ...config,
    name: appDisplayName,
    slug: 'fintrack-pro',
    version: '0.1.0',
    scheme: 'fintrackapp',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    ios: {
      supportsTablet: true,
      bundleIdentifier: isDev ? 'com.fintrack.mobile.dev' : 'com.fintrack.mobile',
    },
    android: {
      package: isDev ? 'com.fintrack.mobile.dev' : 'com.fintrack.mobile',
      adaptiveIcon: {
        backgroundColor: '#F0EDE5',
        foregroundImage: './assets/android-icon-foreground.png',
        backgroundImage: './assets/android-icon-background.png',
        monochromeImage: './assets/android-icon-monochrome.png',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      'expo-secure-store',
      'expo-router',
      './plugins/withFintrackAndroid.js',
      [
        'expo-build-properties',
        {
          android: {
            googleServicesFile: isDev ? './config/google/google-services-dev.json' : './config/google/google-services-prod.json',
          },
        },
      ],
    ],
    extra: {
      ...publicEnvVars,
      appEnv: env,
      eas: {
        projectId: 'c23322bc-4f68-49bb-b4a5-3c6e1aa680cd',
      },
    },
  };
};
