import { View, Dimensions, Text, Image, StatusBar } from 'react-native'
import React from 'react'
import Carousel , { ParallaxImage }  from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window')
export default function SliderImage({sliderIamge}) {
  return (
    <View className=' mb-3 mr-4'>
        <Carousel
          data={sliderIamge}
          loop={false}
          autoplay={true}
          autoplayInterval={4000}
          hasParallaxImages={true} //
          renderItem={ItemCard}
          firstItem={1}
          itemWidth={width}
          sliderWidth={width}
          slideStyle={{display: 'flex', alignItems: 'center'}}
        />
    </View>
  )
}
const ItemCard= ({item , index},parallaxProps)=>{
  return(
      <View className='w-full h-[250]' >
        <ParallaxImage
          source={{uri : item.picture}}
          containerStyle={{flex:1}}
          style={{resizeMode:'contain', width:'100%', height:'100%'}}
          parallaxFactor={1}
          {...parallaxProps}
        />
        <LinearGradient
          className="absolute bottom-0 w-full h-full"
          colors={['transparent', 'rgba(0,0,0,.9)']}
        />
        <View className="absolute bottom-3 right-5">
          <Text className="text-white text-xl font-cairoBold">{item.title}</Text>
        </View>
      </View>
  )
}