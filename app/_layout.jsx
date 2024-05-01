
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import Constants from 'expo-constants';
import { ThemeProvider } from '../common/ThemeProvider';
import { I18nManager } from "react-native";
I18nManager.forceRTL(false);
I18nManager.allowRTL(false);
const tokenCache = {
  async getToken(key) {
    try {
      return await SecureStore.getItemAsync(key);

    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return await SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// Keep the splash screen visible while we fetch resources

export default function RootLayout() {
  const [loaded, error] = useFonts({
    bold: require('../assets/fonts/Cairo-Bold.ttf'),
    medium: require('../assets/fonts/Cairo-Medium.ttf'),
    regular: require('../assets/fonts/Cairo-Regular.ttf'),
    light: require('../assets/fonts/Cairo-Light.ttf')
  });
  SplashScreen.preventAutoHideAsync();
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
       SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider >
      <ClerkProvider
        secretKey={Constants.expoConfig.extra.clerkSecretKey}
        publishableKey={Constants.expoConfig.extra.clerkPublishableKey}
        tokenCache={tokenCache}
      >
        <RootLayoutNav />
      </ClerkProvider>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { isLoaded, isSignedIn } = useAuth();
  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) {
      router.replace('/');
    } else if (!isSignedIn) {
      router.replace('/(modals)/login');
    }
  }, [isSignedIn])
  return (
    <Stack screenOptions={{
      headerShown: false,

    }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(modals)/story" />
      <Stack.Screen name="(modals)/profile" />
      <Stack.Screen name="(modals)/storyByCategory"
        options={{
          presentation: 'modal',
        }} />
      <Stack.Screen name="(modals)/partstory" options={{
        presentation: 'modal',
      }} />
      <Stack.Screen name="(modals)/categoriesModals" options={{
        presentation: 'modal',
      }} />
      {/* <Stack.Screen name="(modals)/notifications" options={{
        presentation: 'modal',
      }} /> */}
      <Stack.Screen name="(modals)/login" options={{
        presentation: 'modal',
        headerShadowVisible: false,
      }} />
      <Stack.Screen name="(modals)/signup" options={{
        presentation: 'modal',
        headerShadowVisible: false,
      }}
      />
      <Stack.Screen name="(modals)/reset" options={{
        presentation: 'modal',
        headerShadowVisible: false,
      }}
      />
    </Stack>
  )
}

