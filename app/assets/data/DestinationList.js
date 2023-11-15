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
  {label: 'Gondwali', value: 'Gondwali'},
  {label: 'GajraBahra', value: 'GajraBahra'},
  {label: 'Sarai', value: 'Sarai'},
  {label: 'Bargawan', value: 'Bargawan'},
  {label: 'Mahadeya', value: 'Mahadeya'},
  {label: 'Morwa', value: 'Morwa'},
  {label: 'Krishnahila', value: 'Krishnahila'},
  {label: ' Mahan TPP', value: ' Mahan TPP'},
  {label: 'Hindalco Mahan', value: 'Hindalco Mahan'},
  {label: 'Lanco TPP', value: 'Lanco TPP'},
  {label: 'Anpara TPP', value: 'Anpara TPP'},
];


