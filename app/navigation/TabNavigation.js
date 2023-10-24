import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Home from '../screen/Home';
import Close from '../screen/Close';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tabs = createMaterialBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/Images/home.png')}
              style={{height: 20, width: 40, resizeMode: 'contain',tintColor:color}}
            />
          ),
        }}
      />
      <Tabs.Screen name="Close" component={Close} options={{
          tabBarLabel: 'Close',
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/Images/list.png')}
              style={{height: 20, width: 40, resizeMode: 'contain',tintColor:color}}
            />
          ),
        }}
         />
    </Tabs.Navigator>
  );
};

export default TabNavigation;
