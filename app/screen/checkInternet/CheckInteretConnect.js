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
import { Title } from 'react-native-paper';

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
        <View style={{flex: 1,backgroundColor:'#fff',top:hp(10)}}>
          <Image
            source={globalImagePath.noInternetConnection}
            style={styles.image}
          />
          <Title style={styles.message}> {isConnected == true ? null :'No Internet Connection'}</Title>
          <TouchableOpacity
            style={[styles.button]}
            onPress={handleCheckConnection} activeOpacity={1}>
            <Title style={[styles.btnTxt]}>{'No Internet Connection'}</Title>
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
    height: hp(6),
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    flexDirection: 'row',
    width:'80%',
    alignSelf:'center'
  },
  btnTxt: {
    fontSize: rfs(2.5),
    color: colors.primary,
    fontWeight: '400',
    textTransform: 'uppercase',
    fontFamily: 'Lora-Regular',
  },
});
