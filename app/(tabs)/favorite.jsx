import { View, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router';
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';
import React from 'react'
export default function Page() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-200 dark:bg-black">
      <SignedIn>
        <View>
          <Text className='dark:text-white'>المفضلة</Text>
        </View>
      </SignedIn>
      <SignedOut>
      <TouchableOpacity
        onPress={()=>router.push('(modals)/login')}
      >
        <Text className="bg-secondary dark:bg-secondary text-white rounded-sm shadow-lg p-3">يرجى تسجيل الدخول لمشاهدة الصفحة</Text>
      </TouchableOpacity>
      </SignedOut>
    </View>
  )
}