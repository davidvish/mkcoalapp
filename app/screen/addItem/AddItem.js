import {View, Image, TouchableOpacity, PermissionsAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import ThemeInput from '../../component/ThemeInput';
import ThemeButton from '../../component/ThemeButton';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {globalImagePath} from '../../assets/Images/gloableImagePath';
import {colors} from '../../assets/colors/colors';
import {launchCamera} from 'react-native-image-picker';
import {Title} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import uuid from 'react-native-uuid';
import Loader from '../../component/Loader';
import { styles } from './style';

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
  const [endDateTime, setEndDateTime] = useState();
  const [index, setIndex] = useState(1);
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
    setEndDateTime(dt2.format('DD/MM/YYYY HH:mm A'));
    setDisable(!name || !vehicleNumber || !images || !companyName || !number);
    setListUid();
  }, [navigation, itemStatus, items]);
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
    let id = setIndex(index + 1);
    let itemId = uuid.v4();
    if (route?.params?.type == 'edit') {
      setLoaderVisible(true);
      try {
        const dataList = await firestore()
          .collection('open')
          .doc(route.params?.data.itemId)
          .update({
            name,
            vehicleNumber,
            companyName,
            images,
            status,
            number,
            endDateTime: dateTime,
            itemId: route.params?.data.itemId,
          });
        // Alert.alert('List added succussfully');
        setLoaderVisible(false);
        navigation.goBack();
      } catch (error) {
        setLoaderVisible(false);
        console.log(error);
      }
    } else {
      try {
        setLoaderVisible(true);
        const dataList = await firestore().collection('open').doc(itemId).set({
          name,
          vehicleNumber,
          companyName,
          images,
          status,
          number,
          dateTime,
          itemId: itemId,
        });
        // Alert.alert('List added succussfully');
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
        <TouchableOpacity
          style={styles.leftBackBtn}
          onPress={() => navigation.goBack()}>
          <Image source={globalImagePath.left} style={styles.backBtn} />
        </TouchableOpacity>
        <Title style={styles.title}>{'Create\nNew Task'}</Title>
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
        style={[styles.bottomSpace]}
        value={vehicleNumber}
        placeholder={'Vehicle Number'}
        onChangeText={txt => setVehicleNumber(txt)}
      />

      <DropDownPicker
        style={styles.DropDownPicker}
        open={openStatus}
        value={status}
        selectedItemLabelStyle={styles.selectedStyle}
        selectedItemContainerStyle={{backgroundColor: colors.primaryOpacity}}
        tickIconStyle={{tintColor: '#fff'}}
        placeholderStyle={styles.LoraRegular}
        dropDownContainerStyle={styles.LoraRegular}
        itemSeparatorStyle={styles.LoraRegular}
        dropDownDirection="BOTTOM"
        labelStyle={styles.LoraRegular}
        textStyle={styles.LoraRegular}
        placeholder={'Select Status'}
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
        style={styles.DropDownPicker}
        searchable
        open={open}
        value={companyName}
        items={items}
        tickIconStyle={{tintColor: '#fff'}}
        selectedItemLabelStyle={styles.selectedStyle}
        selectedItemContainerStyle={{backgroundColor: colors.primaryOpacity}}
        labelStyle={styles.LoraRegular}
        textStyle={styles.LoraRegular}
        setOpen={setOpen}
        dropDownDirection="TOP"
        disableBorderRadius={0}
        placeholder={'Select Destination'}
        placeholderStyle={styles.LoraRegular}
        setValue={setCompanyName}
        setItems={setItems}
      />
      <ThemeButton
        disabled={disabled ? true : false}
        style={{
          backgroundColor: disabled ? '#ccc' : colors.primary,
          borderColor: disabled ? '#ccc' : colors.primary,
        }}
        onPress={handlePostData}
        children={route?.params?.type === 'edit' ? 'UPDATE' : 'CREATE TASK'}
        btnStyle={{color: '#fff', textTransform: 'uppercase'}}
      />
      <Loader visible={loadVisible} />
    </View>
  );
};

export default AddItem;