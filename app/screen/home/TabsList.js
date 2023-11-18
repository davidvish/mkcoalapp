import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  useRoute,
  useNavigation,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import {Card, Headline, Subheading, TextInput} from 'react-native-paper';
import {globalImagePath} from '../../assets/Images/gloableImagePath';
import {styles} from './style';
import Loader from '../../component/Loader';
import CheckInteretConnect from '../checkInternet/CheckInteretConnect';
import ThemeInput from '../../component/ThemeInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../assets/colors/colors';
import moment from 'moment';
import {responsiveFontSize as rfs} from 'react-native-responsive-dimensions';

const TabsList = () => {
  let listRef;
  const route = useRoute();
  const [index, setIndex] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [oldDataList, setOldDataList] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterData, setFilterData] = useState(dataList);
  const [todayTotalItem, setTodayTotalItem] = useState(0);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
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
  const handleCountItem = () => {
    const dateCount = filterData.map(e => e.endDate ? e.endDate :  e.date );
    const handleTotalTodayItems = (array, value) => {
      var count = 0;
      dateCount.forEach(v => v === value && count++);
      return count;
    };
    const date = new Date();
    const dt2 = moment(date);
    const todayCount = dt2.format('DD/MM/YYYY');
    let countTodayItem = handleTotalTodayItems(dateCount, todayCount); // todat list
    setTodayTotalItem(countTodayItem);
  };

  const handleFilter = program => {
    setFilterData(program);
    if (route.name === 'Open') {
      let OpenDataList = dataList.filter(e => e.status == 'Open');
      setFilterData(OpenDataList);
    }
    if (route.name === 'Close') {
      let CloseDataList = dataList.filter(e => e.status == 'Close');
      setFilterData(CloseDataList);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      handleFilter(dataList);
    }, [dataList]),
  );

  useEffect(() => {
    handleGetData();
    handleCountItem();
  }, [isFocused,todayTotalItem]);
  const handleScrollToTop = () => {
    listRef?.scrollToOffset({offset: 0, animated: true});
  };

  const onRefresh = () => {
    //set isRefreshing to true
    setIsRefreshing(true);
    handleFilter();
    // and set isRefreshing to false at the end of your callApiMethod()
    setIsRefreshing(false);
  };
  const handleSearchList = searchText => {
    if (searchText?.length) {
      let filteredAddr = filterData.filter(
        list =>
          list?.name.toLowerCase().includes(searchText.toLowerCase()) ||
          list?.date.includes(searchText) ||
          // list?.endDate.includes(searchText) ||
          list?.companyName.toLowerCase().includes(searchText.toLowerCase()) ||
          list?.vehicleNumber.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilterData(filteredAddr);
    } else setFilterData(oldDataList);
  };
  const renderItem = ({item}) => {
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
          Mines:- <Subheading style={styles.regTxt}>{item.mines}</Subheading>
        </Subheading>

        <Subheading style={styles.label}>
          Dispatch Date :-{' '}
          <Subheading style={styles.regTxt}>{`${item.date} ${item.startTime}` }</Subheading>
        </Subheading>
        {item.status === 'Close' && item?.endDate ? (
          <Subheading style={styles.label}>
            Delivery Date :-{' '}
            <Subheading style={styles.regTxt}>{`${item.endDate} ${item.endTime}`}</Subheading>
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {item.images ? (
            <Image source={{uri: item.images}} style={styles.images} />
          ) : null}
          {item.imageWithSlip ? (
            <Image source={{uri: item.imageWithSlip}} style={styles.images} />
          ) : null}
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {filterData.length > 0 ? (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              style={{width: '100%', backgroundColor: 'transparent'}}
              onChangeText={handleSearchList}
              placeholder={'Search Item'}
              right={<TextInput.Icon name="plus" size={50} color={'red'} />}
            />
          </View>
          <Text style={[styles.ttcLabal]}>
            Total List:- {filterData?.length}/
            <Text style={{fontFamily: 'Lora-Bold', fontSize: rfs(2)}}>
              {todayTotalItem}
            </Text>
          </Text>
        </>
      ) : null}

      {filterData?.length == 0 ? (
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
        extraData={filterData}
        ref={ref => {
          listRef = ref;
        }}
        initialScrollIndex={index}
        onRefresh={onRefresh}
        // ListHeaderComponent={ListHeaderComponent}
        refreshing={isRefreshing}
        contentContainerStyle={styles.listBottom}
        keyExtractor={(e, index) => index.toString()}
        data={filterData}
        renderItem={renderItem}
      />

      {dataList.length > 1 ? (
        <TouchableOpacity onPress={handleScrollToTop} style={styles.topWrapper}>
          <MaterialCommunityIcons
            size={25}
            name="arrow-up-bold"
            color={'#fff'}
          />
        </TouchableOpacity>
      ) : null}
      <Loader visible={loaderVisible} />
    </View>
  );
};

export default TabsList;
