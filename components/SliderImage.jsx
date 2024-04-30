import { View, Dimensions, Text, Image, StatusBar } from 'react-native'
import Carousel , { ParallaxImage }  from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
const { height, width } = Dimensions.get('window')
export default function SliderImage({sliderIamge}) {
  return (
    <View className=' mb-3 mr-4'>
        <Carousel
          data={sliderIamge}
          loop={true}
          autoplay={true}
          autoplayInterval={4000}
          hasParallaxImages={true} //
          renderItem={ItemCard}
          firstItem={-1}
          inverted={false}
          itemWidth={width-70}
          sliderWidth={width}
          slideStyle={{display: 'flex', alignItems: 'center' }}
        />
    </View>
  )
}
const ItemCard= ({item , index},parallaxProps)=>{
  return(
      <View className='w-full h-[250] rounded-lg' >
        {item.picture &&<ParallaxImage
          source={{uri : item.picture}}
          containerStyle={{flex:1,borderRadius:'20px'}}
          style={{resizeMode:'cover', width:width, height:'100%',}}
          parallaxFactor={0.4}
          {...parallaxProps}
        />}
        <LinearGradient
          className="absolute bottom-0 w-full h-full rounded-[10px]"
          colors={['transparent', 'rgba(0,0,0,.9)']}
        />
        <View className="absolute bottom-3 right-5">
          <Text className="text-white text-xl font-cairoBold">{item.title}</Text>
        </View>
      </View>
  )
}
