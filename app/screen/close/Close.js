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
import {DataTable, Title} from 'react-native-paper';
import ThumbPopup from '../../component/ThummPopup';
const Close = () => {
  const [name, setName] = useState('');
  const [closeList, setCloseList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [chooseImage, setChooseImage] = useState();
  console.log(chooseImage, 'images');

  useEffect(() => {
    handleGetData();
  }, [useIsFocused]);
  const handleGetData = async () => {
    try {
      const querySnap = await firestore().collection('open').get();
      const res = (await querySnap).docs.map(docsSnap => docsSnap.data());
      console.log(res?.images, 'red');
      setCloseList(res);
    } catch (error) {
      console.log(error, 'error');
    }
  };
  const handleShowImage = image => {
    setChooseImage(image);
    setShowPopup(true);
  };
  const onRefresh = () => {
    //set isRefreshing to true
    setIsRefreshing(true);
    handleGetData();
    // and set isRefreshing to false at the end of your callApiMethod()
    setIsRefreshing(false);
  };
  const handleClose = () => {
    setShowPopup(false);
  };

  const renderItem = ({item}) => {
    // setChooseImage(item.images);
    return (
      <View style={styles.card}>
        <View style={{width: '25%'}}>
          <Text style={styles.alignLeft}>{item.name}</Text>
        </View>

        <View style={{width: '50%'}}>
          <Text style={styles.alignCenter}>{item.companyName}</Text>
          <Text style={styles.alignCenter}>{item.vehicleNumber}</Text>
          <Text style={styles.alignCenter}>{item.dateTime}</Text>
          <Text style={styles.alignCenter}>{item.endDateTime}</Text>
          <Text
            style={[
              styles.alignCenter,
              {fontFamily:'Lora-SemiBold'},
              {color: item.status === 'Open' ? 'red' : 'green'},
            ]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleShowImage(item.images)}
          style={{width: '25%'}}>
          <Text style={[styles.alignLeft, {textAlign: 'right'}]}>
            {'image'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Header title={'Details List'} />
      <View style={styles.container}>
        <FlatList
          extraData={closeList}
          onRefresh={onRefresh}
          ListHeaderComponent={() => {
            return (
              <DataTable.Header style={styles.headerList}>
                <Text style={styles.label}>Full Name</Text>
                <Text style={styles.label}>Description</Text>
                <Text style={styles.label}>Images</Text>
              </DataTable.Header>
            );
          }}
          refreshing={isRefreshing}
          keyExtractor={(item, index) => item.uid}
          data={closeList}
          renderItem={renderItem}
        />
      </View>
      {showPopup ? (
        <ThumbPopup
          image={chooseImage}
          imageType={'url'}
          onClose={handleClose}
        />
      ) : null}
    </View>
  );
};

export default Close;
