export default ({ config }: { config: any }) => ({
  expo: {
    ...config,

    extra: {
      API_URL: process.env.API_URL,
      API_SECRET_KEY: process.env.API_SECRET_KEY,
      ADS_TEST_ID: process.env.ADS_TEST_ID,
    },

    plugins: [
      "expo-secure-store",
      "expo-font",
      [
        "react-native-google-mobile-ads",
        {
          androidAppId: process.env.ADS_APP_ID,
          iosAppId: process.env.ADS_APP_ID,
        },
      ],
    ],
  },
});
