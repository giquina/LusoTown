export default {
  expo: {
    name: "LusoTown",
    slug: "lusotown-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    scheme: "lusotown",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#D4A574" // Portuguese heritage gold
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.lusotown.app",
      buildNumber: "1.0.0",
      infoPlist: {
        NSCameraUsageDescription: "LusoTown uses the camera to take profile photos and share Portuguese cultural moments",
        NSPhotoLibraryUsageDescription: "LusoTown accesses your photo library to share Portuguese cultural photos",
        NSLocationWhenInUseUsageDescription: "LusoTown uses your location to find nearby Portuguese cultural events and businesses",
        NSContactsUsageDescription: "LusoTown can access your contacts to help you connect with other Portuguese speakers",
        NSMicrophoneUsageDescription: "LusoTown uses the microphone for voice messages and Portuguese language features",
        NSFaceIDUsageDescription: "LusoTown uses Face ID for secure authentication"
      },
      associatedDomains: [
        "applinks:lusotown.com",
        "applinks:*.lusotown.com"
      ]
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#D4A574" // Portuguese heritage gold
      },
      package: "com.lusotown.app",
      versionCode: 1,
      permissions: [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "RECORD_AUDIO",
        "USE_FINGERPRINT",
        "USE_BIOMETRIC",
        "VIBRATE",
        "RECEIVE_BOOT_COMPLETED"
      ],
      intentFilters: [
        {
          action: "VIEW",
          autoVerify: true,
          data: [
            {
              scheme: "https",
              host: "lusotown.com"
            },
            {
              scheme: "lusotown"
            }
          ],
          category: ["BROWSABLE", "DEFAULT"]
        }
      ]
    },
    web: {
      favicon: "./assets/favicon.png",
      bundler: "metro"
    },
    plugins: [
      "expo-router",
      "expo-localization",
      [
        "expo-camera",
        {
          cameraPermission: "Allow LusoTown to access your camera for profile pictures and Portuguese cultural content sharing."
        }
      ],
      [
        "expo-image-picker",
        {
          photosPermission: "Allow LusoTown to access your photos for profile pictures and Portuguese cultural content.",
          cameraPermission: "Allow LusoTown to access your camera for profile pictures and Portuguese cultural content sharing."
        }
      ],
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission: "Allow LusoTown to use your location to find nearby Portuguese cultural events and businesses."
        }
      ],
      [
        "expo-notifications",
        {
          icon: "./assets/notification-icon.png",
          color: "#D4A574",
          sounds: ["./assets/notification.wav"]
        }
      ],
      "expo-local-authentication",
      "expo-secure-store",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static"
          },
          android: {
            compileSdkVersion: 34,
            targetSdkVersion: 34,
            minSdkVersion: 23
          }
        }
      ]
    ],
    extra: {
      eas: {
        projectId: process.env.EAS_PROJECT_ID || "550e8400-e29b-41d4-a716-446655440000"
      },
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      apiUrl: process.env.EXPO_PUBLIC_API_URL || "https://lusotown.com/api",
      streamingUrl: process.env.EXPO_PUBLIC_STREAMING_URL || "http://localhost:8080"
    },
    updates: {
      url: "https://u.expo.dev/550e8400-e29b-41d4-a716-446655440000"
    },
    runtimeVersion: {
      policy: "appVersion"
    }
  }
};