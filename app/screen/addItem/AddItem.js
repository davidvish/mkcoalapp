import {
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ThemeInput from '../../component/ThemeInput';
import ThemeButton from '../../component/ThemeButton';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import ModalDropdown from 'react-native-modal-dropdown';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {globalImagePath} from '../../assets/Images/gloableImagePath';
import {colors} from '../../assets/colors/colors';
import {launchCamera} from 'react-native-image-picker';
import {Text, Title} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import uuid from 'react-native-uuid';
import Loader from '../../component/Loader';
import {styles} from './style';
import {CompanyDestination} from '../../assets/data/DestinationList';
import {MinesList} from '../../assets/data/MinesList';
import {responsiveHeight as hp} from 'react-native-responsive-dimensions';
import { StatusList } from '../../assets/data/Status';
import ImagePicter from 'react-native-image-crop-picker'

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
    route?.params?.type == 'edit' ? route.params.data.companyName : 'Select Destination',
  );
  const [mines, setMines] = useState(
    route?.params?.type == 'edit'
      ? route.params.data.mines
      : 'Select Mines',
  );
  const [status, setStatus] = useState(
    route?.params?.type == 'edit' ? route.params.data.status : 'Select Status',
  );
  const [itemStatus, setItemStatus] = useState(StatusList);
  const [images, setImages] = useState(
    route?.params?.type == 'edit' ? route.params.data.images : '',
  );
  const [imageWithSlip, setImageWithSlip] = useState(
    route?.params?.type == 'edit' ? route.params.data.imageWithSlip : '',
  );
  const [disabled, setDisabled] = useState(false);
  const [date, setDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [index, setIndex] = useState(1);
  const [listUid, setListUid] = useState();
  const [loadVisible, setLoaderVisible] = useState(false);
  const navigation = useNavigation();
  const [DestinationList, setDestinationList] = useState();
  const [items, setItems] = useState(CompanyDestination);
  const [minesItems, setMinesItems] = useState(MinesList);
  const [nameError, setNameError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [vehicleNumberError, setVehicleNumberError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageWithSlipError, setImageWithSlipError] = useState(false);

  const [companyNameError, setCompanyNameError] = useState(false);
  const [minesError, setMinesError] = useState(false);

  useEffect(() => {
    let scheduledDeparture_Date = new Date();
    let dt1 = moment(scheduledDeparture_Date);
    setDate(dt1.format('DD/MM/YYYY'));
    setEndDate(dt1.format('DD/MM/YYYY'));
    setStartTime(dt1.format('H:MM A'));
    setEndTime(dt1.format('H:MM A'));
    setDisabled(!name || !vehicleNumber || !images || !companyName || !number);
    setListUid();
  });
  useEffect(() => {
    handleDestinationList();
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
      setDate(''),
      setImages(''),
      setCompanyName(''),
      setVehicleNumber('');
  };
  const handleValidation = () => {
    if (!name) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (!number) {
      setNumberError(true);
    } else if (number && number.length < 10) {
      setNumberError(true);
      return false;
    } else if (number && number.length == 10) {
      setNumberError(false);
    }

    if (!vehicleNumber) {
      setVehicleNumberError(true);
    } else if (vehicleNumber && vehicleNumber.length < 10) {
      setVehicleNumberError(true);
    } else if (vehicleNumber && vehicleNumber.length == 10) {
      setVehicleNumberError(false);
    }
    if (!status) {
      setStatusError(true);
    } else {
      setStatusError(false);
    }
    if (!images) {
      setImageError(true);
    } else {
      setImageError(false);
    }
    if (!companyName) {
      setCompanyNameError(true);
    } else {
      setCompanyNameError(false);
    }
    if (!mines) {
      setMinesError(true);
    } else {
      setMinesError(false);
    }
    if (!imageWithSlip) {
      setImageWithSlipError(true);
    } else {
      setImageWithSlipError(false);
    }
  };
  const handlePostData = async () => {
    handleValidation();
    if (
      !name ||
      !number ||
      !images ||
      !imageWithSlip ||
      !vehicleNumber ||
      !companyName ||
      !status ||
      !mines
    ) {
      return false;
    }
    let id = setIndex(index + 1);
    let itemId = uuid.v4();
    if (route?.params?.type == 'edit') {
      setLoaderVisible(true);
      try {
        const dataList = await firestore()
          .collection('new')
          .doc(route.params?.data.itemId)
          .update({
            name,
            vehicleNumber,
            companyName,
            mines,
            imageWithSlip,
            images,
            status,
            number,
            endDate: date,
            endTime,
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
        const dataList = await firestore().collection('new').doc(itemId).set({
          name,
          vehicleNumber,
          companyName,
          mines,
          imageWithSlip,
          images,
          status,
          number,
          date,
          startTime,
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
      setLoaderVisible(true);
      const uploadTask = storage()
        .ref()
        .child(`/items/${Date.now()}`)
        .putFile(fileObj.assets[0].uri.split('file://')[1]);
      uploadTask.on(
        'state_changed',
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('End Upload is ' + progress + '% done');
          if (progress == 100) {
            setLoaderVisible(false);
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
  const handleOpenCameraSlip = () => {
    launchCamera({quality: 0.5}, fileObj => {
      setLoaderVisible(true);
      const uploadTask = storage()
        .ref()
        .child(`/slip/${Date.now()}`)
        .putFile(fileObj.assets[0].uri.split('file://')[1]);
      uploadTask.on(
        'state_changed',
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('End Upload is ' + progress + '% done');
          if (progress == 100) {
            setLoaderVisible(false);
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
            setImageWithSlip(downloadURL);
          });
        },
      );
    });
  };

  

  const renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
    if (rowID == items.length - 1) return;
    return <View style={{height: 1, width: 0, backgroundColor: 'gray'}} />;
  };

  const handleDestinationList = async () => {
    try {
      const querySnap = await firestore().collection('MinesList').get();
      const res = (await querySnap).docs.map(docsSnap => docsSnap.data());
      setMinesItems(res[0]?.MinesList);
    } catch (error) {
      console.log(error, 'error');
    }
  };
  const handleOptionSelect = (index, value) => {
    setMines(value);
  };
  return (
    <View style={styles.boxWrapper}>
      <View style={{paddingHorizontal: hp(3), paddingTop: hp(3)}}>
        <TouchableOpacity
          style={styles.leftBackBtn}
          onPress={() => navigation.goBack()}>
          <Image source={globalImagePath.left} style={styles.backBtn} />
        </TouchableOpacity>
        <Title style={styles.title}>{'Create\nNew Task'}</Title>
      </View>
      <ScrollView style={{paddingHorizontal: hp(3)}}>
        <ThemeInput
          style={styles.bottomSpace}
          value={name}
          placeholder={'Full Name'}
          onChangeText={txt => setName(txt)}
        />
        {nameError ? (
          <Text style={styles.errorMsg}>{'Enter your full name!'}</Text>
        ) : (
          <View style={styles.errorMsg} />
        )}

        <ThemeInput
          style={styles.bottomSpace}
          value={number}
          maxLength={10}
          keyboardType={'number-pad'}
          placeholder={'Phone Number'}
          onChangeText={txt => setNumber(txt)}
        />
        {numberError ? (
          <Text style={styles.errorMsg}>
            {'Enter your phone number 10 digits!'}
          </Text>
        ) : (
          <View style={styles.errorMsg} />
        )}

        <ThemeInput
          style={[styles.bottomSpace]}
          value={vehicleNumber}
          ariaValuemin={4}
          placeholder={'Vehicle Number'}
          maxLength={10}
          onChangeText={txt => setVehicleNumber(txt)}
        />
        {vehicleNumberError ? (
          <Text style={styles.errorMsg}>
            {'Enter correct your vehicle number!'}
          </Text>
        ) : (
          <View style={styles.errorMsg} />
        )}
        {/* <DropDownPicker
          style={[styles.dropDownPicker, styles.bottomSpace]}
          open={openStatus}
          value={status}
          selectedItemLabelStyle={styles.selectedStyle}
          selectedItemContainerStyle={{backgroundColor: colors.primaryOpacity}}
          tickIconStyle={{tintColor: '#fff'}}
          placeholderStyle={styles.LoraRegular}
          dropDownContainerStyle={styles.LoraRegular}
          itemSeparatorStyle={styles.LoraRegular}
          dropDownDirection="TOP"
          labelStyle={styles.LoraRegular}
          textStyle={styles.LoraRegular}
          placeholder={'Select Status'}
          items={itemStatus}
          setOpen={setOpenStatus}
          setValue={setStatus}
          setItems={setItemStatus}
        /> */}
         <ModalDropdown
          isFullWidth
          // renderSearch={(text)=> setMines(text)}
          defaultValue={status}
          textStyle={styles.regTxt}
          renderSeparator={rowID => renderSeparator(rowID)}
          options={itemStatus}
          // showSearch
          onSelect={(idx, value) => setStatus(value)}
          dropdownStyle={{height:hp(11)}}
          dropdownTextStyle={[styles.dropdownText,]}
          style={[styles.dropDownPickerNew]}
          dropdownTextHighlightStyle={{
            backgroundColor: colors.primaryOpacity,
            color: '#fff',
          }}
        />
        {statusError ? (
          <Text style={styles.errorMsg}>{'Select any one status!'}</Text>
        ) : (
          <View style={styles.errorMsg} />
        )}
        {/* <DropDownPicker
          style={[styles.dropDownPicker, styles.bottomSpace]}
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
        /> */}
         <ModalDropdown
          isFullWidth
          // renderSearch={(text)=> setMines(text)}
          defaultValue={companyName}
          textStyle={styles.regTxt}
          renderSeparator={rowID => renderSeparator(rowID)}
          options={items}
          // showSearch
          onSelect={(idx, value) => setCompanyName(value)}
          dropdownTextStyle={[styles.dropdownText]}
          style={styles.dropDownPickerNew}
          dropdownTextHighlightStyle={{
            backgroundColor: colors.primaryOpacity,
            color: '#fff',
          }}
        />
        {companyNameError ? (
          <Text style={styles.errorMsg}>
            {'Select any one for destination!'}
          </Text>
        ) : (
          <View style={styles.errorMsg} />
        )}
        {/* <DropDownPicker
        style={[styles.dropDownPicker, styles.bottomSpace]}
        searchable
        open={openMines}
        value={mines}
        scrollViewProps={'always'}
        items={minesItems}
        tickIconStyle={{tintColor: '#fff'}}
        selectedItemLabelStyle={styles.selectedStyle}
        selectedItemContainerStyle={{backgroundColor: colors.primaryOpacity}}
        labelStyle={styles.LoraRegular}
        textStyle={styles.LoraRegular}
        setOpen={setOpenMines}
        dropDownDirection="TOP"
        disableBorderRadius={0}
        placeholder={'Select Mines'}
        placeholderStyle={styles.LoraRegular}
        setValue={setMines}
        setItems={setMinesItems}
      /> */}
        <ModalDropdown
          isFullWidth
          // renderSearch={(text)=> setMines(text)}
          defaultValue={mines}
          textStyle={styles.regTxt}
          renderSeparator={rowID => renderSeparator(rowID)}
          options={minesItems}
          // showSearch
          onSelect={(idx, value) => setMines(value)}
          dropdownTextStyle={[styles.dropdownText]}
          style={styles.dropDownPickerNew}
          dropdownTextHighlightStyle={{
            backgroundColor: colors.primaryOpacity,
            color: '#fff',
          }}
        />

        {minesError ? (
          <Text style={styles.errorMsg}>{'Select any one for mines!'}</Text>
        ) : (
          <View style={styles.errorMsg} />
        )}
        <TouchableOpacity
          onPress={() => requestCameraPermission()}
          style={styles.imageBox}>
          <Image
            source={images ? {uri: images} : globalImagePath.camera}
            style={images ? styles.VImages : styles.normalImage}
          />
          {images ? null : (
            <Text style={styles.regTxt}>{'Image with truck number'}</Text>
          )}
        </TouchableOpacity>
        {imageError ? (
          <Text style={styles.errorMsg}>
            {'Add your truck image with number display!'}
          </Text>
        ) : (
          <View style={styles.errorMsg} />
        )}
        <TouchableOpacity
          onPress={() => handleOpenCameraSlip()}
          style={styles.imageBox}>
          <Image
            source={
              imageWithSlip ? {uri: imageWithSlip} : globalImagePath.camera
            }
            style={imageWithSlip ? styles.VImages : styles.normalImage}
          />
          {imageWithSlip ? null : (
            <Text style={styles.regTxt}>{'Image with slip'}</Text>
          )}
        </TouchableOpacity>
        {imageWithSlipError ? (
          <Text style={styles.errorMsg}>{'Add image with slip!'}</Text>
        ) : (
          <View style={styles.errorMsg} />
        )}

        <ThemeButton
          // disabled={disabled ? true : false}
          style={{
            backgroundColor: colors.primary,
            borderColor: colors.primary,
            marginBottom: hp(3.5),
          }}
          onPress={handlePostData}
          children={route?.params?.type === 'edit' ? 'UPDATE' : 'CREATE TASK'}
          btnStyle={{color: '#fff', textTransform: 'uppercase'}}
        />
      </ScrollView>
      <Loader visible={loadVisible} />
    </View>
  );
};

export default AddItem;
