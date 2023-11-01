import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-paper';
import { responsiveWidth as wp } from 'react-native-responsive-dimensions';

const ThumbPopup = ({ image, title, onClose, imageType }) => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(true);
  const imageRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const fetchImageSize = async () => {
      if (imageType === 'url') {
        const { width, height } = await FastImage.preload([{ uri: image }]);
        setImageSize({ width, height });
      } else {
        Image.getSize(image?.uri, (width, height) =>
          setImageSize({ width, height }),
        );
      }
    };

    fetchImageSize();
  }, []);

  const aspectRatio =
    imageSize.width !== 0 && imageSize.height !== 0
      ? imageSize.width / imageSize.height
      : 1;

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 300,
    }).start(() => setVisible(true));
  }, []);

  // const handleClose = () => {
  //   Animated.spring(scaleValue, {
  //     toValue: 0,
  //     useNativeDriver: true,
  //   }).start(onClose);
  // };
  const handleClose = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      useNativeDriver: true,
      duration: 380,
    }).start(() => {
      onClose();
      setVisible(!visible);
    });
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <Modal animationType="none" visible={visible} transparent>
      <TouchableOpacity style={styles.modalContainer} onPress={handleClose}>
        <Animated.View style={[styles.modalContent, animatedStyle]}>
          {/* <Text style={styles.title}>{title}</Text> */}
          <Image
            ref={imageRef}
            source={imageType === 'url' ? { uri: image } : image}
            style={[styles.popupImage, { aspectRatio: aspectRatio }]}
          />
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius:8
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 0,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  popupImage: {
    width: '90%',
    resizeMode: 'cover',
    borderRadius:8
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: 'rgba(0,0,0,0.3)',
    color: 'white',
    zIndex: 2,
    alignSelf: 'center',
    display: 'flex',
  },
});

export default ThumbPopup;
