import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Image, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Product} from '../Utils';

const {width} = Dimensions.get('window');

export default () => {
  const {product}: {product: Product} = useRoute().params as any;
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 0.35,
          backgroundColor: product.bgColor,
          borderBottomLeftRadius: 250,
          borderBottomRightRadius: 50,
        }}>
        <FastImage
          resizeMode={'cover'}
          source={{uri: product.imageUrl}}
          style={{
            alignSelf: 'center',
            height: 220,
            width: 270,
            marginBottom: 16,
            transform: [
              {
                rotateZ: '-16deg',
              },
            ],
          }}
        />
      </View>
      <View style={{flex: 0.6, backgroundColor: 'white'}}></View>
    </View>
  );
};
