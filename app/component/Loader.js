import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {ActivityIndicator, Modal} from 'react-native-paper';
import {
    responsiveHeight as hp,
    responsiveFontSize as rfs,
    responsiveWidth as wp,
  } from 'react-native-responsive-dimensions';

const Loader = ({visible}) => {
  return (
    <Modal animationType="slide" visible={visible} transparent>
      <View style={styles.parentContainer}>
        {/* <Pressable style={{height: '100%', width: '100%'}}></Pressable> */}
        <View style={styles.parentWrapper}>
          <View style={styles.modalWrapper}>
            <ActivityIndicator />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0 ,0 ,0.5)',
    paddingHorizontal: wp(8),
  },
  parentWrapper: {
    bottom: 0,
    top: 0,
    left: wp(5),
    right: wp(5),
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
  },
  modalWrapper: {
    height: hp(10),
    width: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    alignSelf: 'center',
  },
});
