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
import {
  ActivityIndicator,
  Checkbox,
  Modal,
  Title,
  Card,
  Subheading,
  Headline,
} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import CheckInteretConnect from '../checkInternet/CheckInteretConnect';
import Loader from '../../component/Loader';
const Home = () => {
  const route = useRoute();
  const [isConnected, setIsConnected] = useState(false);
  const [dateTime, setDateTime] = useState();
  const [dataList, setDataList] = useState([]);
  console.log(dataList, 'openList');
  const [oldData, setOldData] = useState([]);
  const [openSelect, setOpenSelect] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [index, setIndex] = useState(0);
  const listRef = useRef();
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [loaderVisible, setLoaderVisible] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const handleGetData = async () => {
    setLoaderVisible(true);
    try {
      const querySnap = await firestore().collection('open').get();
      const res = (await querySnap).docs.map(docsSnap => docsSnap.data());

      setDataList(res);
      setOldData(res);
      setLoaderVisible(false);
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
    // let tempData = dataList.sort((a, b) =>
    //   a.status.toLowerCase() > b.status.toLowerCase() ? -1 : 1,
    // );
    setDataList(tempData);
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
    if (searchText?.length) {
      let filteredAddr = dataList.filter(
        list =>
          list?.name.toLowerCase().includes(searchText.toLowerCase()) ||
          list?.companyName.toLowerCase().includes(searchText.toLowerCase()),
      );
      setDataList(filteredAddr);
    } else setDataList(oldData);
  };
  const renderItem = ({item}) => {
    console.log(item, 'item');
    return (
      <Card style={[styles.card]}>
        <View style={styles.flexRow}>
          <Headline style={[styles.boldText]}>{item.name}</Headline>
          <TouchableOpacity
            // disabled={item.status === 'Open' ? false : true}
            onPress={() =>
              navigation.navigate('AddItem', {data: item, type: 'edit'})
            }>
            <Image source={globalImagePath.edit} style={styles.editEvent} />
          </TouchableOpacity>
        </View>
        <Headline style={[styles.boldText]}>{item.number}</Headline>
        <Subheading style={styles.label}>
          Company Name:-{' '}
          <Subheading style={styles.regTxt}>{item.companyName}</Subheading>
        </Subheading>

        <Subheading style={styles.label}>
          Dispatch Date :-{' '}
          <Subheading style={styles.regTxt}>{item.dateTime}</Subheading>
        </Subheading>
        {item.status === 'Close' && item?.endDateTime ? (
          <Subheading style={styles.label}>
            Delivery Date :-{' '}
            <Subheading style={styles.regTxt}>{item.endDateTime}</Subheading>
          </Subheading>
        ) : null}
        <Subheading style={styles.label}>
          Vehicle Number:-{' '}
          <Subheading style={[styles.regTxt]}>
            {item.vehicleNumber.toUpperCase()}
          </Subheading>
        </Subheading>
        <Subheading style={styles.label}>
          <Subheading
            style={[
              styles.regTxt,
              {
                fontFamily: 'Lora-Bold',
                color: item.status === 'Open' ? 'red' : 'green',
              },
            ]}>
            {item.status.toUpperCase()}
          </Subheading>
        </Subheading>
        <Image source={{uri: item.images}} style={styles.images} />
      </Card>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Header title={'Home'} />
      {isConnected == true ? (
        <View style={{flex: 1}}>
          <View style={styles.container}>
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
            <FlatList
              extraData={dataList}
              ref={listRef}
              initialScrollIndex={index}
              onRefresh={onRefresh}
              refreshing={isRefreshing}
              keyExtractor={(e, index) => e.uid + index}
              data={dataList.sort((a, b) => a.name.localeCompare(b.name))}
              ListEmptyComponent={() => {
                <View>
                  <Subheading style={styles.label}>
                    {'No Data Found'}
                  </Subheading>
                </View>;
              }}
              renderItem={renderItem}
            />
          </View>
        </View>
      ) : null}

      <CheckInteretConnect
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      />
      <Loader visible={loaderVisible} />
    </View>
  );
};

export default Home;
