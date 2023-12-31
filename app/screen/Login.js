import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import ThemeInput from '../component/ThemeInput';
import auth from '@react-native-firebase/auth';
import ThemeButton from '../component/ThemeButton';
import {responsiveHeight as hp} from 'react-native-responsive-dimensions';
import {globalImagePath} from '../assets/Images/gloableImagePath';
import {colors} from '../assets/colors/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassworsd] = useState('');
  const [hidePass, setHidePass] = useState(true);

  const Login = async () => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Login successfully!');
      })
      .catch(err => {
        console.log('error', err);
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'default'} backgroundColor={colors.primary} />
      <View>
        <Image source={globalImagePath.logo} style={styles.logo} />

        <ThemeInput
          placeholder={'Email'}
          value={email}
          keyboardType={'email-address'}
          onChangeText={txt => setEmail(txt)}
          style={{marginBottom: 10}}
        />
        <View style={styles.row}>
          <ThemeInput
            placeholder={'Password'}
            value={password}
            secureTextEntry={hidePass ? true : false}
            onChangeText={txt => setPassworsd(txt)}
            style={styles.marginBottom}
          />
          <MaterialCommunityIcons style={styles.eye} onPress={()=> setHidePass(!hidePass)} name={hidePass? "eye-off" :"eye"} size={20} />
        </View>
        <ThemeButton
          style={{backgroundColor: colors.primary, borderColor: colors.primary}}
          btnStyle={{color: '#fff'}}
          children={'Login'}
          onPress={Login}
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: hp(2),
    backgroundColor: '#f5f5f5',
  },
  marginBottom: {
    marginBottom: hp(5),
  },
  logo: {
    height: hp(15),
    width: hp(15),
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: 100,
    top: -hp(2),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eye: {
    right: hp(2),
    bottom: hp(2),
  },
});
