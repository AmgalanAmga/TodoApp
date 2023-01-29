import React from 'react';
import TodoApp from './screen/TodoApp';
import MovieApp from './screen/MovieApp';
import SunAndMoon from './screen/SunAndMoon';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: '#19233A' },
          tabBarInactiveTintColor: '#818595',
          tabBarActiveTintColor: '#8C85ED',
        }}
      >
        <Tab.Screen name="TodoApp" component={TodoApp} />
        <Tab.Screen name="MovieApp" component={MovieApp} />
        <Tab.Screen name="SunAndMoon" component={SunAndMoon} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
