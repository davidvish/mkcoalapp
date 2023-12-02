import {Alert, Button, StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import ThemeInput from '../component/ThemeInput';
import auth from '@react-native-firebase/auth';
import ThemeButton from '../component/ThemeButton';
import {responsiveHeight as hp} from 'react-native-responsive-dimensions';
import {globalImagePath} from '../assets/Images/gloableImagePath';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassworsd] = useState('');

  const Login = async () => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Login successgully');
      })
      .catch(err => {
        console.log('error', err);
      });
  };
  return (
    <View style={styles.container}>
      <Image source={globalImagePath.logo} style={styles.logo} />
      <ThemeInput
        placeholder={'Email'}
        value={email}
        onChangeText={txt => setEmail(txt)}
        style={{marginBottom: 10}}
      />
      <ThemeInput
        placeholder={'password'}
        value={password}
        onChangeText={txt => setPassworsd(txt)}
        style={styles.marginBottom}
      />
      <ThemeButton children={'Login'} onPress={Login} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: hp(2),
  },
  marginBottom: {
    marginBottom: hp(2),
  },
  logo: {
    height: hp(20),
    width: hp(20),
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: 100,
    top: -hp(2),
  },
});
