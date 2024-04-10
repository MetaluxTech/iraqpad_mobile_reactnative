import { View, Dimensions, Text, Image, StatusBar } from 'react-native'
import React from 'react'
import Carousel , { ParallaxImage }  from 'react-native-snap-carousel';

const { height, width } = Dimensions.get('window')
export default function SliderImage({image}) {
  return (
    <View className=' mb-3 mr-4'>
      
        <Carousel
          data={image}
          loop={true}
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
      <View  style={{width:width ,height:200}} >
        <ParallaxImage
          source={item}
          containerStyle={{flex:1}}
          style={{resizeMode:'cover' , width:width }}
          parallaxFactor={1}
          {...parallaxProps}
        />
        <View className="absolute bottom-3 right-5">
          <Text className="text-white text-xl font-cairoBold">قصص واقعية</Text>
        </View>
      </View>
  )
}