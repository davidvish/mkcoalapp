import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveHeight as hp,
  responsiveFontSize as rfs,
} from 'react-native-responsive-dimensions';
import { colors } from '../assets/colors/colors';
import { Title } from 'react-native-paper';

const Header = ({title}) => {
  return (
    <View style={styles.header}>
        <StatusBar backgroundColor={colors.primary} barStyle={'default'}/>
      <Title style={styles.title}>{title}</Title>
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
    textAlign:"center",
    fontWeight:'500',
    color:'#fff',
    fontFamily:'Lora-Bold'

  },
});
