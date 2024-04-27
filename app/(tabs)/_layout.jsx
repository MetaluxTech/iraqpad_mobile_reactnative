
import { Tabs, router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function RootLayoutNav() {
  const {colorScheme} = useColorScheme();
    return (
      <Tabs 
        screenOptions={{
          // headerShown:false,
          tabBarActiveTintColor : 'red',
          tabBarStyle: {
            height:70,
            backgroundColor:colorScheme=="dark"? "black": "#efefef",
        },
        tabBarShowLabel:false,
        }}
        >
          <Tabs.Screen 
            name='index'
            options={{
              headerShown:false,
              tabBarIcon:({focused})=>
              <Icon name={focused ? 'home' : 'home-outline'} size={25} color={focused ? '#FE7574' : '#808080'} />
          }}/>
          <Tabs.Screen 
            name='about'
            options={{
              headerShown:false,
              tabBarIcon:({focused})=>
              <Icon name={focused ? 'people' : 'people-outline'} size={25} color={focused ? '#FE7574' : '#808080'} />
          }}/>
          <Tabs.Screen 
            name='categories'
            options={{
              headerShown:false,
              tabBarIcon:({focused})=>
              <Icon name={focused ? 'library' : 'library-outline'} size={25} color={focused ? '#FE7574' : '#808080'} />
          }}/>
          <Tabs.Screen 
            name='favorite'
            options={{
              headerShown:false,
              tabBarIcon:({focused})=>
              <Icon name={focused ? 'heart' : 'heart-outline'} size={25} color={focused ? '#FE7574' : '#808080'} />
          }}/>
          <Tabs.Screen 
            name='settings'
            options={{
              headerShown:false,
              tabBarIcon:({focused})=>
              <Icon name={focused ? 'settings' : 'settings-outline'} size={25} color={focused ? '#FE7574' : '#808080'} />
          }}/>
          
      </Tabs>
    );
}
  