export default ({ config }: { config: any }) => {
  // console.log("ENV VARS:", {
  //   API_URL: process.env.API_URL,
  //   API_SECRET_KEY: process.env.API_SECRET_KEY,
  // });

  return {
    expo: {
      ...config,

      extra: {
        API_URL: process.env.API_URL,
        API_SECRET_KEY: process.env.API_SECRET_KEY,
        "eas": {
          "projectId": "fc4b5a44-3c96-482d-a4b0-8212d6d1b3d7"
        }
      },
      android: {
        ...config.android,
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
      },

      plugins: [
        "@react-native-firebase/app",
        [
          "expo-notifications",
          {
            "icon": "./assets/splashIcon.png",
          }
        ],
        "expo-secure-store",
        "expo-font",
        [
          "expo-navigation-bar",
          {
            "position": "absolute",
            "visibility": "hidden",
            "behavior": "overlay-swipe",
            "backgroundColor": "#00000000"
          }
        ]
      ]
    },
  };
};