import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/Header';
import firestore from '@react-native-firebase/firestore';
import {globalImagePath} from '../../assets/Images/gloableImagePath';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {styles} from './style';
const Home = () => {
  const [dateTime, setDateTime] = useState();
  const [openList, setOpenList] = useState([]);
  const [searchItem, setSearchItem] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
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
    // handleSearchList();
    handleGetData();
  }, [useIsFocused]);

  const onRefresh = () => {
    //set isRefreshing to true
    setIsRefreshing(true);
    handleGetData();
    // and set isRefreshing to false at the end of your callApiMethod()
    setIsRefreshing(false);
  };

  // const handleSearchList = searchText => {
  //   if (searchText?.length) {
  //     const searchOpenList = openList.filter(list =>
  //       list?.name.toLowerCase().includes(searchText.toLowerCase()),
  //     );
  //     setSearchItem(searchOpenList);
  //   } else setSearchItem(openList);
  // };
  const renderItem = ({item}) => {
    return (
      <View>
        <View style={styles.card}>
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
          <Text style={styles.label}>
            Vehicle Name:-{' '}
            <Text style={[styles.regTxt, {textTransform: 'uppercase'}]}>
              {item.vehicleNumber}
            </Text>
          </Text>
          <Text style={styles.label}>
            Status:-{' '}
            <Text style={[styles.regTxt, {textTransform: 'uppercase'}]}>
              {item.status}
            </Text>
          </Text>
          <Image source={{uri: item.images}} style={styles.images} />
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Header title={'Open List'} />
      <View style={styles.container}>
        {/* <View style={{flexDirection:'row',alignItems:'center'}}>
          <ThemeInput onChangeText={handleSearchList} placeholder={'Search Item'} />
          <Image  source={globalImagePath.search} style={styles.search}/>
        </View> */}
        <FlatList
          horizontal
          extraData={openList}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          keyExtractor={(item, index) => item.dateTime}
          data={openList}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default Home;
