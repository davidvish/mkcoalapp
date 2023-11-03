import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {globalImagePath} from '../../assets/Images/gloableImagePath';
import {
  responsiveHeight as hp,
  responsiveFontSize as rfs,
} from 'react-native-responsive-dimensions';
import ThemeButton from '../../component/ThemeButton';
import {colors} from '../../assets/colors/colors';

const CheckInteretConnect = ({isConnected, setIsConnected}) => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected);
    });

    return () => {
      // Unsubscribe
      unsubscribe();
    };
  }, []);
  const handleCheckConnection = () => {
    NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected);
    });
  };
  return (
    <View style={[styles.container]}>
      {isConnected !== true ? (
        <View style={{flex: 1, backgroundColor: '#fff', top: hp(10)}}>
          <Image
            source={globalImagePath.noInternetConnection}
            style={styles.image}
          />
          {isConnected == true ? (
            <Text style={styles.message}>No Internet Connection</Text>
          ) : null}
          <TouchableOpacity
            style={[styles.button]}
            onPress={handleCheckConnection}>
            <Text style={[styles.btnTxt]}>{'Reload'}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default CheckInteretConnect;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  image: {
    width: hp(20),
    height: hp(20),
    alignSelf: 'center',
  },
  message: {
    fontSize: rfs(2.2),
    color: 'red',
    fontWeight: 'Lora-SemiBold',
    textAlign: 'center',
    paddingVertical: hp(1),
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: hp(6),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    textTransform: 'uppercase',
    shadowColor: colors.primary,
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
  },
  btnTxt: {
    fontSize: rfs(2),
    color: '#fff',
    fontWeight: '400',
    textTransform: 'uppercase',
    fontFamily: 'Lora-Regular',
  },
});
