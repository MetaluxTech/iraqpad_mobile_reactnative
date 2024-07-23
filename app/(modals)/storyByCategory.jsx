import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Modal } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import CardByCategory from '../../components/CardByCategory';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../common/ThemeProvider';

const Page = () => {
  const [selected, setSelected] = useState("");
  const [stories, setStories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const { title, id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const { colorScheme } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [storiesResponse, subCategoriesResponse] = await Promise.all([
        axios.get(`https://www.iraqpad.com/api/story?order=created_at&categoryId=${id}`),
        axios.get('https://www.iraqpad.com/api/subCategory?order=created_at')
      ]);

      const filteredStories = storiesResponse.data.allStories.filter(
        story => story.categoryId === id && story.status === 'Published'
      );
      setStories(filteredStories);
      setSelected("التصنيفات")
      const filteredSubCategories = subCategoriesResponse.data.filter(
        item => item.categoryId === id
      );
      setSubCategories(filteredSubCategories);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubCategoryPress = (text) => {
    setModalVisible(false);
    axios.get(`https://www.iraqpad.com/api/story?order=created_at&subcategory=${text}`).then((response) => {
      const filteredStories = response.data.allStories.filter(
        story => story.subcategory.title === text && story.categoryId === id && story.status === 'Published'
      );
      setStories(filteredStories);
      setSelected(text);
    });
  };

  if (isLoading) {
    return (
      <View className='flex-1 w-full h-full justify-center items-center dark:bg-black'>
        <ActivityIndicator size='large' color='red' />
        <Text className='font-cairoRegular text-black dark:text-whitegray text-center w-full'>يتم تحميل {title} ...</Text>
      </View>
    );
  }

  return (
    <View className='flex-1 pt-10 bg-slate-200 dark:bg-black'>
      <View className='px-4 mb-10 mt-5 w-full flex-row-reverse justify-between items-center h-[50]'>
        <Text className='text-xl text-black font-cairoBold dark:text-white'>{title}</Text>
        <TouchableOpacity
          className="border border-[#333] dark:border-[#585757] p-2 rounded-xl"
          onPress={() => router.back()}
        >
          <Icon name='arrow-back-outline' size={20} color={colorScheme === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>

      <View className="flex-row-reverse w-full px-2 mb-5">
        <TouchableOpacity
          className='ml-2 h-[45px] border-black dark:border-white border px-4 py-2 rounded-lg'
          onPress={fetchData}
        >
          <Text className="font-cairoMedium text-black dark:text-white px-4">الكل</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="ml-2 h-[45px] border-black dark:border-white border px-4 py-2 rounded-lg"
          onPress={() => setModalVisible(true)}
        >
          <Text className="font-cairoMedium text-black dark:text-white px-4">
            {selected }
          </Text>
        </TouchableOpacity>

        <Modal transparent={true} visible={modalVisible} animationType="slide">
          <View className="bg-white dark:bg-[#111] shadow-sm rounded-t-[30px] pt-5 h-[90vh] absolute bottom-0">
            <View className='px-4 mt-2 w-full flex-row-reverse justify-between items-center h-[40px]'>
              <Text className="text-xl text-right font-cairoBold text-black dark:text-white">كل التصنيفات</Text>
              <TouchableOpacity className='border border-[#333] dark:border-[#585757] rounded-full p-2' onPress={() => setModalVisible(false)}>
                <Icon name='arrow-back-outline' size={20} color={colorScheme === 'dark' ? 'white' : 'black'} />
              </TouchableOpacity>
            </View>
            <View className="py-3 px-3 mt-5 mb-10">
              {subCategories.length > 0 ? (
                <FlatList
                  data={subCategories}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <View className="mb-3">
                      <TouchableOpacity
                        className="bg-secondary w-full py-3 px-6 flex-row justify-center items-center rounded-md shadow"
                        onPress={() => handleSubCategoryPress(item.title)}
                      >
                        <Text className='text-white font-cairoRegular'>{item.title}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              ) : (
                <Text className="font-cairoBold mt-5 text-xl text-center dark:text-white">لا توجد تصنيفات</Text>
              )}
            </View>
          </View>
        </Modal>
      </View>

      <View className="flex-1 px-2 pb-5">
        {stories.length > 0 ? (
          <CardByCategory story={stories} />
        ) : (
          <Text className="font-cairoBold mt-5 text-xl text-center dark:text-white">لا توجد {title}</Text>
        )}
      </View>
    </View>
  );
};

export default Page;
