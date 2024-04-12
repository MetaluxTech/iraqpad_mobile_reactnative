import { View, Text, TouchableOpacity, Image, Switch } from 'react-native'
import React, { useContext } from 'react'
import { useAuth,useUser } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from '../../common/ThemeProvider';
export default function Page() {
  const { colorScheme,toggleTheme} = useContext(ThemeContext)
  const { user } = useUser();
  const {signOut ,isSignedIn} = useAuth();
  return (
    <View  className=" flex-1 relative pt-10 px-4 bg-slate-200 dark:bg-black">
      {/* Close Button */}
      <TouchableOpacity
          onPress={()=>router.navigate('/')}
          className="absolute top-10 left-5 z-10  p-3 rounded-full"
      >
        <Icon name={'arrow-back-outline'} size={30} color={colorScheme=='dark' ?'white':'black'} />
      </TouchableOpacity>
      {/* Header Style */}
      <View className="mt-24 p-3  flex-row-reverse items-center justify-between">
        {/* Image & name */}
        <View className="flex-row-reverse items-center justify-start">
          {isSignedIn && 
            <Image className='w-[50] h-[50] ml-3 rounded-full' source={{uri : user.imageUrl }}/> 
          }
          <View>
            <Text className="text-lg text-right text-black font-cairoRegular dark:text-white">{isSignedIn ?user.fullName : 'ياهلا بالضيف'}</Text>
            {!isSignedIn && <Text className="text-sm text-darkgray font-cairoLight mt-1 dark:text-whitegray">سجل دخول واستمتع بأفضل تجربة</Text>}
            {isSignedIn && <Text className="text-sm text-darkgray font-cairoLight dark:text-whitegray">{user.primaryEmailAddress.emailAddress}</Text>}
          </View>
        </View>
        {isSignedIn &&
        <Link href='(modals)/profile'>
          <Icon name="caret-back-circle-outline" size={30} color={'#FE7574'}/>
        </Link>}
      </View>
      {/* Actions */}
      <View className='mt-10'>
        <Text className="text-lg mb-3 text-black font-cairoRegular dark:text-white">الاعدادات</Text>
        {/* DarkMode */}
        <View className="flex-row-reverse justify-between items-center bg-white dark:bg-blackdark p-3 mb-3 rounded-md shadow">
          <Text className="font-cairoRegular text-md dark:text-whitegray">الدارك مود</Text>
          <View className='flex-row w-[60] justify-between items-center'>
            <Icon className='transition' name={colorScheme=='dark' ?'sunny-outline':'moon-outline'} onPress={()=>toggleTheme()} size={25} color={colorScheme=='dark' ?'white':'black'} />
          </View>
          {/* <Switch className='transition-all' value={colorScheme === "dark"} onValueChange={toggleColorScheme} /> */}
        </View>
        {/* Notifications */}
        <View className="flex-row-reverse justify-between items-center bg-white dark:bg-blackdark p-3 mb-3 rounded-md shadow">
          <Text className="font-cairoRegular text-md dark:text-whitegray">تفعيل الاشعارات</Text>
          <Switch/>
        </View>
      </View>
      {/*  */}
      <View className=' mb-3 rounded-md   '>
      {isSignedIn ?
      <TouchableOpacity
        className="flex-row items-center justify-end  p-3 mt-5 rounded-md shadow bg-white dark:bg-blackdark"
        onPress={()=> signOut()}
      >
        <Text className="text-red dark:text-secondary font-cairoMedium mr-1">تسجيل خروج</Text>
        <Icon name={'log-out-outline'} size={30} color={colorScheme=='dark'? '#FE7574' :'red'} />
      </TouchableOpacity> : 
      <TouchableOpacity 
        className="flex-row items-center justify-end bg-white p-3 mt-5 rounded-md shadow dark:bg-blackdark" 
        onPress={()=>router.push('(modals)/login')}
      >
        <Text className="font-cairoMedium mr-1 dark:text-whitegray">تسجيل دخول</Text>
        <Icon name={'log-in-outline'} size={30} color={'#FE7574'} />
      </TouchableOpacity>} 
      </View>
      <StatusBar style={colorScheme=="dark"? "light": "dark"} />
    </View>
  )
}