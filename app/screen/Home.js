import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  Button,
  Alert,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../component/Header';
import {
  responsiveHeight as hp,
  responsiveFontSize as rfs,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import ThemeInput from '../component/ThemeInput';
import DropDown from 'react-native-paper-dropdown';
import DropDownList from '../component/DropDown';
import DropDownPicker from 'react-native-dropdown-picker';
import ThemeButton from '../component/ThemeButton';
import {launchCamera} from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {globalImagePath} from '../assets/Images/gloableImagePath';
import {colors} from '../assets/colors/colors';
import {Card, Title} from 'react-native-paper';
import uuid from 'react-native-uuid';
import FastImage from 'react-native-fast-image';
const Home = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [images, setImages] = useState('');
  const [openStatus, setOpenStatus] = useState(false);
  const [valueStatus, setValueStatus] = useState(null);
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [openList, setOpenList] = useState([]);
  const [uid, setUid] = useState(uuid.v4());
  const [itemStatus, setItemStatus] = useState([
    {label: 'Open', value: 'Open'},
    {label: 'Close', value: 'Close'},
  ]);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
    {label: 'Apple', value: 'apple1'},
    {label: 'Apple', value: 'apple2'},
  ]);
  const [error, setError] = useState({field: '', message: ''});

  console.log(error.message, 'abc');
  useEffect(() => {});
  const handlePostData = async () => {
    const listError = {field: '', message: ''};
    if (fullName === '') {
      listError.field = 'fullName';
      listError.message = 'full name required!';
      setError(listError);
      return
    } else if (companyName === '') {
      listError.field = 'companyName';
      listError.message = 'company name name required!';
      setError(listError);
    } else if (vehicleNumber === '') {
      listError.field = 'vehicleNumber';
      listError.message = 'vehicle number name name required!';
      setError(listError);
      return
    } else if (valueStatus === '') {
      listError.field = 'valueStatus';
      listError.message = 'status name required!';
      setError(listError);
    } else if (images === '') {
      listError.field = 'images';
      listError.message = 'image name required!';
      setError(listError);
      return;
    }

    try {
      const dataList = await firestore().collection('open').add({
        fullName,
        vehicleNumber,
        companyName,
        images,
        valueStatus,
        uid,
      });
      Alert.alert('List added succussfully');
    } catch (error) {
      console.log(error);
    }
    setFormVisible(false);
  };
  useEffect(() => {
    handleGetData();
  }, []);
  const handleGetData = async () => {
    try {
      const querySnap = await firestore().collection('open').get();
      const res = (await querySnap).docs.map(docsSnap => docsSnap.data());

      setOpenList(res);
    } catch (error) {
      console.log(error, 'error');
    }
  };
  const handleOpenCamera = () => {
    launchCamera({quality: 0.5}, fileObj => {
      console.log(fileObj.assets[0].uri);
      const uploadTask = storage()
        .ref()
        .child(`/items/${Date.now()}`)
        .putFile(fileObj.assets[0].uri.split('file://')[1]);
      uploadTask.on(
        'state_changed',
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //console.log('Upload is ' + progress + '% done');
          if (progress == 100) {
            alert('uploaded');
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

  const handleOpenModal = () => {
    setFormVisible(true);
  };
  const handleCloseModal = () => {
    setFormVisible(false);
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.label}>
          Company Name:- <Text style={styles.regTxt}>{item.companyName}</Text>
        </Text>
        <Text style={styles.label}>
          Full Name:- <Text style={styles.regTxt}>{item.fullName}</Text>
        </Text>
        <Text style={styles.label}>
          Vehicle Name:-{' '}
          <Text style={[styles.regTxt, {textTransform: 'uppercase'}]}>
            {item.vehicleNumber}
          </Text>
        </Text>
        <Text style={styles.label}>
          Status:-{' '}
          <Text style={[styles.regTxt, {textTransform: 'uppercase'}]}>
            {item.valueStatus}
          </Text>
        </Text>
        <Image source={{uri: item.images}} style={styles.images} />
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Header title={'Open List'} />
      <View style={styles.container}>
        <FlatList
          refreshing
          keyExtractor={item => item.uid}
          data={openList}
          renderItem={renderItem}
        />
        <TouchableOpacity style={styles.AddRow} onPress={handleOpenModal}>
          <Image style={styles.AddList} source={globalImagePath.plus} />
        </TouchableOpacity>
      </View>
      <Modal visible={formVisible} onDismiss={handleCloseModal} transparent>
        <View style={styles.parentContainer}>
          <Pressable
            onPress={handleCloseModal}
            style={{height: '100%', width: '100%'}}></Pressable>
          <View
            style={{
              bottom: 0,
              top: 0,
              left: wp(5),
              right: wp(5),
              flex: 1,
              justifyContent: 'center',
              position: 'absolute',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                padding: hp(2),
                borderRadius: 8,
              }}>
              <ThemeInput
                style={styles.bottomSpace}
                value={fullName}
                placeholder={'Full Name'}
                onChangeText={txt => setFullName(txt)}
              />
              {error.field === 'fullName' && (
                <Text style={styles.errorMsg}>{error.message}</Text>
              )}

              <ThemeInput
                style={styles.bottomSpace}
                value={vehicleNumber}
                placeholder={'Vehicle Number'}
                onChangeText={txt => setVehicleNumber(txt)}
              />
              {error.field === 'vehicleNumber' && (
                <Text style={styles.errorMsg}>{error.message}</Text>
              )}

              <DropDownPicker
                style={[styles.bottomSpace, {backgroundColor: '#f5f5f5'}]}
                open={openStatus}
                value={valueStatus}
                items={itemStatus}
                placeholder="Status"
                setOpen={setOpenStatus}
                setValue={setValueStatus}
                setItems={setItemStatus}
              />
              {error.field === 'valueStatus' && (
                <Text style={styles.errorMsg}>{error.message}</Text>
              )}

              <TouchableOpacity
                onPress={() => handleOpenCamera()}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: hp(2),
                }}>
                <Image
                  source={images ? {uri: images} : globalImagePath.camera}
                  style={images ? styles.VImages : styles.normalImage}
                />
              </TouchableOpacity>
              {error.field === 'images' && (
                <Text style={styles.errorMsg}>{error.message}</Text>
              )}
              <DropDownPicker
                style={[styles.bottomSpace, {backgroundColor: '#f5f5f5'}]}
                open={open}
                value={companyName}
                items={items}
                setOpen={setOpen}
                setValue={setCompanyName}
                setItems={setItems}
              />
              {error.field === 'companyName' && (
                <Text style={styles.errorMsg}>{error.message}</Text>
              )}

              <ThemeButton onPress={handlePostData} children={'Submit'} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
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
    padding: hp(2),
    margin: hp(2),
    borderWidth: 0.5,
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
});
