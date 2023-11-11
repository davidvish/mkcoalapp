import {Text, View, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/Header';
import firestore from '@react-native-firebase/firestore';

import {useIsFocused} from '@react-navigation/native';
import {styles} from './style';
import {DataTable, Subheading, Title} from 'react-native-paper';
import ThumbPopup from '../../component/ThummPopup';
import {globalImagePath} from '../../assets/Images/gloableImagePath';
import {colors} from '../../assets/colors/colors';
import Loader from '../../component/Loader';
const Close = () => {
  const [closeList, setCloseList] = useState([]);
  const isFocused = useIsFocused();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [chooseImage, setChooseImage] = useState();
  const [loaderVisible, setLoaderVisible] = useState(false);

  useEffect(() => {
    handleGetData();
  }, [isFocused]);
  const handleGetData = async () => {
    setLoaderVisible(true);
    try {
      const querySnap = await firestore().collection('items').get();
      const res = (await querySnap).docs.map(docsSnap => docsSnap.data());
      setCloseList(res);
      setLoaderVisible(false);
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
          <Subheading style={styles.alignLeft}>{item.name}</Subheading>
        </View>

        <View style={{width: '55%'}}>
          <Subheading style={styles.alignLeft}>{item.companyName}</Subheading>
          <Subheading style={styles.alignLeft}>{item.number}</Subheading>
          <Subheading style={styles.alignLeft}>{item.vehicleNumber}</Subheading>
          <Subheading style={styles.label}>
            Dispatch Date :-{' '}
            <Subheading style={styles.boldText}>{item.dateTime}</Subheading>
          </Subheading>
          {item.status === 'Close' && item?.endDateTime ? (
            <Subheading style={styles.label}>
              Delivery Date :-{' '}
              <Subheading style={styles.boldText}>
                {item.endDateTime}
              </Subheading>
            </Subheading>
          ) : null}
          <Subheading
            style={[
              styles.alignLeft,
              {fontFamily: 'Lora-SemiBold'},
              {color: item.status === 'Open' ? 'red' : 'green'},
            ]}>
            {item.status.toUpperCase()}
          </Subheading>
        </View>
        <TouchableOpacity
          onPress={() => handleShowImage(item.images)}
          style={{width: '15%', backgroundColor: colors.primary}}>
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
          <Subheading style={styles.label}>Name</Subheading>
          <Subheading style={styles.label}>Description</Subheading>
          <Subheading style={styles.label}>Image</Subheading>
        </DataTable.Header>
        <FlatList
          extraData={closeList}
          onRefresh={onRefresh}
          maxToRenderPerBatch={10}
          initialNumToRender={10}
          refreshing={isRefreshing}
          keyExtractor={(item, index) => item.uid + index}
          data={closeList.sort((a, b) => a.name.localeCompare(b.name))}
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
      <Loader visible={loaderVisible} />
    </View>
  );
};

export default Close;
