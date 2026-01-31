import 'dotenv/config';

export default ({ config }: { config: any }) => {
  return {
    ...config,
    extra: {
      API_URL: process.env.API_URL,
      API_SECRET_KEY: process.env.API_SECRET_KEY,
    },
    "plugins": [
      "expo-font"
    ]
  };
};