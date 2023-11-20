import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {
  responsiveHeight as hp,
  responsiveFontSize as rfs,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: hp(2),
    paddingTop: hp(1),
  },
  listBottom: {
    paddingBottom: hp(8),
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
    padding: hp(2),
    borderWidth: 0.5,
    marginBottom: hp(2),
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: rfs(2),
    fontWeight: '500',
    textTransform: 'capitalize',
    fontFamily: 'Lora-Regular',
  },
  ttcLabal: {
    fontSize: rfs(1.8),
    fontWeight: '500',
    textTransform: 'capitalize',
    fontFamily: 'Lora-Regular',
    textAlign:'right',
    paddingBottom:hp(1)
  },
  regTxt: {
    fontSize: rfs(2),
    fontWeight: '400',
    textTransform: 'capitalize',
    fontFamily: 'Lora-Medium',
  },
  boldText: {
    fontSize: rfs(2.2),
    textTransform: 'capitalize',
    fontFamily: 'Lora-Bold',
  },
  images: {
    height: hp(20),
    width: '49%',
    marginTop: hp(2),
    borderRadius: 8,
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
  editEvent: {
    height: hp(3),
    width: hp(3),
    right: wp(2),
    resizeMode: 'contain',
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
  boxWrapper: {
    backgroundColor: '#fff',
    padding: hp(2),
    borderRadius: 8,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  search: {
    height: hp(2),
    width: hp(2),
    resizeMode: 'contain',
  },
  filter: {
    height: hp(5),
    width: hp(5),
    right: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
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
  boxWrapper: {
    padding: hp(3),
    borderRadius: 8,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
  },
  modalWrapper: {
    height: hp(50),
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    alignSelf: 'center',
  },
  flexFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topWrapper: {
    position: 'absolute',
    bottom: hp(10),
    right: wp(3),
    padding: hp(1.5),
    borderRadius: 50,
    backgroundColor: colors.primary,
  },
});
