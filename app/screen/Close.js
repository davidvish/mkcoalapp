import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../component/Header';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';

const Close = () => {
  return (
    <View style={{flex: 1}}>
      <Header title={'Close List'} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.AddRow}>
          <Image
            style={styles.AddList}
            source={require('../assets/Images/plus.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Close;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  AddList: {
    height: hp(7),
    width: hp(7),
    resizeMode: 'contain',
  },
  AddRow: {
    position: 'absolute',
    bottom: hp(2),
    right: hp(2),
    tintColor: '#f5f5f5',
  },
});
