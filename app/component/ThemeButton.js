import {StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import React from 'react';
import {
  responsiveHeight as hp,
  responsiveFontSize as rfs,
  responsiveWidth as wp
} from 'react-native-responsive-dimensions';
import {colors} from '../assets/colors/colors';
import { globalImagePath } from '../assets/Images/gloableImagePath';

const ThemeButton = ({children, style, onPress, btnStyle, disabled}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, style]}
      onPress={onPress}>
        <Image source={globalImagePath.plus} style={styles.plus} />
      <Text style={[styles.btnTxt, btnStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default ThemeButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    height: hp(6),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    textTransform: 'uppercase',
    shadowColor: colors.primary,
    flexDirection:'row',
  },
  btnTxt: {
    fontSize: rfs(2),
    color: '#000',
    fontWeight: '400',
    textTransform:'uppercase'
  },
  plus:{
    height:hp(1.5),
    width:hp(1.5),
    tintColor:'#fff',
    right:wp(2)
  }
});
