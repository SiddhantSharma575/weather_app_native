/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import type { Node } from 'react'
import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
} from 'react-native'

import Search from './screens/Search'
import Home from './screens/Home'
import Country from "./screens/Country"
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();

const App = () => {
   return (
      <>
         <StatusBar barStyle="dark-content" backgroundColor="#00aaff" />
         <NavigationContainer>
            <Tab.Navigator
               screenOptions={({ route }) => ({
                  tabBarIcon: ({ color }) => {
                     let iconName;
                     if (route.name === 'home') {
                        iconName = 'home-city-outline'
                     } else if (route.name === 'search') {
                        iconName = 'city'
                     } else if (route.name === "country") {
                        iconName = 'flag-outline'
                     }
                     return (
                        <MaterialCommunityIcons
                           name={iconName}
                           size={25}
                           color={color}
                        />
                     )
                  },
               })}
               tabBarOptions={{
                  activeTintColor: 'white',
                  inactiveTintColor: 'gray',
                  activeBackgroundColor: '#00aaff',
                  inactiveBackgroundColor: '#00aaff',
               }}>
               <Tab.Screen
                  name="country"
                  component={Country}
                  options={{ headerShown: false }}
               />
               <Tab.Screen
                  name="home"
                  component={Home}
                  options={{ headerShown: false }}
                  initialParams={{ city: 'indore' }}
               />
               <Tab.Screen
                  name="search"
                  component={Search}
                  options={{ headerShown: false }}
               />
            </Tab.Navigator>
         </NavigationContainer>
      </>
   )
}

export default App
