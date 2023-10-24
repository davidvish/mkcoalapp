import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveHeight as hp,
  responsiveFontSize as rfs,
} from 'react-native-responsive-dimensions';

const Header = ({title}) => {
  return (
    <View style={styles.header}>
        <StatusBar backgroundColor={'#f5f5f5'} barStyle={'default'}/>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f5f5f5',
    paddingVertical: hp(2),
  },
  title: {
    fontSize: rfs(2.2),
    textAlign:"center",
    fontWeight:'500'

  },
});
