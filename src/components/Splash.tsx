import {useFocusEffect} from '@react-navigation/core';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

export default () => {
  const navigation = useNavigation();

  setTimeout(() => {
    navigation.navigate('HomeTabs');
  }, 2000);

  return (
    <FastImage
      style={StyleSheet.absoluteFill}
      source={{
        uri:
          'https://m.mycoolwalls.com/wp-content/uploads/2021/06/Nike-Wallpaper.jpg',
      }}
    />
  );
};
