import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {
  responsiveHeight as hp,
  responsiveFontSize as rfs,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {globalImagePath} from '../../assets/Images/gloableImagePath';
import {colors} from '../../assets/colors/colors';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('CustomTab');
    }, 1500);
  });
  return (
    <View style={styles.container}>
      <View />
      <Image source={globalImagePath.logo} style={styles.Image} />
      <Text style={styles.powTxt}>
        Powered by <Text style={{color: colors.primary}}>{'Mahakal Coal'}</Text>
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  Image: {
    height: hp(20),
    width: hp(20),
    resizeMode: 'contain',
    borderRadius: 100,
  },
  powTxt: {
    fontSize: rfs(2),
    fontFamily: 'Lora-SemiBold',
    bottom: hp(2),
    color: '#555',
  },
});
