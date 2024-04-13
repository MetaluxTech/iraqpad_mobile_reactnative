import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useOAuth, useSignUp } from "@clerk/clerk-expo";
import {useRouter } from "expo-router";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import Icon from 'react-native-vector-icons/Ionicons';
export default function SignUpScreen() {


  // useWarmUpBrowser();
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUserName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
    
  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      await signUp.create({
        firstName,
        lastName,
        username,
        emailAddress,
        password,
      });
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
 
  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
 
      await setActive({ session: completeSignUp.createdSessionId });
      router.push('/')
    } catch (err) {
      alert('يرجى كتابة الرمز الصحيح');
    }
  };
 
  return (
    <View className=" flex-1">
      {!pendingVerification && (
      <View className="bg-slate-100 dark:bg-black flex-1">
        {/* Close Button */}
        <TouchableOpacity
            onPress={()=>router.back()}
            className="absolute top-10 left-5 z-10  p-3 rounded-full"
        >
          <Icon name={'arrow-back-outline'} size={30} color={'black'} />
        </TouchableOpacity>
        {/* Header Style */}
        <View className='flex h-[250] items-center justify-end '>
          <View className="">
            <Icon name="person-add-outline" size={70} color={'red'}/>
          </View>
          <Text className="text-black dark:text-white font-cairoBold mt-2 text-xl">انشاء حساب جديد</Text>
        </View>
        <View className='px-4  pt-10 flex-1 items-center justify-start'>
          <View className="overflow-hidden mb-5 w-full rounded-lg py-4 px-2 bg-white shadow-xl">
            <TextInput
              className="w-full"
              autoCapitalize="none"
              value={firstName}
              placeholder="First Name"
              onChangeText={(firstName) => setFirstName(firstName)}
            />
          </View>
          <View className="overflow-hidden mb-5 w-full rounded-lg py-4 px-2 bg-white shadow-xl">
            <TextInput
              className="w-full"
              autoCapitalize="none"
              value={lastName}
              placeholder="Last Name"
              onChangeText={(lastName) => setLastName(lastName)}
            />
          </View>
          <View className="overflow-hidden mb-5 w-full rounded-lg py-4 px-2 bg-white shadow-xl">
            <TextInput
              className="w-full"
              // autoCapitalize="none"
              value={username}
              placeholder="user Name"
              onChangeText={(username) => setUserName(username)}
            />
          </View>
          <View className="overflow-hidden mb-5 w-full rounded-lg py-4 px-2 bg-white shadow-xl">
            <TextInput
              className="w-full"
              autoCapitalize="none"
              value={emailAddress}
              placeholder="E-mail Address"
              onChangeText={(email) => setEmailAddress(email)}
            />
          </View>
          <View className="overflow-hidden mb-5 w-full rounded-lg py-4 px-2 bg-white shadow-xl">
            <TextInput
              className="w-full"
              value={password}
              placeholder="password"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          {/* Create Account */}
          <TouchableOpacity 
            className="bg-secondary w-fit flex-row-reverse p-3 rounded-lg shadow"
            onPress={onSignUpPress}>
            <Text className="text-white text-center font-cairoMedium ml-1">انشاء حساب</Text>
            <Icon name="arrow-back-outline" size={25} color={'#fff'}/>
          </TouchableOpacity>
        </View>
      </View>
      )}
      {pendingVerification && (
        <View className="flex-1 justify-center items-center p-5 dark:bg-black">
          <Text className="mb-4 text-lg font-cairoBold dark:text-whitegray">تم إرسال الرمز الى حسابك</Text>
          <View className="mb-5 w-full">
            <TextInput
              className=" p-3 rounded-lg shadow-lg bg-white "
              value={code}
              placeholder="اكتب رمز التأكيد"
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity 
            className="bg-secondary py-3 px-6 rounded-lg shadow-2xl mb-5"
            onPress={onPressVerify}>
            <Text className="text-white text-center font-cairoMedium">تأكيد الايميل</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}