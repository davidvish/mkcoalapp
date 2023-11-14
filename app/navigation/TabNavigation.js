import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TabsList from '../screen/home/TabsList';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';


const Tabs = createMaterialTopTabNavigator();

export const TabNavigation = () => {
  return(
   <Tabs.Navigator>
     <Tabs.Screen name='Open' component={TabsList} />
     <Tabs.Screen name='Close' component={TabsList} />
   </Tabs.Navigator>
  )
 
 };

export default TabNavigation

const styles = StyleSheet.create({})