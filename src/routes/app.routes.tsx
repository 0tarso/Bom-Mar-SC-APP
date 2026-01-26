import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/Home'
import { FontAwesome5 } from '@expo/vector-icons';
import FavoritesScreen from '../screens/Favorites';

export type RootTabParamList = {
  Root: undefined,
  home: undefined,
  favorites: undefined
}

const Tab = createBottomTabNavigator<RootTabParamList>()

const AppRoutes = () => {
  return (
    <Tab.Navigator id="main-tabs"
      screenOptions={{
        headerShown: false
      }}
    >

      <Tab.Screen name="home" component={HomeScreen} options={{
        tabBarLabel: "Praias",
        tabBarIcon: (props) => <FontAwesome5 name="umbrella-beach" size={24} color="black" />
      }} />

      <Tab.Screen name="favorites" component={FavoritesScreen} options={{
        tabBarLabel: "Favoritos",
        tabBarIcon: (props) => <FontAwesome5 name="heart" size={24} color="black" />
      }} />

    </Tab.Navigator>
  )
}

export default AppRoutes