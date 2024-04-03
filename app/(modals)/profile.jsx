
import { useAuth, useUser } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { useColorScheme } from 'nativewind';
const Profile = () => {
  const {colorScheme} = useColorScheme();
  const { user} = useUser();
  const [firstName , setFirstName] = useState(user.firstName); 
  const [lastName , setLastName] = useState(user.lastName);
  const [username , setUserName] = useState(user.username);
  const [email , setEmail] = useState(user.emailAddresses[0].emailAddress);
  const [edit , setEdit] = useState(false);

  useEffect(()=>{
    if(!user) return;
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setUserName(user.username);
    setEmail(user.emailAddresses[0].emailAddress);
  },[user])

  // Update User Information
  const onSaveUser = async () =>{
    try{  
      if(!firstName || !lastName || !username  ) return;
      await user.update({
        firstName,
        lastName,
        username
      }
      )}catch(error){
        console.log(error)
    }finally{
      setEdit(false);
    }
  }
  // Change Photo
  const changePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    });
    if (!result.canceled) {
      const base64 =`data:image/png;base64,${result.assets[0].base64}`
      user.setProfileImage({
        file:base64
      })
    }
  };

  return (
  <View className="flex-1 bg-slate-200 dark:bg-black">
      {/* Header Style */}
      <View className='flex pt-20 h-[250] justify-center '>
        {/* Close Button */}
        <TouchableOpacity
          onPress={()=>router.back()}
          className="absolute top-10 left-5 z-20  p-2 rounded-full bg-seashell"
        >
          <Icon name={'arrow-back-outline'} size={20} color={'#000'} />
        </TouchableOpacity>
        {/* Photo User And Name*/}
        <View className='gap-y-1 flex-col items-center justify-center  w-full  '>
          <View className='relative'>
            <Image 
              className='w-[100] h-[100] rounded-full' 
              alt={user.fullName} 
              source={{uri :user.imageUrl}}
            /> 
            {edit ? (''):(
            <TouchableOpacity 
              className='bg-secondary p-1 rounded-full shadow-md absolute bottom-0 left-0 z-30' 
              onPress={changePhoto}
              >
              <Icon name="camera-outline" size={20} color={'white'}/>
            </TouchableOpacity>
            )}
          </View>
          <Text className="font-cairoRegular text-black dark:text-whitegray text-lg">{user.fullName}</Text>
        </View>
      </View>
      {/* User Informations */}
      {!edit ? (
      <View className=' flex-1 justify-start  px-2'>
        <Text className="text-black text-xl font-cairoBold dark:text-whitegray">المعلومات</Text>
        {/* First Name */}
        <View 
          className='overflow-hidden flex-row-reverse items-center bg-whitegray dark:bg-blackdark shadow p-3 rounded-lg mt-4'>
          <Text className="font-cairoRegular text-darkgray  ml-2">الاسم الاول : </Text>
          <Text className='font-cairoMedium  dark:text-whitegray'>{firstName}</Text>
        </View>
        {/* Last Name */}
        <View  className='flex-row-reverse items-center bg-whitegray dark:bg-blackdark shadow p-3 rounded-lg mt-4'>
          <Text className="font-cairoRegular text-darkgray ml-2">الاسم الاخير : </Text>
          <Text className='font-cairoMedium  dark:text-whitegray'>{lastName}</Text>
        </View>
        {/* User Name */}
        <View  className='flex-row-reverse items-center bg-whitegray dark:bg-blackdark shadow-md p-3 rounded-lg mt-4'>
          <Text className="font-cairoRegular text-darkgray ml-2"> اليوزر نيم : </Text>
          <Text className='font-cairoMedium  dark:text-whitegray'>{username}</Text>
        </View>
        {/* Email */}
        <View  className='flex-row-reverse items-center bg-whitegray dark:bg-blackdark shadow p-3 rounded-lg mt-4'>
          <Text className="font-cairoRegular text-darkgray ml-2">الايميل : </Text>
          <Text className='dark:text-whitegray'>{email}</Text>
        </View>
        {/* Update Informations */}
        <TouchableOpacity
          className="flex-row justify-center items-center mt-10 bg-[#148DFF] shadow p-3 rounded-sm"
          onPress={()=>setEdit(true)}
        >
          <Icon className='' name={'create-outline'} size={25} color={'#fff'} />
          <Text className="ml-2 text-white text-center font-cairoRegular">تحديث معلوماتك</Text>
        </TouchableOpacity>
      </View>):(
        <View className=' flex-1 justify-start  px-2'>
        <Text className="text-black text-xl font-cairoBold dark:text-whitegray">تحديث المعلومات</Text>
        {/* First Name */}
        <View 
          
          className='overflow-hidden flex-row-reverse items-center bg-whitegray dark:bg-blackdark shadow p-3 rounded-lg mt-4'>
          <Text className="font-cairoRegular text-darkgray  ml-2">الاسم الاول : </Text>
          <TextInput 
            value={firstName || ''} 
            onChangeText={setFirstName} 
            className=' font-cairoMedium rounded text-darkgray border-darkgray border w-[180] px-2'
          />
        </View>
        {/* Last Name */}
        <View  className='flex-row-reverse items-center bg-whitegray dark:bg-blackdark shadow p-3 rounded-lg mt-4'>
          <Text className="font-cairoRegular text-darkgray ml-2">الاسم الاخير : </Text>
          <TextInput 
            value={lastName || ''} 
            onChangeText={setLastName} 
            className=' font-cairoMedium rounded text-darkgray border-darkgray border w-[180] px-2'
          />
        </View>
        {/* User Name */}
        <View style={styles.shadow} className='flex-row-reverse items-center bg-whitegray dark:bg-blackdark shadow-md p-3 rounded-lg mt-4'>
          <Text className="font-cairoRegular text-darkgray ml-2"> اليوزر نيم : </Text>
          <TextInput 
            value={username || ''} 
            onChangeText={setUserName} 
            className=' font-cairoMedium rounded text-darkgray border-darkgray border w-[180] px-2'
          />
        </View>

        {/* Update Informations */}
        <TouchableOpacity
          className="mt-10 bg-green-600 shadow py-2 rounded-sm flex-row justify-center items-center"
          onPress={onSaveUser}
        >
          <Icon className='' name={'checkmark-outline'} size={30} color={'#fff'} />
        </TouchableOpacity>
      </View>
      )}
      <StatusBar style={colorScheme=="dark"? "light": "dark"} />
  </View>
  )}
export default Profile

const styles = StyleSheet.create({
  shadow :{
    shadowColor:'#808080',
    shadowOffset:{width:10,height:10},
    shadowOpacity:0.4
  }

})


// {edit ? (
//   <View className='w-[230] flex-row-reverse justify-between items-center'>
//     <TextInput 
//       value={lastName || ''} 
//       onChangeText={setLastName} 
//       className=' font-cairoMedium rounded text-darkgray border-darkgray border w-[180] px-2'/>
//     {/* <TouchableOpacity className='bg-[#148DFF] p-1 rounded-full mr-1' onPress={onSaveUser}>
//       <Icon className='' name={'checkmark-outline'} size={20} color={'#fff'} />
//     </TouchableOpacity> */}
//   </View>
// ):(
//   <View className='w-[230] flex-row-reverse justify-between items-center'>
//     <Text className='font-cairoMedium  dark:text-whitegray'>{lastName}</Text>
//     <TouchableOpacity onPress={()=>setEdit(true)}>
//       <Icon className='' name={'create-outline'} size={25} color={'darkgray'} />
//     </TouchableOpacity>
//   </View>
// )
// }