import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Cadastro from './src/components/Cadastro'
import Lista from './src/components/Lista'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator();
const icons = {
  Cadastro: {
    name: 'pencil'
  },
  Lista: {
    name: 'clipboard-account'
  }
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={ ({route}) => ({
        tabBarIcon: ({ color, size }) => {
          const { name } = icons[route.name];
          return <Icon name={name} color={color} size={size} />
        } 
      }) }
      >
        <Tab.Screen name="Cadastro" component={Cadastro} />
        <Tab.Screen name="Lista" component={Lista} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}