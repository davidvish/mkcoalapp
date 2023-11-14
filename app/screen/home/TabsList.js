import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useRoute, useNavigation, useIsFocused} from '@react-navigation/native';
import {Card, Headline, Subheading, TextInput} from 'react-native-paper';
import {globalImagePath} from '../../assets/Images/gloableImagePath';
import {styles} from './style';
import Header from '../../component/Header';
import Loader from '../../component/Loader';
import CheckInteretConnect from '../checkInternet/CheckInteretConnect';
import ThemeInput from '../../component/ThemeInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../assets/colors/colors';

const TabsList = () => {
  let listRef;
  const route = useRoute();
  const [index, setIndex] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [oldDataList, setOldDataList] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  console.log(filterData, 'filter');
  useEffect(() => {
    handleGetData();
    handleFilterClose();
  }, [isFocused]);

  const handleGetData = async () => {
    try {
      const querySnap = await firestore().collection('items').get();
      const res = await querySnap.docs.map(docsSnap => docsSnap.data());
      setDataList(res);
      setOldDataList(res);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const handleFilterClose = () => {
    if (route.name == 'Open') {
      setFilterData(dataList.filter(e => e.status == 'Open'));
    }
    if (route.name == 'Close') {
      setFilterData(dataList.filter(e => e.status == 'Close'));
    }
  };
  const handleScrollToTop = () => {
    listRef?.scrollToOffset({offset: 0, animated: true});
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
      let filteredAddr = filterData.filter(
        list =>
          list?.name.toLowerCase().includes(searchText.toLowerCase()) ||
          list?.companyName.toLowerCase().includes(searchText.toLowerCase()),
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
        {item.images ? (
          <Image source={{uri: item.images}} style={styles.images} />
        ) : null}
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={{width: '100%', backgroundColor: 'transparent'}}
          onChangeText={handleSearchList}
          placeholder={'Search Item'}
          right={<TextInput.Icon name="plus" size={50} color={'red'} />}
        />
      </View>
      <FlatList
        extraData={filterData}
        ref={ref => {
          listRef = ref;
        }}
        initialScrollIndex={index}
        onRefresh={onRefresh}
        // ListHeaderComponent={ListHeaderComponent}
        refreshing={isRefreshing}
        keyExtractor={(e, index) => e.dateTime.toString()}
        data={filterData}
        ListEmptyComponent={() => {
          <View>
            <Subheading style={styles.label}>{'No Data Found'}</Subheading>
          </View>;
        }}
        renderItem={renderItem}
      />
      <TouchableOpacity onPress={handleScrollToTop}  style={styles.topWrapper}>
        <MaterialCommunityIcons
          size={25}
          name="arrow-up-bold"
          color={'#fff'}
         
        />
      </TouchableOpacity>
      <Loader visible={loaderVisible} />
    </View>
  );
};

export default TabsList;
