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
    <View  className=" flex-1  pt-10  bg-slate-200 dark:bg-black">
      {/* Header Section */}
      <View className='px-4 mt-5 w-full flex-row-reverse justify-between items-center h-[40] '>
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
      <View className=' pt-5 bg-white dark:bg-[#111] flex-1 mt-5 shadow-sm rounded-t-[30]'>
        {/* profile */}
        {isSignedIn &&
        <View className="flex-row-reverse justify-between items-center p-4 ">
          <Text className="font-cairoRegular text-md dark:text-whitegray">الملف الشخصي</Text>
          <Icon 
              className='' 
              name={'chevron-back-outline'} 
              onPress={()=>router.push('/profile')} 
              size={25} 
              color={colorScheme=='dark' ?'white':'black'} 
          />
        </View>}
        {/* Separator */}
        {isSignedIn &&<View className='border-b border-gray-500'></View>}
        {/* dark mode */}
        <View className="flex-row-reverse justify-between items-center p-4 ">
          <Text className="font-cairoRegular text-md dark:text-whitegray">الوضع المظلم</Text>
          <Icon className='' 
            name={colorScheme=='dark' ?'sunny-outline':'moon-outline'} 
            onPress={()=>toggleTheme()} size={25} 
            color={colorScheme=='dark' ?'white':'black'} 
          />
        </View>
        {/* Separator */}
        <View className='border-b border-gray-500'></View>
        {/* Notifications */}
        <View className="flex-row-reverse justify-between items-center px-4 py-2">
          <Text className="font-cairoRegular text-md dark:text-whitegray">تفعيل الاشعارات</Text>
          <Switch value={true}/>
        </View>
        {/* Separator */}
        <View className='border-b border-gray-500'></View>
        {/* About Us */}
        <View className="flex-row-reverse justify-between items-center p-4 ">
          <Text className="font-cairoRegular text-md dark:text-whitegray">من نحن</Text>
          <Icon 
              className='' 
              name={'chevron-back-outline'} 
              onPress={()=>router.push('/about')} 
              size={25} 
              color={colorScheme=='dark' ?'white':'black'} 
          />
        </View>
        {/* Separator */}
        <View className='border-b border-gray-500'></View>
        {/* Privacy Policy */}
        <View className="flex-row-reverse justify-between items-center p-4 ">
          <Text className="font-cairoRegular text-md dark:text-whitegray">سياسة الخصوصية</Text>
          <Icon 
            className='' 
            name={'chevron-back-outline'} 
            onPress={()=>router.push('/privacyPolicy')} 
            size={25} 
            color={colorScheme=='dark' ?'white':'black'} 
          />
        </View>
        {/* Separator */}
        <View className='border-b border-gray-500'></View>
        {/* Support us */}
        <View className="flex-row-reverse justify-between items-center p-4 ">
          <View className='flex-row items-center' >
            <Icon 
              
              name={'heart'} 
              size={25} 
              color={'red'} 
            />
            <Text className="font-cairoRegular text-md dark:text-whitegray ml-2">ادعمنا لتقديم المزيد</Text>
          </View>
          <View className='flex-row w-[60] justify-between items-center'>
            <Icon 
              className='' 
              name={'chevron-back-outline'} 
              // onPress={()=>router.push('/supportUs')} 
              size={25} 
              color={colorScheme=='dark' ?'white':'black'} 
            />
          </View>
        </View>
        {/* Separator */}
        <View className='border-b border-gray-500'></View>
        {/* Rate the app */}
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
        {/* Separator */}
        <View className='border-b border-gray-500'></View>
        {/* Invite a friend */}
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
        {/* Separator */}
        <View className='border-b border-gray-500 '></View>
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
      <StatusBar style={colorScheme=="dark"? "light": "dark"} />
    </View>
  )
}
      // {/* <View className="mt-24 p-3  flex-row-reverse items-center justify-between">

      //   <View className="flex-row-reverse items-center justify-start">
      //     {isSignedIn && 
      //       <Image className='w-[50] h-[50] ml-3 rounded-full' source={{uri : user.imageUrl }}/> 
      //     }
      //     <View>
      //       <Text className="text-lg text-right text-black font-cairoRegular dark:text-white">{isSignedIn ?user.fullName : 'ياهلا بالضيف'}</Text>
      //       {!isSignedIn && <Text className="text-sm text-darkgray font-cairoLight mt-1 dark:text-whitegray">سجل دخول واستمتع بأفضل تجربة</Text>}
      //       {isSignedIn && <Text className="text-sm text-darkgray font-cairoLight dark:text-whitegray">{user.primaryEmailAddress.emailAddress}</Text>}
      //     </View>
      //   </View>
      //   {isSignedIn &&
      //   <Link href='(modals)/profile'>
      //     <Icon name="caret-back-circle-outline" size={30} color={'#FE7574'}/>
      //   </Link>}
      // </View> */}
      // {/* Actions */}
      // {/* <View className='mt-10'>
      //   <Text className="text-lg mb-3 text-black font-cairoRegular dark:text-white">الاعدادات</Text>
      //   <View className="flex-row-reverse justify-between items-center bg-white dark:bg-blackdark p-3 mb-3 rounded-md shadow">
      //     <Text className="font-cairoRegular text-md dark:text-whitegray">الدارك مود</Text>
      //     <View className='flex-row w-[60] justify-between items-center'>
      //       <Icon className='transition' name={colorScheme=='dark' ?'sunny-outline':'moon-outline'} onPress={()=>toggleTheme()} size={25} color={colorScheme=='dark' ?'white':'black'} />
      //     </View>
      //   </View>
      //   <View className="flex-row-reverse justify-between items-center bg-white dark:bg-blackdark p-3 mb-3 rounded-md shadow">
      //     <Text className="font-cairoRegular text-md dark:text-whitegray">تفعيل الاشعارات</Text>
      //     <Switch/>
      //   </View>
      // </View> */}
      // {/* Informations */}
      // <View className="">
      //   <Text className="text-lg mb-3 text-black font-cairoRegular dark:text-white">المعلومات</Text>
        
      //   {/*About Us */}
      //   <TouchableOpacity
      //     onPress={()=>router.navigate('/about')}
      //     className=""
      //   >
      //   <Text className="font-cairoRegular text-md dark:text-whitegray">من نحن</Text>
      //   </TouchableOpacity>
      //   {/*privacy policy */}
      //   <TouchableOpacity
      //     onPress={()=>router.navigate('/privacyPolicy')}
      //     className=""
      //   >
      //   <Text className="font-cairoRegular text-md dark:text-whitegray">سياسة الخصوصية</Text>
      //   </TouchableOpacity>
      // </View>
      // {/* Login & Logout Btn */}
      // <View className=' mb-3 rounded-md   '>
      // {isSignedIn ?
      // <TouchableOpacity
      //   className="flex-row items-center justify-end  p-3 mt-5 rounded-md shadow bg-white dark:bg-blackdark"
      //   onPress={()=> signOut()}
      // >
      //   <Text className="text-red dark:text-secondary font-cairoMedium mr-1">تسجيل خروج</Text>
      //   <Icon name={'log-out-outline'} size={30} color={colorScheme=='dark'? '#FE7574' :'red'} />
      // </TouchableOpacity> : 
      // <TouchableOpacity 
      //   className="flex-row items-center justify-end bg-white p-3 mt-5 rounded-md shadow dark:bg-blackdark" 
      //   onPress={()=>router.push('(modals)/login')}
      // >
      //   <Text className="font-cairoMedium mr-1 dark:text-whitegray">تسجيل دخول</Text>
      //   <Icon name={'log-in-outline'} size={30} color={'#FE7574'} />
      // </TouchableOpacity>} 
      // </View>
      // <StatusBar style={colorScheme=="dark"? "light": "dark"} />