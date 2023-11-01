import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveHeight as hp,
  responsiveFontSize as rfs,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import {globalImagePath} from '../assets/Images/gloableImagePath';
import {colors} from '../assets/colors/colors';
import {useNavigation} from '@react-navigation/native';
import Home from '../screen/home/Home';
import Close from '../screen/TableList/TableList';
import {CurvedBottomBarExpo} from 'react-native-curved-bottom-bar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomTab = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigation = useNavigation();
  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';
    let title = '';

    switch (routeName) {
      case 'Home':
        icon = 'home';
        title = 'Home';
        break;
      case 'List':
        icon = 'view-list';
        title = 'List';
        break;
    }

    return (
      <>
        <MaterialCommunityIcons
          name={icon}
          size={30}
          color={routeName === selectedTab ? colors.primary : 'gray'}
        />
        <Text
          style={[
            styles.title,
            {color: routeName === selectedTab ? colors.primary : 'gray'},
          ]}>
          {title}
        </Text>
      </>
    );
  };
  const renderTabBar = ({routeName, selectedTab, navigate}) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <CurvedBottomBarExpo.Navigator
        type="DOWN"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={55}
        circleWidth={50}
        bgColor="white"
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
        borderTopLeftRight
        renderCircle={({selectedTab, navigate}) => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={[, styles.plusBorder]}
              onPress={() => navigation.navigate('AddItem', {type: 'new'})}>
              <Image
                source={globalImagePath.plus}
                style={[
                  styles.bottomImage,
                  {
                    tintColor: '#fff',
                  },
                ]}
              />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}>
        <CurvedBottomBarExpo.Screen
          name="Home"
          position="LEFT"
          component={Home}
        />
        <CurvedBottomBarExpo.Screen
          name="List"
          component={Close}
          position="RIGHT"
        />
      </CurvedBottomBarExpo.Navigator>
    </View>
  );
};

export default CustomTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    backgroundColor: '#fff',
    height: hp(8),
    borderTopLeftRadius: hp(5),
    borderTopRightRadius: hp(5),
    position: 'absolute',
    width: '100%',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 5,
  },
  bottomTab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusBorder: {
    backgroundColor: colors.primary,
    padding: hp(1.5),
    borderRadius: 100,
    bottom: hp(2),
    elevation: 10,
    shadowColor: colors.primary,
  },
  bottomImage: {
    height: hp(3),
    width: hp(3),
    resizeMode: 'contain',
  },
  tabbarItem: {
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: rfs(1.5),
    fontWeight: '400',
    fontFamily: 'Lora-SemiBold',
  },
});
