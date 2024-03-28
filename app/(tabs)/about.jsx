import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';
import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import LoginPage from '../(modals)/login';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
const About = () => {
  const {isSignedIn} = useAuth()
  return (
    <View className="flex-1 items-center justify-center bg-slate-200 dark:bg-black">
      <SignedIn>
        <View>
          <Text className='dark:text-white'>About</Text>
        </View>
      </SignedIn>
      <SignedOut>
      <TouchableOpacity
        onPress={()=>router.push('(modals)/login')}
      >
        <Text className="bg-red dark:bg-secondary text-white rounded-sm shadow-lg p-3">يرجى تسجيل الدخول لمشاهدة الصفحة</Text>
      </TouchableOpacity>
      </SignedOut>
    </View>
  );
}

export default About;
