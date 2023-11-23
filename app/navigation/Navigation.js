import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screen/splash/Splash';
import CustomTab from './CustomTab';
import AddItem from '../screen/addItem/AddItem';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useRoute} from '@react-navigation/native';

import Header from '../component/Header';
const Tabs = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const StackNavigation = (routesName) => {
  console.log(routesName.name)
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddItem"
        component={AddItem}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomTab"
        component={CustomTab}
        options={{
          headerShown:false
        }}
      />

    </Stack.Navigator>
  );
};

export default StackNavigation;
