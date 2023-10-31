import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Modal,
  SafeAreaView,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ThemeInput from '../component/ThemeInput';
import ThemeButton from '../component/ThemeButton';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import {
  responsiveHeight as hp,
  responsiveFontSize as rfs,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {globalImagePath} from '../assets/Images/gloableImagePath';
import {colors} from '../assets/colors/colors';
import {launchCamera} from 'react-native-image-picker';
import {ActivityIndicator} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import uuid from 'react-native-uuid';

const AddItem = () => {
  const route = useRoute();
  const [name, setName] = useState(
    route?.params?.type == 'edit' ? route.params.data.name : '',
  );
  const [number, setNumber] = useState(
    route?.params?.type == 'edit' ? route.params.data.number : '',
  );

  const [vehicleNumber, setVehicleNumber] = useState(
    route?.params?.type == 'edit' ? route.params.data.vehicleNumber : '',
  );
  const [companyName, setCompanyName] = useState(
    route?.params?.type == 'edit' ? route.params.data.companyName : '',
  );
  const [status, setStatus] = useState(
    route?.params?.type == 'edit' ? route.params.data.status : '',
  );
  const [itemStatus, setItemStatus] = useState([
    {label: 'open', value: 'Open'},
    {label: 'close', value: 'Close'},
    
  ]);
  const [images, setImages] = useState(
    route?.params?.type == 'edit' ? route.params.data.images : '',
  );
  const [disabled, setDisable] = useState(false);
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const [dateTime, setDateTime] = useState();
  const [listUid, setListUid] = useState();
  const [loadVisible, setLoaderVisible] = useState(false);
  const navigation = useNavigation();
  const [items, setItems] = useState([
    {label: 'Wipro', value: 'Wipro'},
    {label: 'Tata', value: 'Tata'},
    {label: 'Rinira', value: 'Rinira'},
    {label: 'Infosys', value: 'Infosys'},
  ]);
  const [error, setError] = useState({field: '', message: ''});

  useEffect(() => {
    let scheduledDeparture_Time = new Date();
    let dt2 = moment(scheduledDeparture_Time);
    setDateTime(dt2.format('DD/MM/YYYY HH:mm A'));
    setDisable(!name || !vehicleNumber || !images || !companyName || !number);
    setListUid();
  });
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        handleOpenCamera();
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const handleBlankField = () => {
    setName(''),
      setNumber(''),
      setDateTime(''),
      setImages(''),
      setCompanyName(''),
      setVehicleNumber('');
  };
  const handlePostData = async () => {
    setLoaderVisible(false);
    let itemId = uuid.v4();
    if (route?.params?.type == 'edit') {
      try {
        const dataList = await firestore()
          .collection('open')
          .doc(route.params?.data.itemID)
          .update({
            name,
            vehicleNumber,
            companyName,
            images,
            status,
            number,
            dateTime,
            itemID: route.params?.data.itemID,
          });
        Alert.alert('List added succussfully');
        setLoaderVisible(false);
        navigation.goBack();
      } catch (error) {
        setLoaderVisible(false);
        console.log(error);
      }
    } else {
      try {
        const dataList = await firestore().collection('open').doc(itemId).set({
          name,
          vehicleNumber,
          companyName,
          images,
          status,
          number,
          dateTime,
          itemID:itemId,
        });
        Alert.alert('List added succussfully');
        setLoaderVisible(false);
        navigation.goBack();
      } catch (error) {
        setLoaderVisible(false);
        console.log(error);
      }
    }
    handleBlankField();
  };
  const handleOpenCamera = () => {
    launchCamera({quality: 0.5}, fileObj => {
      console.log(fileObj.assets[0].uri);
      const uploadTask = storage()
        .ref()
        .child(`/open/${Date.now()}`)
        .putFile(fileObj.assets[0].uri.split('file://')[1]);
      uploadTask.on(
        'state_changed',
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //console.log('Upload is ' + progress + '% done');
          if (progress == 100) {
            // alert('uploaded');
          }
        },
        error => {
          alert(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            //console.log('File available at', downloadURL);
            setImages(downloadURL);
          });
        },
      );
    });
  };

  return (
    <View style={styles.boxWrapper}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={globalImagePath.left} style={styles.backBtn} />
        </TouchableOpacity>
        <Text style={styles.title}>{'Create\nNew Task'}</Text>
      </View>
      <ThemeInput
        style={styles.bottomSpace}
        value={name}
        placeholder={'Full Name'}
        onChangeText={txt => setName(txt)}
      />

      <ThemeInput
        style={styles.bottomSpace}
        value={number}
        keyboardType={'number-pad'}
        placeholder={'Phone Number'}
        onChangeText={txt => setNumber(txt)}
      />

      <ThemeInput
        style={[styles.bottomSpace, {textTransform: 'uppercase'}]}
        value={vehicleNumber}
        placeholder={'Vehicle Number'}
        onChangeText={txt => setVehicleNumber(txt)}
      />

      <DropDownPicker
        style={{
          backgroundColor: 'transparent',
          borderBottomWidth: 1,
          borderWidth: 0,
        }}
        open={openStatus}
        autoScroll
        value={status}
        placeholder={'select status'}
        items={itemStatus}
        setOpen={setOpenStatus}
        setValue={setStatus}
        setItems={setItemStatus}
      />

      <TouchableOpacity
        onPress={() => requestCameraPermission()}
        style={styles.imageBox}>
        <Image
          source={images ? {uri: images} : globalImagePath.camera}
          style={images ? styles.VImages : styles.normalImage}
        />
      </TouchableOpacity>
      <DropDownPicker
        style={{
          backgroundColor: 'transparent',
          borderBottomWidth: 1,
          borderWidth: 0,
        }}
        open={open}
        autoScroll
        value={companyName}
        items={items}
        setOpen={setOpen}
        setValue={setCompanyName}
        setItems={setItems}
      />
      <ThemeButton
        // disabled={disabled ? true : false}
        style={{backgroundColor: colors.primary}}
        onPress={handlePostData}
        children={'CREATE TASK'}
        btnStyle={{color: '#fff', textTransform: 'uppercase'}}
      />
      <Modal animationType="slide" visible={loadVisible} transparent>
        <SafeAreaView style={styles.parentContainer}>
          <Pressable style={{height: '100%', width: '100%'}}></Pressable>
          <View style={styles.parentWrapper}>
            <View style={styles.modalWrapper}>
              <ActivityIndicator />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default AddItem;

const styles = StyleSheet.create({
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
    resizeMode: 'cover',
  },
  errorMsg: {
    color: 'red',
  },
  editEvent: {
    height: hp(2),
    width: hp(2),
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
    padding: hp(3),
    borderRadius: 8,
    flex: 1,
    justifyContent: 'space-between',
  },
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2),
    height: hp(20),
    borderRadius: 8,
    borderWidth: 1,
  },
  modalWrapper: {
    height: hp(10),
    width: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: rfs(3.5),
    fontWeight: '600',
  },
  backBtn: {
    height: hp(3),
    width: hp(3.5),
    resizeMode: 'contain',
  },
});
