import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  responsiveHeight as hp,
  responsiveFontSize as rfs,
} from 'react-native-responsive-dimensions';

const ThemeButton = ({children, style}) => {
  return (
    <TouchableOpacity style={[styles.button, style]}>
      <Text style={styles.btnTxt}>{children}</Text>
    </TouchableOpacity>
  );
};

export default ThemeButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    height: hp(6),
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: rfs(2),
    color: '#000',
    fontWeight: '500',
  },
});
