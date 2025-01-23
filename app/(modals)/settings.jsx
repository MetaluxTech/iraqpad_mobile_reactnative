import { View, Text, TouchableOpacity,StatusBar, Image, Switch } from 'react-native'
import React, { useContext } from 'react'
import { useAuth,useUser } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../common/ThemeProvider';
export default function Page() {
  const { colorScheme,toggleTheme} = useContext(ThemeContext)

  const {signOut ,isSignedIn} = useAuth();
  return (
    <View  className=" flex-1  pt-10  bg-slate-200 dark:bg-black">
      {/* Header Section */}
      <View className='px-4 mt-5 w-full flex-row-reverse justify-between items-center h-[40px] '>
        <Text className='text-xl text-black font-cairoBold dark:text-white'>الاعدادات</Text>
        {/* Close Button */}
        <TouchableOpacity
            onPress={()=>router.navigate('/')}
            className=" border border-[#333] dark:border-[#585757] p-2 rounded-xl"
        >
          <Icon name={'arrow-back-outline'} size={20} color={colorScheme=='dark' ?'white':'black'} />
        </TouchableOpacity>
      </View>
      
      {/* settings container */}
      <View className=' pt-5 bg-white dark:bg-[#111] flex-1 mt-5 shadow-sm rounded-t-[30px]'>
        {/* profile */}
        {/* {isSignedIn &&
        <TouchableOpacity onPress={()=>router.push('/profile')} >
        <View className="flex-row-reverse justify-between items-center p-4 ">
          <Text className="font-cairoRegular text-md dark:text-whitegray">الملف الشخصي</Text>
          <Icon 
              className='' 
              name={'chevron-back-outline'} 
              
              size={25} 
              color={colorScheme=='dark' ?'white':'black'} 
          />
        </View>
        </TouchableOpacity>} */}
        {/* dark mode */}
        <View className="flex-row-reverse justify-between items-center p-4 ">
          <Text className="font-cairoRegular text-md dark:text-whitegray">الوضع المظلم</Text>
          <Icon className='' 
            name={colorScheme=='dark' ?'sunny-outline':'moon-outline'} 
            onPress={()=>toggleTheme()} size={25} 
            color={colorScheme=='dark' ?'white':'black'} 
          />
        </View>
        {/* Notifications */}
        <View className="flex-row-reverse justify-between items-center px-4 py-2 ">
          <Text className="font-cairoRegular text-md dark:text-whitegray">تفعيل الاشعارات</Text>
          <Switch value={true}/>
        </View>
        {/* About Us */}
        <TouchableOpacity onPress={()=>router.push('/about')}>
        <View className="flex-row-reverse justify-between items-center p-4 ">
          <Text className="font-cairoRegular text-md dark:text-whitegray">من نحن</Text>
          <Icon 
              className='' 
              name={'chevron-back-outline'} 
              size={25} 
              color={colorScheme=='dark' ?'white':'black'} 
          />
        </View>
        </TouchableOpacity>
        {/* Privacy Policy */}
        <TouchableOpacity onPress={()=>router.push('/privacyPolicy')} >
          <View className="flex-row-reverse justify-between items-center p-4 ">
            <Text className="font-cairoRegular text-md dark:text-whitegray">سياسة الخصوصية</Text>
            <Icon 
              className='' 
              name={'chevron-back-outline'} 
              size={25} 
              color={colorScheme=='dark' ?'white':'black'} 
            />
          </View>
        </TouchableOpacity>
        {/* Support us */}
        {/* <TouchableOpacity>
          <View className="flex-row-reverse justify-between items-center p-4 ">
            <View className='flex-row-reverse items-center' >
            <Text className="font-cairoBold text-md dark:text-whitegray ml-2">ادعمنا لتقديم المزيد</Text>
              <Icon 
                name={'heart'} 
                size={25} 
                color={'red'} 
              />
            </View>
            <View className='flex-row  justify-between items-center'>
              <Icon 
                className='' 
                name={'chevron-back-outline'} 
                // onPress={()=>router.push('/supportUs')} 
                size={25} 
                color={colorScheme=='dark' ?'white':'black'} 
              />
            </View>
          </View>
        </TouchableOpacity> */}
        {/* Rate the app */}
        {/* <TouchableOpacity>
          <View className="flex-row-reverse justify-between items-center p-4 ">
            <Text className="font-cairoRegular text-md dark:text-whitegray">تقييم التطبيق</Text>
            <Icon 
                className='' 
                name={'chevron-back-outline'} 
                // onPress={()=>router.push('/rateApp')} 
                size={25} 
                color={colorScheme=='dark' ?'white':'black'} 
            />
          </View>
        </TouchableOpacity> */}
        {/* Invite a friend */}
        {/* <TouchableOpacity>
          <View className="flex-row-reverse justify-between items-center p-4 ">
            <Text className="font-cairoRegular text-md dark:text-whitegray">دعوة صديق</Text>
            <Icon 
                className='' 
                name={'chevron-back-outline'} 
                // onPress={()=>router.push('/inviteFriend')} 
                size={25} 
                color={colorScheme=='dark' ?'white':'black'} 
            />
          </View>
        </TouchableOpacity> */}
        {/* Login & Logout Btn */}
        <View className=''>
        {isSignedIn ?
          <TouchableOpacity
            className="flex-row items-center justify-end  p-3 "
            onPress={()=> signOut()}
          >
            <Text className="text-red dark:text-secondary font-cairoMedium mr-1">تسجيل خروج</Text>
            <Icon name={'log-out-outline'} size={30} color={colorScheme=='dark'? '#FE7574' :'red'} />
          </TouchableOpacity> : 
          <TouchableOpacity 
            className="flex-row items-center justify-end  p-3 " 
            onPress={()=>router.push('(modals)/login')}
          >
            <Text className="font-cairoMedium mr-1 dark:text-whitegray">تسجيل دخول</Text>
            <Icon name={'log-in-outline'} size={30} color={'#FE7574'} />
          </TouchableOpacity>} 
        </View>
      </View>
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />

    </View>
  )
}