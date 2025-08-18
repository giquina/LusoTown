export default {
  expo: {
    name: "LusoTown",
    slug: "lusotown-london",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#1E40AF"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.lusotown.london"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      package: "com.lusotown.london"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    },
    plugins: [
      [
        "expo-camera",
        {
          cameraPermission: "Allow LusoTown to access your camera for profile pictures and identity verification."
        }
      ],
      [
        "expo-image-picker",
        {
          photosPermission: "Allow LusoTown to access your photos for profile pictures.",
          cameraPermission: "Allow LusoTown to access your camera for profile pictures and identity verification."
        }
      ]
    ]
  }
};