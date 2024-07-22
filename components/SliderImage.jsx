// import { View, Dimensions, Text, Image, StatusBar, TouchableOpacity } from 'react-native'
// import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router } from 'expo-router';
// import Animated, { BounceInDown, BounceInLeft, SlideInLeft } from 'react-native-reanimated';
// const { height, width } = Dimensions.get('window')
// export default function SliderImage({ sliderIamge }) {
//   return (
//     <Animated.View entering={SlideInLeft.delay(400).springify()} className=' mb-3 mr-4'>
//       <Carousel
//         data={sliderIamge}
//         loop={true}
//         autoplay={true}
//         autoplayInterval={4000}
//         hasParallaxImages={true} //
//         renderItem={ItemCard}
//         firstItem={-1}
//         inverted={true}
//         itemWidth={width - 70}
//         sliderWidth={width}
//         slideStyle={{ display: 'flex', alignItems: 'center' }}
//       />
//     </Animated.View>
//   )
// }
// const ItemCard = ({ item, index }, parallaxProps) => {
//   return (
//     <TouchableOpacity
//       onPress={() => router.push({
//         pathname: '/story',
//         params: item
//       })}
//       className='w-full h-[250] rounded-2xl' >
//       {item.picture && <ParallaxImage
//         source={{ uri: item.picture }}
//         containerStyle={{ flex: 1, borderRadius: 16 }}
//         style={{ resizeMode: 'cover', width: width,height: height}}
//         parallaxFactor={0}
//         {...parallaxProps}
//       />}
//       <LinearGradient
//         className="absolute bottom-0 w-full h-full rounded-[10px]"
//         colors={['transparent', 'rgba(0,0,0,.9)']}
//       />
//       <View className="absolute bottom-3 right-5">
//         <Text className="text-white text-xl font-cairoBold">{item.title}</Text>
//       </View>
//     </TouchableOpacity>
//   )
// }
