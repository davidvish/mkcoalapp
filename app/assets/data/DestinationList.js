// import {StyleSheet, Text, View, Modal} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import firestore from '@react-native-firebase/firestore';

// const DestinationList = ({visible}) => {
//   const [DestinationList, setDestinationList] = useState();
//   useEffect(() => {
//     handleDestinationList();
//   }, []);
//   const handleDestinationList = async () => {
//     try {
//       const querySnap = await firestore().collection('DestinationList').get();
//       const res = (await querySnap).docs.map(docsSnap => docsSnap.data());
//       setDestinationList(res[0]?.DestinationList);
//     } catch (error) {
//       console.log(error, 'error');
//     }
//   };
//   return (
//     <Modal visible={visible} transparent>
//       <FlatList />
//     </Modal>
//   );
// };

// export default DestinationList;

// const styles = StyleSheet.create({});

export const CompanyDestination = [
  'Gondwali',
  'GajraBahra',
  'Sarai',
  'Bargawan',
  'Mahadeya',
  'Morwa',
  'Krishnahila',
  ' Mahan TPP',
  'Hindalco Mahan',
  'Lanco TPP',
  'Anpara TPP',
];
