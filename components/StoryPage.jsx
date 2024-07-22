import { View, Text, Image, Dimensions } from 'react-native'
import React, { memo } from 'react'
import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import HTML from 'react-native-render-html';
const { width } = Dimensions.get('window')
const StoryPage = ({ item, part, colorScheme, setActiveModalPart, setActiveModalPartStory }) => {
    // Get The Date Of Punlish This Story
    const create_at = item.created_at
    const dateObject = new Date(create_at);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    return (
        <View>
            <View className='relative'>
                <Image
                    className="h-[250] w-full"
                    source={{ uri: item.picture }}
                    resizeMode='cover'
                />
                <LinearGradient
                    className="absolute bottom-0 w-full h-full"
                    colors={['transparent', 'rgba(0,0,0,0.9)']}
                />
                <View className="absolute bottom-4 right-3 flex-row-reverse justify-between px-4 w-full">
                    {/* <View className='flex-row items-center '>
            <Text className='text-white text-lg mr-2'>{rate}</Text>
            <Icon 
              className="" 
              name='star' 
              size={25} 
              color={'yellow'}
            />
          </View> */}
                </View>
                <View className="absolute top-12 left-0 z-50 px-4 flex-row justify-between w-full">
                    {/* Back */}
                    <TouchableOpacity
                        className="bg-white p-3 rounded-full"
                        onPress={() => {
                            router.navigate('/');
                            setActiveModalPartStory(false);
                            setActiveModalPart(false)

                        }}
                    >
                        <Icon
                            className=" "
                            name='arrow-back-outline'
                            size={20}
                            color={'red'}
                        />
                    </TouchableOpacity>
                    {/* Parts */}
                    {part.length > 0 && <TouchableOpacity
                        className="bg-white p-3 rounded-full"
                        onPress={() => setActiveModalPartStory(true)}
                    >
                        <Icon
                            className=" "
                            name='grid-outline'
                            size={20}
                            color={'red'}
                        />
                    </TouchableOpacity>}
                    {/* favorite */}
                    {/* <TouchableOpacity
            onPress={()=>(
              isSignedIn 
              ? setAddFavorite(!addFavorite) 
              :Alert.alert('تنبيه...','يرجى تسجيل الدخول',[
                {text :'cancel'},
                {text :'login',onPress:()=>router.push('(modals)/login')}
              ])
              )}
          >
            <Icon 
              className=" bg-white p-3 rounded-full" 
              name={addFavorite ?'heart':'heart-outline'}  
              size={20} 
              color={'red'}
            />
          </TouchableOpacity> */}
                </View>
            </View>
            {/* Content */}
            <View className="px-4 py-5 mb-4">
                <Text className="text-2xl font-cairoRegular text-black text-right dark:text-white mb-2">{item.title}</Text>
                {/* Info Of Story */}
                <View className='my-2 '>
                    <Text className='text-sm font-cairoLight text-darkgray text-right dark:text-whitegray'>تم النشر بتاريخ: {formattedDate}</Text>
                </View>
                <HTML
                    contentWidth={width}
                    source={{ html: item.description }}
                    baseStyle={{ color: colorScheme === 'dark' ? '#EDEDED' : '#808080' }}
                />
            </View>
        </View>
    )
}

export default StoryPage