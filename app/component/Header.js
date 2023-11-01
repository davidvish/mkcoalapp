import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveHeight as hp,
  responsiveFontSize as rfs,
} from 'react-native-responsive-dimensions';
import { colors } from '../assets/colors/colors';

const Header = ({title}) => {
  return (
    <View style={styles.header}>
        <StatusBar backgroundColor={colors.primary} barStyle={'default'}/>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    paddingVertical: hp(2),
    // borderBottomLeftRadius:10,
    // borderBottomRightRadius:20
  },
  title: {
    fontSize: rfs(2.2),
    textAlign:"center",
    fontWeight:'500',
    color:'#fff',
    fontFamily:'Lora-Bold'

  },
});
