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
import {Card} from 'react-native-paper';
const Home = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
    {label: 'Apple', value: 'apple1'},
    {label: 'Apple', value: 'apple2'},
  ]);
  const [fullName, setFullName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [images, setImages] = useState('../assets/Images/camera.png');
  const [status, setStatus] = useState([
    {label: 'Open', value: 'Open'},
    {label: 'Close', value: 'Close'},
  ]);
  const [openStatus, setOpenStatus] = useState(false);
  const [valueStatus, setValueStatus] = useState(null);
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [openList, setOpenList] = useState([]);
  console.log(openList, 'res');

  const handlePostData = async () => {
    if (!fullName || !vehicleNumber || !companyName || !images || !status) {
      Alert.alert('Please field all data');
      return;
    }
    try {
      const dataList = await firestore().collection('open').add({
        fullName,
        vehicleNumber,
        companyName,
        images,
        status,
      });
      Alert.alert('List added succussfully');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetData();
  }, []);
  const handleGetData = async () => {
    try {
      const querySnap = await firestore().collection('open').get();
      const res = (await querySnap).docs.map(docsSnap => docsSnap.data())
      setOpenList(res)
    } catch (error) {
      console.log(error,"error")
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
  return (
    <View style={{flex: 1}}>
      <Header title={'Open List'} />
      <View style={styles.container}>
        {/* <FlatList
      renderItem={} /> */}
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
              <ThemeInput
                style={styles.bottomSpace}
                value={vehicleNumber}
                placeholder={'Vehicle Number'}
                onChangeText={txt => setVehicleNumber(txt)}
              />

              <DropDownPicker
                style={[styles.bottomSpace, {backgroundColor: '#f5f5f5'}]}
                open={openStatus}
                value={valueStatus}
                items={status}
                setOpen={setOpenStatus}
                setValue={setValueStatus}
                setItems={setStatus}
              />
              <TouchableOpacity
                onPress={() => handleOpenCamera()}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: hp(2),
                }}>
                <Image
                  source={globalImagePath.camera}
                  style={{height: hp(10), width: hp(10)}}
                />
              </TouchableOpacity>
              <DropDownPicker
                style={[styles.bottomSpace, {backgroundColor: '#f5f5f5'}]}
                open={open}
                value={companyName}
                items={items}
                setOpen={setOpen}
                setValue={setCompanyName}
                setItems={setItems}
              />

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
});
