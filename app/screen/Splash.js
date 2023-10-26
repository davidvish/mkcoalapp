import {StyleSheet, Text, View, Image} from 'react-native';
import React,{useEffect} from 'react';
import {responsiveHeight as hp} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native'
import { globalImagePath } from '../assets/Images/gloableImagePath';

const Splash = () => {
  const navigation = useNavigation()
  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate('BottomTabs')
    },1500)
  })
  return (
    <View style={styles.container}>
      <Image
        source={globalImagePath.logo}
        style={styles.Image}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff'
  },

  Image: {
    height: hp(20),
    width: hp(20),
    resizeMode: 'contain',
  },
});
