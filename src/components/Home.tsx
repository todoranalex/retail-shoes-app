import React, {useRef, useState} from 'react';
import {Text, View, ScrollView, Animated, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

const MAIN_CATEGORIES = ['Nike', 'Adidas', 'Jordan', 'Puma', 'Rebook', 'Asics'];
const SUB_CATEGORIES = ['Featured', 'Upcoming', 'New'];

type Product = {
  brand: string;
  name: string;
  price: string;
  imageUrl: string;
  bgColor: string;
};

const NIKE_PRODUCTS = [
  {
    brand: 'NIKE',
    name: 'ZOOMX VAPORFLY',
    price: '$130.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/228c9922-686e-443d-b04b-16857e9af198/zoomx-vaporfly-next-2-racing-shoe-dxSLFw.png',
    bgColor: '#3fe0d0',
  },
  {
    brand: 'NIKE',
    name: 'AIR-270',
    price: '$130.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/awjogtdnqxniqqk0wpgf/air-max-270-shoe-nnTrqDGR.png',
    bgColor: '#999999',
  },
  {
    brand: 'NIKE',
    name: 'WILDHORSE 7',
    price: '$130.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/0b64a85e-ea97-4b8c-8d0b-cb78932937c0/wildhorse-7-trail-running-shoe-Cx4rCx.png',
    bgColor: '#60654a',
  },
  {
    brand: 'NIKE',
    name: 'AIR ZOOM TERRA',
    price: '$130.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/f638800c-47a4-43ea-bd6b-89b2cf5838cd/air-zoom-terra-kiger-7-trail-running-shoe-8960WB.png',
    bgColor: '#4d4d4d',
  },
];

export default function TabViewExample() {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginVertical: 24,
          }}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {MAIN_CATEGORIES.map((c) => {
              return (
                <Text style={{fontSize: 16, marginHorizontal: 16}} key={c}>
                  {c}
                </Text>
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{
            marginBottom: 24,
            flexDirection: 'row',
          }}>
          <View>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              {SUB_CATEGORIES.map((s) => {
                return (
                  <Text
                    key={s}
                    style={{
                      fontSize: 11,
                      transform: [{rotateZ: '-90deg'}],
                    }}>
                    {s}
                  </Text>
                );
              })}
            </ScrollView>
          </View>
          <Animated.ScrollView
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {
                useNativeDriver: true,
              },
            )}
            scrollEventThrottle={16}
            pagingEnabled
            snapToInterval={200}
            decelerationRate={'fast'}
            disableIntervalMomentum={true}>
            {NIKE_PRODUCTS.map((p, index) => {
              return (
                <Animated.View
                  key={p.name}
                  style={{
                    transform: [
                      {
                        scale: scrollX.interpolate({
                          inputRange: NIKE_PRODUCTS.map((_, i) => i * 200),
                          outputRange: NIKE_PRODUCTS.map((_, i) => {
                            return index === i ? 1 : 0.85;
                          }),
                          extrapolate: 'clamp',
                        }),
                        // rotateY: scrollX.interpolate({
                        //   inputRange: NIKE_PRODUCTS.map((_, i) => i * 200),
                        //   outputRange: NIKE_PRODUCTS.map((_, i) => {
                        //     return index === i
                        //       ? '0deg'
                        //       : index === i - 1
                        //       ? '50deg'
                        //       : '-50deg';
                        //   }),
                        //   extrapolate: 'clamp',
                        // }),
                      },
                    ],
                  }}>
                  <MainCard product={p} />
                </Animated.View>
              );
            })}
          </Animated.ScrollView>
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              marginHorizontal: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: '500'}}>More</Text>
            <Icon name="arrow-forward" size={24} color={'black'} />
          </View>
          <View>
            <ScrollView
              contentContainerStyle={{
                paddingVertical: 24,
                paddingHorizontal: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              {NIKE_PRODUCTS.map((n) => {
                return <SecondaryCard key={n.name} product={n} />;
              })}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const SecondaryCard = ({product}: {product: Product}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
        width: width / 2 - 24,
        backgroundColor: 'white',
        marginHorizontal: 8,
        borderRadius: 10,
        padding: 8,
      }}>
      <View style={{position: 'absolute', top: 8, left: 0}}>
        <Text
          style={{
            backgroundColor: '#f55c47',
            paddingHorizontal: 16,
            paddingVertical: 2,
            fontSize: 11,
            color: 'white',
          }}>
          New
        </Text>
      </View>
      <FastImage
        resizeMode={'cover'}
        source={{uri: product.imageUrl}}
        style={{height: 80, width: 120}}
      />
      <Text style={{color: 'black', marginBottom: 8, fontSize: 11}}>
        {product.brand}
      </Text>
      <Text style={{color: 'black', marginBottom: 8, fontSize: 11}}>
        {product.name}
      </Text>
      <Text style={{color: 'black', fontSize: 11}}>{product.price}</Text>
      <Icon
        name="heart-outline"
        size={24}
        color={'black'}
        style={{position: 'absolute', top: 8, right: 8}}
      />
    </View>
  );
};

const MainCard = ({product}: {product: Product}) => {
  return (
    <View
      style={{
        height: 270,
        width: 190,
        backgroundColor: product.bgColor,
        marginHorizontal: 16,
        borderRadius: 10,
        padding: 16,
      }}>
      <Text style={{color: 'white', fontSize: 14, marginBottom: 8}}>
        {product.brand}
      </Text>
      <Text
        style={{
          paddingRight: 16,
          color: 'white',
          fontSize: 18,
          marginBottom: 8,
          fontWeight: '500',
        }}>
        {product.name}
      </Text>
      <Text style={{color: 'white', fontSize: 14}}>{product.price}</Text>
      <FastImage
        resizeMode={'cover'}
        source={{uri: product.imageUrl}}
        style={{
          position: 'absolute',
          height: 270,
          width: 190,
          left: 16,
          transform: [
            {
              rotateZ: '-16deg',
            },
          ],
        }}
      />
      <Icon
        name="arrow-forward"
        size={24}
        color={'white'}
        style={{position: 'absolute', bottom: 16, right: 16}}
      />
      <Icon
        name="heart-outline"
        size={24}
        color={'white'}
        style={{position: 'absolute', top: 16, right: 16}}
      />
    </View>
  );
};
