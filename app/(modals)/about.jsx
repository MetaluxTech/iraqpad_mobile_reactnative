
import { router } from 'expo-router';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text,StatusBar, TouchableOpacity, Alert, SafeAreaView, ScrollView, Image, Dimensions } from 'react-native';
import { ThemeContext } from '../../common/ThemeProvider';
const { height, width } = Dimensions.get('window')
const About = () => {
  const { colorScheme} = useContext(ThemeContext)
  return (
    <View className="flex-1  pt-10  bg-slate-200 dark:bg-black">
      {/* Header Section */}
      <View className='px-4 mt-5 w-full flex-row-reverse justify-between items-center h-[40] '>
        <Text className='text-xl text-black text-right font-cairoBold dark:text-white'> عراقباد</Text>
        {/* Close Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className=" border border-[#333] dark:border-[#585757] p-2 rounded-xl"
        >
          <Icon name={'arrow-back-outline'} size={20} color={colorScheme == 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>
      <View className=' pt-5 bg-white dark:bg-[#111] flex-1 mt-5 shadow-sm rounded-t-[30]'>
        <ScrollView>
          <View className='p-4'>
            <Text className='font-cairoLight text-right text-lg leading-[2] text-darkgray dark:text-whitegray'>
              أهلا وسهلاً دام وصلت لهنا إذا أنت عندك حب تستكشف وتعرف من وراء قصص عراقية ومن هو المؤسس مرتضى حسن جبار الموسوي – من مواليد 1997 عملت في كثير من الأعمال المهنية لكن لم ولن ينطفئ حبي للقصص والروايات و هذا الحب تحول إلى حقيقة بعد اكثر من ١٢ سنة اجتهاد في العمل أنا الان اعمل في مؤسسة حكومية وأيضا انا معكم في قصص عراقية سوف نكون معاً دائما حيث تكون القصة يكون سيد مرتضى
              الأهداف وراء إنشاء قصص عراقية: بكل بساطة لم يكن لي مكان للإبداع رغم كثرة المواقع وتوسع الانترنت فقررت ان تكون قصص عراقية هي المنصة الداعمة رسمياً لجميع المبدعين في العراق و الوطن العربي
              . ندعم المبتدئين لتحقيق أهدافهم ندعم المبدعين ليكونوا وجوه بارزة وقصص مؤثره لجميع القراء
              . لدي طموحات كثيرة و أكبرها دعم المستضعفين و بناء دار أيتام لأطفال العراق ممن لم يجد له اب وام يترعرع في كنفهم
              . واخر دعوانا أن الحمد لله رب العالمين والصلاه والسلام على رسول الله محمد وآل بيته الطيبين الطاهرين وصحبه اجمعينأهلا وسهلاً دام وصلت لهنا إذا أنت عندك حب تستكشف وتعرف من وراء قصص عراقية ومن هو المؤسس مرتضى حسن جبار الموسوي – من مواليد 1997 عملت في كثير من الأعمال المهنية لكن لم ولن ينطفئ حبي للقصص والروايات و هذا الحب تحول إلى حقيقة بعد اكثر من ١٢ سنة اجتهاد في العمل أنا الان اعمل في مؤسسة حكومية وأيضا انا معكم في قصص عراقية سوف نكون معاً دائما حيث تكون القصة يكون سيد مرتضى
              الأهداف وراء إنشاء قصص عراقية: بكل بساطة لم يكن لي مكان للإبداع رغم كثرة المواقع وتوسع الانترنت فقررت ان تكون قصص عراقية هي المنصة الداعمة رسمياً لجميع المبدعين في العراق و الوطن العربي
              . ندعم المبتدئين لتحقيق أهدافهم ندعم المبدعين ليكونوا وجوه بارزة وقصص مؤثره لجميع القراء
              . لدي طموحات كثيرة و أكبرها دعم المستضعفين و بناء دار أيتام لأطفال العراق ممن لم يجد له اب وام يترعرع في كنفهم
              . واخر دعوانا أن الحمد لله رب العالمين والصلاه والسلام على رسول الله محمد وآل بيته الطيبين الطاهرين وصحبه اجمعين
            </Text>
            {/* <Image className='w-full h-[200px] my-4' source={require('../../assets/images/about.jpg')} /> */}
          </View>
          <View className='w-[90%] border-b border-darkgray dark:border-whitegray mx-auto' />
          <View className='p-4 pt-4'>
            <Text className='text-xl text-black text-right font-cairoBold dark:text-white'>مؤسس عراقباد</Text>
            <View className='w-full flex-col justify-center items-center py-4 px-2'>
              <Image className='w-[100px] h-[100px] rounded-full ' source={require('../../assets/images/about.jpg')} alt='مرتضى الموسوي' />
              <Text className=' text-black font-cairoBold dark:text-white py-2'>مرتضى الموسوي</Text>
              <Text className='font-cairoLight text-center text-sm leading-[2] text-darkgray dark:text-whitegray'>
                مرتضى حسن جبار الموسوي – من مواليد 1997 عملت في كثير من الأعمال المهنية لكن لم ولن ينطفئ حبي للقصص والروايات و هذا الحب تحول إلى حقيقة بعد اكثر من ١٢ سنة اجتهاد في العمل أنا الان اعمل في مؤسسة حكومية وأيضا انا معكم في قصص عراقية سوف نكون معاً دائما حيث تكون القصة يكون سيد مرتضى
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />

    </View>
  );
}

export default About;
