import React, { useContext } from "react";
import { StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";
import Icon from 'react-native-vector-icons/Ionicons';
import SignInWithOAuth from "../../components/SignInWithOAuth";
import { ThemeContext } from "../../common/ThemeProvider";
import PwReset from "./reset";
export default function LoginPage() {
  const { colorScheme } = useContext(ThemeContext);
  const { signIn, setActive, isLoaded } = useSignIn();
  const { isSignedIn } = useAuth()
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
      router.push('/')

    } catch (err) {
      alert("خطأ في تسجيل الدخول");
    }
  };
  return (
    <View className="bg-slate-100  flex-1 relative dark:bg-black">
      <StatusBar style='light' />
      {/* Close Button */}
      <TouchableOpacity
        onPress={() => router.navigate('/')}
        className="absolute top-10 left-5  z-20"
      >
        <Icon name={'arrow-back-outline'} size={30} color={colorScheme == "dark" ? "white" : "black"} />
      </TouchableOpacity>
      {/* Header Style */}
      <View className='flex h-[200] items-center justify-end '>
        <View className="">
          <Icon name="people-outline" size={70} color={'red'} />
        </View>
        <Text className="text-black dark:text-white font-cairoBold mt-2 text-xl">تسجيل الدخول</Text>
      </View>
      <View className="px-4 pt-10 flex-1 items-center">
        {/* Email */}
        <View className="overflow-hidden flex-row items-center mb-5 w-full rounded-lg py-4 px-2 bg-white shadow-xl">
          <Icon name="person-outline" size={25} color={'darkgray'} />
          <TextInput
            className="ml-2 w-full"
            autoCapitalize="none"
            value={emailAddress}
            placeholder="metalux@gmail.com"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
        </View>
        {/* Password */}
        <View className="overflow-hidden flex-row items-center mb-5 w-full rounded-lg py-4 px-2 bg-white shadow-lg">
          <Icon name="lock-closed-outline" size={25} color={'darkgray'} />
          <TextInput
            className="ml-2 w-full"
            value={password}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        {/* Reset Password */}
        <View className='flex-row items-center justify-between py-3 w-full mb-4'>
          <TouchableOpacity
            onPress={() => router.push('(modals)/reset')}
            className=''>
            <Text
              className='text-darkgray dark:text-whitegray text-right font-cairoLight'
              style={{ textDecorationLine: 'underline' }}>هل نسيت كلمة السر ؟</Text>
          </TouchableOpacity>

          {/* Create New Account */}
          <TouchableOpacity
            className=" "
            onPress={() => router.push('(modals)/signup')}
          >
            <Text className="text-darkgray dark:text-whitegray font-cairoLight"> ليس لديك حساب؟ <Text className="text-darkgray dark:text-whitegray font-cairoRegular " style={{ textDecorationLine: 'underline' }}>انشاء جديد</Text></Text>
          </TouchableOpacity>
        </View>
        {/* Button Log In */}
        <TouchableOpacity
          className="bg-secondary flex-row p-3 rounded-lg shadow mb-8"
          onPress={onSignInPress}>
          <Text className=" ml-1 text-white text-center  font-cairoMedium">تسجيل الدخول</Text>
          <Icon name="arrow-back-outline" size={25} color={'#fff'} />
        </TouchableOpacity>

        {/* Seperator */}
        {/* <View className="flex-row items-center gap-2 mt-2">
          <View
            className="border-b flex-1 dark:border-b-white"
          />
          <Text className='flex justify-center text-xl dark:text-whitegray'>أو</Text>
          <View
            className="border-b dark:border-b-white flex-1 justify-center"
          />
        </View> */}
        {/* Register With Google */}
        {/* <SignInWithOAuth /> */}
      </View>
    </View>
  );
}