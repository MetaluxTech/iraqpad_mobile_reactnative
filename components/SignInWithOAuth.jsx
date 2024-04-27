import React, { useCallback } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useRouter } from "expo-router";
import Icon from 'react-native-vector-icons/Ionicons';
import { useColorScheme } from "nativewind";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();
const Strategy = {
  Google: 'oauth_google',
};

const SignInWithOAuth = () => {
  useWarmUpBrowser();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: Strategy.Google });

  const onSelectAuth = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await googleAuth();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
        router.push('/');
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, [googleAuth, router]);


  return (
    <TouchableOpacity
      className="bg-white dark:bg-black dark:border-whitegray p-2 flex-row justify-center items-center mt-5 rounded-md"
      onPress={() => onSelectAuth(Strategy.Google)}
    >
      <Icon name={'logo-google'} size={30} color={colorScheme === "dark" ? "white" : "black"} />
      <Text className="ml-3 text-darkgray dark:text-white font-cairoLight">تسجيل دخول باستخدام حساب كوكل</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 8,
  },
  text: {
    marginLeft: 10,
    fontFamily: 'cairoLight',
    fontSize: 16,
  },
});

export default SignInWithOAuth;