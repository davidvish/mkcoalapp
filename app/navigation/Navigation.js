import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Home from '../screen/home/Home';
import Close from '../screen/close/Close';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screen/Splash';
import {colors} from '../assets/colors/colors';
import {responsiveHeight as hp} from 'react-native-responsive-dimensions';
import CustomTab from './CustomTab';
import AddItem from '../screen/AddItem';
const Tabs = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

// export const TabNavigation = () => {
//   const [route, setRoute] = useState('home');
//   return (
//     <Tabs.Navigator>
//       <Tabs.Screen
//         listeners={{
//           tabPress: e => {
//             setRoute('home');
//           },
//         }}
//         name="Home"
//         component={Home}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({color}) => (
//             <Image
//               source={require('../assets/Images/home.png')}
//               style={{
//                 height: hp(2.5),
//                 width: hp(2.5),
//                 resizeMode: 'contain',
//                 tintColor: route === 'home' ? colors.primary : color,
//               }}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="Close"
//         component={Close}
//         listeners={{
//           tabPress: e => {
//             setRoute('Close');
//           },
//         }}
//         options={{
//           tabBarLabel: 'Close',
//           tabBarIcon: ({color}) => (
//             <Image
//               source={require('../assets/Images/list.png')}
//               style={{
//                 height: hp(2.5),
//                 width: hp(2.5),
//                 resizeMode: 'contain',
//                 tintColor: route === 'Close' ? colors.primary : color,
//               }}
//             />
//           ),
//         }}
//       />
//     </Tabs.Navigator>
//   );
// };



const StackNavigation = () => {
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
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
