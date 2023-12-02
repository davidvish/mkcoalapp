import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/Header';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useIsFocused} from '@react-navigation/native';
import {styles} from './style';
import {DataTable, Subheading, Title, TextInput} from 'react-native-paper';
import ThumbPopup from '../../component/ThummPopup';
import {globalImagePath} from '../../assets/Images/gloableImagePath';
import {colors} from '../../assets/colors/colors';
import Loader from '../../component/Loader';
import Login from '../Login';
import auth from '@react-native-firebase/auth';
import ThemeButton from '../../component/ThemeButton';

const TableList = () => {
  let listRef;
  const [dataList, setDataList] = useState([]);
  const isFocused = useIsFocused();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [chooseImage, setChooseImage] = useState();
  const [loaderVisible, setLoaderVisible] = useState(false);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [oldDataList, setOldDataList] = useState([]);

  // Handle user state changes
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };
  const handleGetData = async () => {
    setLoaderVisible(true);
    try {
      const querySnap = await firestore().collection('new').get();
      const res = (await querySnap).docs.map(docsSnap => docsSnap.data());
      setDataList(res);
      setOldDataList(res);
      setLoaderVisible(false);
    } catch (error) {
      console.log(error, 'error');
    }
  };
  const handleSearchList = searchText => {
    if (searchText?.length) {
      let filteredAddr = dataList.filter(
        list =>
          list?.name.toLowerCase().includes(searchText.toLowerCase()) ||
          list?.date.includes(searchText) ||
          // list?.endDate.includes(searchText) ||
          list?.companyName.toLowerCase().includes(searchText.toLowerCase()) ||
          list?.mines.toLowerCase().includes(searchText.toLowerCase()) ||
          list?.number.toLowerCase().includes(searchText.toLowerCase()) ||
          list?.vehicleNumber.toLowerCase().includes(searchText.toLowerCase()),
      );
      setDataList(filteredAddr);
    } else setDataList(oldDataList);
  };
  useEffect(() => {
    handleGetData();
  }, [isFocused]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

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
  const handleScrollToTop = () => {
    listRef?.scrollToOffset({offset: 0, animated: true});
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
            <Subheading
              style={
                styles.boldText
              }>{`${item.date} ${item.startTime}`}</Subheading>
          </Subheading>
          {item.status === 'Close' && item?.endDate ? (
            <Subheading style={styles.label}>
              Delivery Date :-{' '}
              <Subheading style={styles.boldText}>
                {`${item.endDate} ${item.endTime}`}
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
        <View>
          <TouchableOpacity
            onPress={() => handleShowImage(item.images)}
            style={{width: '100%', backgroundColor: colors.primary}}>
            <Image source={{uri: item.images}} style={styles.image} />
          </TouchableOpacity>
          {item.imageWithSlip ? (
            <TouchableOpacity
              onPress={() => handleShowImage(item.imageWithSlip)}
              style={{
                width: '100%',
                backgroundColor: colors.primary,
                marginTop: 10,
              }}>
              <Image source={{uri: item.imageWithSlip}} style={styles.image} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };
  const handleLogout = async () => {
    await auth()
      .signOut()
      .then(() => {
        Alert.alert('Logout Successfully');
      });
  };

  if (!user) {
    return <Login />;
  }

  return (
    <View style={{flex: 1}}>
      <Header title={'List'} />

      <View style={styles.container}>
        <DataTable.Header style={styles.headerList}>
          <Subheading style={styles.label}>Name</Subheading>
          <Subheading style={styles.label}>Description</Subheading>
          <Subheading style={styles.label}>Image</Subheading>
        </DataTable.Header>
        <View style={styles.inputContainer}>
          <TextInput
            style={{width: '100%', backgroundColor: 'transparent'}}
            onChangeText={handleSearchList}
            placeholder={'Search Item'}
            right={<TextInput.Icon name="plus" size={50} color={'red'} />}
          />
        </View>
        {dataList?.length == 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text style={[styles.label, {textAlign: 'center'}]}>
              {'No data found'}
            </Text>
          </View>
        ) : null}
        <FlatList
          extraData={dataList}
          ref={ref => {
            listRef = ref;
          }}
          onRefresh={onRefresh}
          contentContainerStyle={styles.listBottom}
          maxToRenderPerBatch={10}
          initialNumToRender={10}
          refreshing={isRefreshing}
          keyExtractor={(e, index) => e.status == 'Open'}
          data={dataList}
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
      {dataList?.length > 1 ? (
        <TouchableOpacity onPress={handleScrollToTop} style={styles.topWrapper}>
          <MaterialCommunityIcons
            size={25}
            name="arrow-up-bold"
            color={'#fff'}
          />
        </TouchableOpacity>
      ) : null}
      <Loader visible={loaderVisible} />
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={[styles.regTxt, {color: '#fff', textAlign: 'center'}]}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TableList;
