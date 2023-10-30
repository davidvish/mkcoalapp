import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveHeight as hp,
  responsiveFontSize as rfs,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import {globalImagePath} from '../assets/Images/gloableImagePath';
import {colors} from '../assets/colors/colors';
import {useNavigation} from '@react-navigation/native';
import Home from '../screen/home/Home';
import Close from '../screen/close/Close';

const CustomTab = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigation = useNavigation();
//   useEffect(()=>{
//     if(selectedTab===0){
//         <Home/>
//     }
//   })
  return (
    <View style={styles.container}>
        {selectedTab === 0 ? <Home/>:<Close/>}
      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => setSelectedTab(0)}>
          <Image
            source={globalImagePath.home}
            style={[
              styles.bottomImage,
              {
                tintColor: selectedTab === 0 ? colors.primary : '#ccc',
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[, styles.plusBorder]}
          onPress={() => navigation.navigate('AddItem',{type:'new'})}>
          <Image
            source={globalImagePath.plus}
            style={[
              styles.bottomImage,
              {
                tintColor: '#fff',
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => 
            setSelectedTab(2)
          }>
          <Image
            source={globalImagePath.list}
            style={[
              styles.bottomImage,
              {
                tintColor: selectedTab === 2 ? colors.primary : '#ccc',
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    backgroundColor: '#fff',
    height: hp(8),
    borderTopLeftRadius: hp(5),
    borderTopRightRadius: hp(5),
    position: 'absolute',
    width: '100%',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation:5
  },
  bottomTab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusBorder: {
    backgroundColor: colors.primary,
    padding: hp(1.5),
    borderRadius: 100,
    bottom:hp(2),
    elevation:10,
    shadowColor:colors.primary
  },
  bottomImage: {
    height: hp(3),
    width: hp(3),
    resizeMode: 'contain',
  },
});
