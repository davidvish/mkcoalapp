import {Text, View, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/Header';
import firestore from '@react-native-firebase/firestore';

import {useIsFocused} from '@react-navigation/native';
import {styles} from './style';
import {DataTable} from 'react-native-paper';
import ThumbPopup from '../../component/ThummPopup';
import {globalImagePath} from '../../assets/Images/gloableImagePath';
const Close = () => {
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
        <View style={{width: '30%'}}>
          <Text style={styles.alignLeft}>{item.name}</Text>
        </View>

        <View style={{width: '55%'}}>
          <Text style={styles.alignLeft}>{item.companyName}</Text>
          <Text style={styles.alignLeft}>{item.number}</Text>
          <Text style={styles.alignLeft}>{item.vehicleNumber}</Text>
          <Text style={styles.alignLeft}>{item.dateTime}</Text>
          {item.endDateTime ? (
            <Text style={styles.alignLeft}>{item.endDateTime}</Text>
          ) : null}
          <Text
            style={[
              styles.alignLeft,
              {fontFamily: 'Lora-SemiBold'},
              {color: item.status === 'Open' ? 'red' : 'green'},
            ]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleShowImage(item.images)}
          style={{width: '15%', backgroundColor: 'red'}}>
          <Image source={{uri: item.images}} style={styles.image} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Header title={'List'} />
      <View style={styles.container}>
        <DataTable.Header style={styles.headerList}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.label}>Images</Text>
        </DataTable.Header>
        <FlatList
          extraData={closeList}
          onRefresh={onRefresh}
          maxToRenderPerBatch={10}
          initialNumToRender={10}
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
