import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Header from '../../component/Header';
import firestore from '@react-native-firebase/firestore';
import {globalImagePath} from '../../assets/Images/gloableImagePath';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {styles} from './style';
import ThemeInput from '../../component/ThemeInput';
import {responsiveHeight as hp} from 'react-native-responsive-dimensions';
import RNRestart from 'react-native-restart';
import {ActivityIndicator, Checkbox, Modal, Title} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
const Home = () => {
  const route = useRoute();
  const [dateTime, setDateTime] = useState();
  const [openList, setOpenList] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [openSelect, setOpenSelect] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [index, setIndex] = useState(0);
  const listRef = useRef();
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const handleGetData = async () => {
    try {
      const querySnap = await firestore().collection('open').get();
      const res = (await querySnap).docs.map(docsSnap => docsSnap.data());

      setOpenList(res);
      setOldData(res);
    } catch (error) {
      console.log(error, 'error');
    }
  };
  useEffect(() => {
    // RNRestart.Restart();
    handleGetData();
    handleSearchList();
  }, [isFocused]);

  const handleOpenSelect = () => {
    // let tempData = openList.sort((a, b) =>
    //   a.status.toLowerCase() > b.status.toLowerCase() ? -1 : 1,
    // );
    setOpenList(tempData);
    setFilterModal(false);
  };
  const handleFilterClose = () => {
    setFilterModal(false);
  };

  const onRefresh = () => {
    //set isRefreshing to true
    setIsRefreshing(true);
    handleGetData();
    // and set isRefreshing to false at the end of your callApiMethod()
    setIsRefreshing(false);
  };

  const handleSearchList = searchText => {
    // if (searchText == '') {
    //   setOpenList(oldData);
    // } else {
    //   const searchOpenList = openList.filter(list => {
    //     return (
    //       (list?.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
    //         list?.status.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
    //         list?.companyName.toLowerCase().indexOf(searchText.toLowerCase()) >
    //           -1 ||
    //         list?.vehicleNumber
    //           .toLowerCase()
    //           .indexOf(searchText.toLowerCase())) > -1
    //     );
    //   });
    //   setOpenList(searchOpenList);
    // }
  };
  const renderItem = ({item}) => {
    console.log(item, 'item');
    return (
      <View>
        <View
          style={[styles.card, {opacity: item.status === 'Close' ? 0.5 : 1}]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.label}>
              Name:- <Text style={styles.regTxt}>{item.name}</Text>
            </Text>
            <TouchableOpacity
              // disabled={item.status === 'Open' ? false : true}
              onPress={() =>
                navigation.navigate('AddItem', {data: item, type: 'edit'})
              }>
              <Image source={globalImagePath.edit} style={styles.editEvent} />
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>
            Phone Number:-{' '}
            <Text style={[styles.regTxt, {fontFamily: 'Lora-Bold'}]}>
              {item.number}
            </Text>
          </Text>
          <Text style={styles.label}>
            Company Name:- <Text style={styles.regTxt}>{item.companyName}</Text>
          </Text>

          <Text style={styles.label}>
            Dispatch Date :- <Text style={styles.regTxt}>{item.dateTime}</Text>
          </Text>
          {item.status === 'Close' && item?.endDateTime ? (
            <Text style={styles.label}>
              Delivery Date :-{' '}
              <Text style={styles.regTxt}>{item.endDateTime}</Text>
            </Text>
          ) : null}
          <Text style={styles.label}>
            Vehicle Name:-{' '}
            <Text style={[styles.regTxt]}>
              {item.vehicleNumber.toUpperCase()}
            </Text>
          </Text>
          <Text style={styles.label}>
            Status:-{' '}
            <Text
              style={[
                styles.regTxt,
                {
                  fontFamily: 'Lora-Bold',
                  color: item.status === 'Open' ? 'red' : 'green',
                },
              ]}>
              {item.status.toUpperCase()}
            </Text>
          </Text>
          <Image source={{uri: item.images}} style={styles.images} />
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Header title={'Home'} />
      <View style={styles.container}>
        {openList.length ? (
          <View style={styles.inputContainer}>
            <ThemeInput
              onChangeText={handleSearchList}
              placeholder={'Search Item'}
            />

            {/* <TouchableOpacity
              style={styles.filter}
              onPress={() => setFilterModal(true)}>
              <Image source={globalImagePath.filter} style={styles.search} />
            </TouchableOpacity> */}
          </View>
        ) : null}
        <FlatList
          extraData={openList}
          ref={listRef}
          maxToRenderPerBatch={10}
          initialNumToRender={10}
          initialScrollIndex={index}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          keyExtractor={(e, index) => e.itemId}
          data={openList}
          ListEmptyComponent={() => {
            <View>
              <Text style={styles.label}>{'No Data Found'}</Text>
            </View>;
          }}
          renderItem={renderItem}
        />
      </View>
      <Modal
        animationType="slide"
        onDismiss={handleFilterClose}
        visible={filterModal}
        transparent>
        <View style={styles.parentContainer}>
          <Pressable
            style={{height: '100%', width: '100%'}}
            onPress={handleFilterClose}></Pressable>
          <View style={styles.parentWrapper}>
            <View style={styles.modalWrapper}>
              <TouchableOpacity
                style={styles.flexFilter}
                onPress={() => {
                  let tempData = openList.sort((a, b) =>
                    a.status.toLowerCase() > b.status.toLowerCase() ? -1 : 1,
                  );
                  listRef.current?.scrollToIndex({animated: true, index: 0});
                  setOpenList(tempData);
                  handleFilterClose();
                }}>
                {/* <Checkbox /> */}
                <Text style={styles.label}>{'Status - Open'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  let tempData = openList.sort((a, b) =>
                    a.status.toLowerCase() > b.status.toLowerCase() ? 1 : -1,
                  );
                  listRef.current?.scrollToIndex({animated: true, index: 0});
                  setOpenList(tempData);
                  handleFilterClose();
                }}
                style={styles.flexFilter}>
                {/* <Checkbox /> */}
                <Text style={styles.label}>{'Status - Close'}</Text>
              </TouchableOpacity>
              <View>
                <Text>{'To'}</Text>
                <TouchableOpacity onPress={() => setStartDateOpen(true)}>
                  <Text>{'To'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* <DatePicker
        mode="date"
        modal={startDateOpen}
        onDateChange={(text)=> setStartDate(text)}
        date={startDate}
        onCancel={() => setStartDateOpen(false)}
      /> */}
    </View>
  );
};

export default Home;
