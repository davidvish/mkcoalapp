import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/Header';
import firestore from '@react-native-firebase/firestore';
import {globalImagePath} from '../../assets/Images/gloableImagePath';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {styles} from './style';
import ThemeInput from '../../component/ThemeInput';
import {responsiveHeight as hp} from 'react-native-responsive-dimensions';
import RNRestart from 'react-native-restart';
const Home = () => {
  const route = useRoute();
  const [dateTime, setDateTime] = useState();
  const [openList, setOpenList] = useState([]);
  const [searchItem, setSearchItem] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const handleGetData = async () => {
    try {
      const querySnap = await firestore().collection('open').get();
      const res = (await querySnap).docs.map(docsSnap => docsSnap.data());

      setOpenList(res);
    } catch (error) {
      console.log(error, 'error');
    }
  };
  useEffect(() => {
    // RNRestart.Restart();
    handleGetData();
    handleSearchList();
  }, [isFocused]);

  const onRefresh = () => {
    //set isRefreshing to true
    setIsRefreshing(true);
    handleGetData();
    // and set isRefreshing to false at the end of your callApiMethod()
    setIsRefreshing(false);
  };

  const handleSearchList = searchText => {
    if (searchText?.length) {
      const searchOpenList = openList.filter(
        list =>
          list?.name.toLowerCase().includes(searchText.toLowerCase()) ||
          list?.status.toLowerCase().includes(searchText.toLowerCase()) ||
          list?.companyName.toLowerCase().includes(searchText.toLowerCase()) ||
          list?.vehicleNumber.toLowerCase().includes(searchText.toLowerCase()),
      );
      setSearchItem(searchOpenList);
    } else setSearchItem(openList);
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
              Full Name:- <Text style={styles.regTxt}>{item.name}</Text>
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
            Phone Number:- <Text style={styles.regTxt}>{item.number}</Text>
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

            <Image
              source={
                searchItem.length
                  ? globalImagePath.search
                  : globalImagePath.search
              }
              style={styles.search}
            />
          </View>
        ) : null}
        <FlatList
          extraData={searchItem}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          keyExtractor={(e, index) => e.itemId}
          data={searchItem}
          ListEmptyComponent={() => {
            <View>
              <Text>{'ksagfb'}</Text>
            </View>;
          }}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default Home;
