import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './app/navigation/Navigation';
import 'react-native-gesture-handler';
import StackNavigation from './app/navigation/Navigation';
import 'react-native-gesture-handler';
import Login from './app/screen/Login';

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
    // <Login/>
  );
};

export default App;
