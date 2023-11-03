import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {globalImagePath} from '../../assets/Images/gloableImagePath';
import {
  responsiveHeight as hp,
  responsiveFontSize as rfs,
} from 'react-native-responsive-dimensions';
import ThemeButton from '../../component/ThemeButton';

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
    <View
      style={[
        styles.container,
        {backgroundColor: isConnected == true ? null : '#fff'},
      ]}>
      {isConnected !== true ? (
        <View style={[styles.container]}>
          <Image
            source={globalImagePath.noInternetConnection}
            style={styles.image}
          />
          <Text style={styles.message}>
            {isConnected == true ? '' : 'No Internet Connection'}
          </Text>
          <ThemeButton
            style={{width: '80%', alignSelf: 'center'}}
            children={'Reload'}
            onPress={handleCheckConnection}
          />
        </View>
      ) : null}
    </View>
  );
};

export default CheckInteretConnect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
