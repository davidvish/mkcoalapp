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
import {DataTable, Subheading, Title} from 'react-native-paper';
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
    setChooseImage(item.images);
    setName(item.name);
    return (
      <View style={styles.card}>
        <Subheading style={{textAlign: 'left', width: '25%'}}>
          {item.name}
        </Subheading>
        <View style={{width: '50%'}}>
          <Subheading style={{textAlign: 'center'}}>
            {item.companyName}
          </Subheading>
          <Subheading style={{textAlign: 'center'}}>
            {item.vehicleNumber}
          </Subheading>
          <Subheading style={{textAlign: 'center'}}>{item.dateTime}</Subheading>
          <Subheading
            style={{
              textAlign: 'center',
              color: item.status === 'Open' ? 'red' : 'green',
              fontWeight:'700',
              textTransform:'uppercase'
            }}>
            {item.status.toUpperCase()}
          </Subheading>
        </View>
        <TouchableOpacity
          onPress={() => setShowPopup(true)}
          style={{width: '25%'}}>
          <Subheading style={{textAlign: 'right'}}>{'image'}</Subheading>
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
                <Subheading>Full Name</Subheading>
                <Subheading>Description</Subheading>
                <Subheading>Images</Subheading>
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
          title={name}
          imageType={'url'}
          onClose={handleClose}
        />
      ) : null}
    </View>
  );
};

export default Close;
