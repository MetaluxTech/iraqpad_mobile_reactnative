
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import Constants from 'expo-constants';
import { ThemeProvider } from '../common/ThemeProvider';

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);

    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
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


export default function RootLayout() {
  const [loaded, error] = useFonts({
    bold: require('../assets/fonts/Cairo-Bold.ttf'),
    medium: require('../assets/fonts/Cairo-Medium.ttf'),
    regular: require('../assets/fonts/Cairo-Regular.ttf'),
    light: require('../assets/fonts/Cairo-Light.ttf')
  });
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

  return(
    <ThemeProvider>
      <ClerkProvider publishableKey={Constants.expoConfig.extra.clerkPublishableKey} tokenCache={tokenCache}>
        <RootLayoutNav />
      </ClerkProvider>
    </ThemeProvider>
  ) ;
}

function RootLayoutNav() {
  const { isLoaded,isSignedIn } = useAuth();
  useEffect(()=>{
    if(isLoaded && !isSignedIn){
      router.push('/(modals)/login')
    }
  },[isSignedIn])
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(modals)/story" />
      <Stack.Screen name="(modals)/profile" />
      <Stack.Screen name="(modals)/partstory" />
      <Stack.Screen name="(modals)/search" options={{
        presentation:'modal',
      }}/>
      <Stack.Screen name="(modals)/notifications" options={{
        presentation:'modal',
        }}/>
      <Stack.Screen name="(modals)/login" options={{
        presentation:'modal',
        headerShadowVisible:false,
      }}/>
      <Stack.Screen name="(modals)/signup" options={{
        presentation:'modal',
        headerShadowVisible:false,}}
      />
      <Stack.Screen name="(modals)/reset" options={{
        presentation:'modal',
        headerShadowVisible:false,}}
      />
    </Stack>
  )}
