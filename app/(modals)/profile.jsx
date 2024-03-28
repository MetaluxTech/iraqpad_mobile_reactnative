
import { useAuth, useUser } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Profile = () => {
  const { isLoaded ,user ,isSignedIn ,hasImage  } = useUser();
  const [photo, setPhoto] = useState(null);
  useEffect(() => {
    retrievePhoto();
  }, []);
  // Change Photo
  const changePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      await storePhoto(result.assets[0].uri);
      setPhoto(result.assets[0].uri);
    }
  };
  const retrievePhoto = async () => {
    try {
      const storedPhoto = await AsyncStorage.getItem('photo');
      if (storedPhoto !== null) {
        setPhoto(storedPhoto);
      }
    } catch (error) {
      console.error('Error retrieving photo:', error);
    }
  };
  const storePhoto = async (imageUri) => {
    try {
      await AsyncStorage.setItem('photo', imageUri);
    } catch (error) {
      console.error('Error storing photo:', error);
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
        {hasImage ? 
          <View className='relative'>
            <Image className='w-[100] h-[100] rounded-full' alt={user.fullName} source={{uri :user.imageUrl}}/> 
            <TouchableOpacity 
              className='bg-secondary p-1 rounded-full shadow-md absolute bottom-0 left-0 z-30' 
              onPress={changePhoto}
              >
              <Icon name="add-outline" size={25} color={'black'}/>
            </TouchableOpacity>
          </View> :
          <View className='relative'>
          <Image className='w-[100] h-[100] rounded-full' alt={user.fullName} source={{uri :photo? photo : user.imageUrl}}/> 
          <TouchableOpacity 
            className='bg-secondary p-1 rounded-full shadow-md absolute bottom-0 left-0 z-30' 
            onPress={changePhoto}
            >
            <Icon name="add-outline" size={25} color={'black'}/>
          </TouchableOpacity>
        </View>
        }
          
        
        {isSignedIn && 
        <Text className="font-cairoRegular text-black dark:text-whitegray text-lg">{user.fullName}</Text>
        }
        </View>
      </View>
      {/* User Informations */}
      <View className=' flex-1 justify-start  px-2'>
        <Text className="text-black font-cairoBold dark:text-whitegray">المعلومات</Text>
        {/* First Name */}
        <View className='flex-row-reverse items-center bg-whitegray dark:bg-blackdark shadow-md p-3 rounded-lg mt-4'>
          <Text className="font-cairoRegular text-darkgray  ml-2">الاسم الاول : </Text>
          {isSignedIn &&<Text className='font-cairoMedium dark:text-whitegray'>{user.firstName}</Text>}
        </View>
        {/* Last Name */}
        <View className='flex-row-reverse items-center bg-whitegray dark:bg-blackdark shadow-md p-3 rounded-lg mt-4'>
          <Text className="font-cairoRegular text-darkgray ml-2">الاسم الاخير : </Text>
          {isSignedIn &&<Text className='font-cairoMedium dark:text-white'>{user.lastName}</Text>}
        </View>
        {/* Last Name */}
        <View className='flex-row-reverse items-center bg-whitegray dark:bg-blackdark shadow-md p-3 rounded-lg mt-4'>
          <Text className="font-cairoRegular text-darkgray ml-2"> اليوزر نيم : </Text>
          {isSignedIn &&<Text className='font-cairoMedium dark:text-white'>{user.username}</Text>}
        </View>
        {/* Email */}
        <View className='flex-row-reverse items-center bg-whitegray dark:bg-blackdark shadow-md p-3 rounded-lg mt-4'>
          <Text className="font-cairoRegular text-darkgray ml-2">الايميل : </Text>
          {isSignedIn &&<Text className='dark:text-whitegray'>{user.primaryEmailAddress.emailAddress}</Text>}
        </View>
        {/* Update Informations */}
        <TouchableOpacity
          className="mt-3 bg-[#148DFF] p-3 rounded-sm"
          onPress={()=>router.navigate('(modals)/update')}
        >
          <Text className="text-white text-center font-cairoRegular">تحديث معلوماتك</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style={"light"} />
  </View>
  )}
export default Profile