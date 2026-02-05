import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/Home'
import { FontAwesome5 } from '@expo/vector-icons';
import FavoritesScreen from '../screens/Favorites';
import TabBar from '../components/TabBar';
import { Text, View } from 'react-native';
import TabHeader from '../components/TabHeader';
import MapScreen from '../screens/Map';

export type RootTabParamList = {
  Root: undefined,
  home: undefined,
  favorites: undefined,
  map: undefined
}

const Tab = createBottomTabNavigator<RootTabParamList>()

const AppRoutes = () => {
  return (
    <Tab.Navigator id="main-tabs"
      screenOptions={{
        headerShown: false,
        tabBarPosition: 'bottom',
        animation: 'fade',

      }}
      initialRouteName='home'
      tabBar={(props) => <TabBar {...props} />}

    >

      <Tab.Screen name="favorites" component={FavoritesScreen} options={{
        tabBarLabel: "Favoritos",
        headerShown: true,
        header: (props) => (<TabHeader {...props} />)
      }} />
      <Tab.Screen name="home" component={HomeScreen} options={{
        tabBarLabel: "Praias",
        // headerShown: true,
        // header: (props) => (<TabHeader {...props} />)
      }} />


      <Tab.Screen name="map" component={MapScreen} options={{
        tabBarLabel: "Mapa",
        headerShown: true,
        header: (props) => (<TabHeader {...props} />)

      }} />

    </Tab.Navigator>
  )
}

export default AppRoutes