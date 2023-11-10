import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors/colors';
import {
    responsiveHeight as hp,
    responsiveFontSize as rfs,
    responsiveWidth as wp,
  } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: hp(2),
    },
    AddList: {
      height: hp(3),
      width: hp(3),
      resizeMode: 'contain',
      tintColor: '#fff',
    },
    AddRow: {
      position: 'absolute',
      bottom: hp(2),
      right: hp(2),
      height: hp(7),
      width: hp(7),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      backgroundColor: colors.primary,
      elevation: 8,
    },
  
    bottomSpace: {
      marginBottom: hp(0),
    },
    card: {
      padding: hp(2),
      borderWidth: 0.5,
      marginBottom: hp(2),
    },
    label: {
      fontSize: rfs(2),
      fontWeight: '500',
      textTransform: 'capitalize',
    },
    regTxt: {
      fontSize: rfs(2),
      fontWeight: '400',
      textTransform: 'capitalize',
    },
    images: {
      height: hp(20),
      width: '100%',
      marginTop: hp(2),
    },
    normalImage: {
      height: hp(7),
      width: hp(7),
      resizeMode: 'cover',
    },
    VImages: {
      height: hp(20),
      width: '100%',
      borderRadius: 8,
      resizeMode: 'cover',
    },
    errorMsg: {
      color: 'red',
      height:hp(3),
      fontSize:rfs(1.8),
      fontFamily: 'Lora-Regular',
    },
    editEvent: {
      height: hp(2),
      width: hp(2),
      right: wp(2),
      resizeMode: 'contain',
    },
  
    boxWrapper: {
      padding: hp(3),
      borderRadius: 8,
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: '#f5f5f5',
    },
    imageBox: {
      justifyContent: 'center',
      alignItems: 'center',
      height: hp(20),
      marginTop:hp(2),
      borderRadius: 8,
      borderWidth: 1,
    },
  
    title: {
      fontSize: rfs(3.5),
      fontWeight: '600',
      fontFamily: 'Lora-SemiBold',
    },
    backBtn: {
      height: hp(4),
      width: hp(4),
      resizeMode: 'contain',
    },
    leftBackBtn: {
      height: hp(5),
      width: hp(5),
      alignItems: 'center',
      justifyContent: 'center',
    },
    dropDownPicker: {
      backgroundColor: 'transparent',
      borderBottomWidth: 1,
      borderWidth: 0,
      width: '100%',
    },
    selectedStyle: {
      color: '#fff',
      width: '100%',
    },
    LoraRegular: {
      fontFamily: 'Lora-Regular',
    },
  });