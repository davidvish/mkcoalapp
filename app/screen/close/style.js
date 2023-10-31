import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {
  responsiveHeight as hp,
  responsiveFontSize as rfs,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  parentContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0 ,0 ,0.5)',
    paddingHorizontal: wp(8),
  },
  bottomSpace: {
    marginBottom: hp(2),
  },
  card: {
   paddingHorizontal:hp(1.8),
   alignItems:'center',
   flexDirection:'row',
   justifyContent:'space-between',
   borderBottomWidth:0.5,
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
    height: hp(10),
    width: hp(10),
    resizeMode: 'cover',
  },
  VImages: {
    height: hp(20),
    width: '100%',
    resizeMode: 'cover',
  },
  errorMsg: {
    color: 'red',
  },
  headerList: {
    backgroundColor: '',
    height: hp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:Dimensions.get('window').width
  },
});
