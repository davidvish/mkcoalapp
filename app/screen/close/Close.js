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
import Header from '../../component/Header';
import {
  responsiveHeight as hp,
  responsiveFontSize as rfs,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import ThemeInput from '../../component/ThemeInput';
import DropDown from 'react-native-paper-dropdown';
import DropDownList from '../../component/DropDown';
import DropDownPicker from 'react-native-dropdown-picker';
import ThemeButton from '../../component/ThemeButton';
import {launchCamera} from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {globalImagePath} from '../../assets/Images/gloableImagePath';
import {colors} from '../../assets/colors/colors';
import {useIsFocused} from '@react-navigation/native';
import uuid from 'react-native-uuid';
import FastImage from 'react-native-fast-image';
import {styles} from './style';
const Close = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [images, setImages] = useState('');
  const [openStatus, setOpenStatus] = useState(false);
  const [status, setStatus] = useState('Close');
  const [disabled, setDisable] = useState(false);
  const [dateTime, setDateTime] = useState();
  const [number, setNumber] = useState('');
  const [closeList, setCloseList] = useState([]);
  const [uid, setUid] = useState(uuid.v4().toString());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState([
    {label: 'Wipro', value: 'Wipro'},
    {label: 'Tata', value: 'Tata'},
    {label: 'Rinira', value: 'Rinira'},
    {label: 'Infosys', value: 'Infosys'},
  ]);
  const [error, setError] = useState({field: '', message: ''});

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setDateTime(
      date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    );
    setDisable(!name || !vehicleNumber || !images || !companyName || !number);
  });

  const handleBlankField = () => {
    setName(''),
      setNumber(''),
      setDateTime(''),
      setImages(''),
      setCompanyName(''),
      setVehicleNumber('');
  };
  const handlePostData = async () => {
    let id = index + 1;
    const listError = {field: '', message: '', min: ''};
    if (name === '') {
      listError.field = 'name';
      listError.message = 'full name required!';
      setError(listError);
      return;
    } else if (companyName === '') {
      listError.field = 'companyName';
      listError.message = 'company name name required!';
      setError(listError);
    } else if (vehicleNumber === '') {
      listError.field = 'vehicleNumber';
      listError.message = 'vehicle number name name required!';
      setError(listError);
      return;
    } else if (images === '') {
      listError.min < 10;
      listError.field = 'images';
      listError.message = 'image name required!';
      setError(listError);
      return;
    } else if (number === '') {
      listError.field = 'number';
      listError.message = 'phone number required!';
      setError(listError);
      return;
    }

    try {
      const dataList = await firestore().collection('close').add({
        name,
        vehicleNumber,
        companyName,
        images,
        status,
        number,
        dateTime,
        id,
        uid,
      });
      Alert.alert('List added succussfully');
    } catch (error) {
      console.log(error);
    }
    handleBlankField();
    setFormVisible(false);
  };
  useEffect(() => {
    handleGetData();
  }, [useIsFocused]);
  const handleGetData = async () => {
    try {
      const querySnap = await firestore().collection('close').get();
      const res = (await querySnap).docs.map(docsSnap => docsSnap.data());

      setCloseList(res);
    } catch (error) {
      console.log(error, 'error');
    }
  };
  const onRefresh = () => {
    //set isRefreshing to true
    setIsRefreshing(true);
    handleGetData();
    // and set isRefreshing to false at the end of your callApiMethod()
    setIsRefreshing(false);
  };
  const handleOpenCamera = () => {
    launchCamera({quality: 0.5}, fileObj => {
      console.log(fileObj.assets[0].uri);
      const uploadTask = storage()
        .ref()
        .child(`/close/${Date.now()}`)
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
          Full Name:- <Text style={styles.regTxt}>{item.name}</Text>
        </Text>
        <Text style={styles.label}>
          Phone Number:- <Text style={styles.regTxt}>{item.number}</Text>
        </Text>
        <Text style={styles.label}>
          Company Name:- <Text style={styles.regTxt}>{item.companyName}</Text>
        </Text>

        <Text style={styles.label}>
          Dispatch Date :- <Text style={styles.regTxt}>{item.dateTime}</Text>
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
            {item.status}
          </Text>
        </Text>
        <Image source={{uri: item.images}} style={styles.images} />
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Header title={'Close List'} />
      <View style={styles.container}>
        <FlatList
          extraData={closeList}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          keyExtractor={(item, index) => item.uid}
          data={closeList}
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
                value={name}
                placeholder={'Full Name'}
                onChangeText={txt => setName(txt)}
              />
              {error.field === 'name' && (
                <Text style={styles.errorMsg}>{error.message}</Text>
              )}
              <ThemeInput
                style={styles.bottomSpace}
                value={number}
                keyboardType={'number-pad'}
                placeholder={'Phone Number'}
                onChangeText={txt => setNumber(txt)}
              />
              {error.field === 'number' && (
                <Text style={styles.errorMsg}>{error.message}</Text>
              )}

              <ThemeInput
                style={[styles.bottomSpace, {textTransform: 'uppercase'}]}
                value={vehicleNumber}
                placeholder={'Vehicle Number'}
                onChangeText={txt => setVehicleNumber(txt)}
              />
              {error.field === 'vehicleNumber' && (
                <Text style={styles.errorMsg}>{error.message}</Text>
              )}

              <ThemeInput
                style={[
                  styles.bottomSpace,
                  {textTransform: 'uppercase', color: '#000'},
                ]}
                value={status}
                disabled={true}
                // placeholder={'Status'}
                // onChangeText={txt => setStatus(txt)}
              />

              {/* <DropDownPicker
                style={[styles.bottomSpace, {backgroundColor: '#f5f5f5'}]}
                open={openStatus}
                value={status}
                items={itemStatus}
                placeholder="Status"
                setOpen={setOpenStatus}
                setValue={setStatus}
                setItems={setItemStatus}
              /> */}
              {error.field === 'status' && (
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

              <ThemeButton
                disabled={disabled ? true : false}
                style={{backgroundColor: disabled ? '#ccc' : colors.primary}}
                onPress={handlePostData}
                children={'Submit'}
                btnStyle={{color: '#fff'}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Close;
