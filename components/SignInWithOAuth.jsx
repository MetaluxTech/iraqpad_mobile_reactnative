import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Button, Text, TouchableOpacity } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useRouter } from "expo-router";
import Icon from 'react-native-vector-icons/Ionicons';
import { useColorScheme } from "nativewind";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
    useWarmUpBrowser();
    const router = useRouter()
    const { colorScheme } = useColorScheme();
    
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = async () => {
        try {
            const { createdSessionId, setActive } = await startOAuthFlow();
            if (createdSessionId) {
                setActive({ session: createdSessionId });
                router.push('/');
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    };

    return (
        <TouchableOpacity
            className=" bg-white dark:bg-black dark:border-whitegray p-2 flex-row justify-center items-center mt-5 rounded-md shadow"
            onPress={() => onPress()}
        >
            <Icon name={'logo-google'} size={30} color={colorScheme == "dark" ? "white" : "black"} />
            <Text className="ml-3 text-darkgray dark:text-white font-cairoLight">تسجيل دخول باستخدام حساب كوكل</Text>
        </TouchableOpacity>
    );
}
export default SignInWithOAuth;