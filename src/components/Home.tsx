import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

const MAIN_CATEGORIES = ['Nike', 'Adidas', 'Jordan', 'Puma', 'Rebook', 'Asics'];
const SUB_CATEGORIES = ['Featured', 'Upcoming', 'New'];

type Product = {
  brand: string;
  name: string;
  price: string;
  imageUrl: string;
  bgColor?: string;
  promotion?: string;
};

const NIKE_FEAT_PRODUCTS = [
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
    name: 'SB ZOOM BLAZER',
    price: '$210.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/d7cb11e8-7f41-4a58-b846-c1dca4e935f8/sb-zoom-blazer-mid-edge-skate-shoe-Gg1p1L.png',
    bgColor: '#f9b208',
  },
  {
    brand: 'NIKE',
    name: 'INFINITY FLYKNIT 2',
    price: '$140.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/767b0f87-f47a-4c9b-bb74-6e875e6c5887/react-infinity-run-flyknit-2-running-shoe-hD0Cd2.png',
    bgColor: '#867ae9',
  },
  {
    brand: 'NIKE',
    name: 'AIR-270',
    price: '$159.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/awjogtdnqxniqqk0wpgf/air-max-270-shoe-nnTrqDGR.png',
    bgColor: '#999999',
  },
  {
    brand: 'NIKE',
    name: 'WILDHORSE 7',
    price: '$168.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/0b64a85e-ea97-4b8c-8d0b-cb78932937c0/wildhorse-7-trail-running-shoe-Cx4rCx.png',
    bgColor: '#60654a',
  },
  {
    brand: 'NIKE',
    name: 'AIR ZOOM TERRA',
    price: '$210.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/f638800c-47a4-43ea-bd6b-89b2cf5838cd/air-zoom-terra-kiger-7-trail-running-shoe-8960WB.png',
    bgColor: '#4d4d4d',
  },
];

const NIKE_TRENDING_PRODUCTS = [
  {
    brand: 'NIKE',
    name: 'AIRMAX 2090',
    price: '$140.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/da82111e-17e3-4335-88c3-2cc1be3bac7e/air-max-2090-shoe-NGbdqr.png',
    promotion: '20% off',
  },
  {
    brand: 'NIKE',
    name: 'AIR ZOOM REP 2',
    price: '$135.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/01b33da3-d1d0-44e9-b03d-df173f4711e0/air-zoom-superrep-2-hiit-class-shoe-hQxXZ4.png',
    promotion: 'Featured',
  },
  {
    brand: 'NIKE',
    name: 'METCON 6',
    price: '$120.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/e626823a-0999-485c-9243-f43c6d667311/metcon-6-training-shoe-jHPqks.png',
    promotion: 'New',
  },
  {
    brand: 'NIKE',
    name: 'BLAZER MID 77',
    price: '$140.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/ba95aa69-93ff-47d3-97b9-926e3c92b568/blazer-mid-77-shoe-jg7NGq.png',
    promotion: 'New',
  },
  {
    brand: 'NIKE',
    name: 'AIR MAX 95 ESSENTIAL',
    price: '$200.00',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:ffffff00/f91719bd-105b-4b9f-badc-f569eb80d6a0/air-max-95-essential-shoe-18JXCv.png',
    promotion: 'New',
  },
];

const NIKE_MORE_PRODUCTS = NIKE_TRENDING_PRODUCTS.slice().reverse();

export default () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [category, setCategory] = useState(0);
  const [subCategory, setSubCategory] = useState(0);

  return (
    <View style={{flex: 1, backgroundColor: '#EFEFEA'}}>
      {/* <View //add a mask view so that overscroll color at the top is white instead of gray
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          height: 300,
          width,
        }}></View> */}
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 16,
        }}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {MAIN_CATEGORIES.map((c, i) => {
            return (
              <Text
                onPress={() => {
                  setCategory(i);
                }}
                style={{
                  fontSize: 16,
                  marginHorizontal: 16,
                  fontWeight: category === i ? 'bold' : 'normal',
                  color: category === i ? 'black' : 'gray',
                }}
                key={c}>
                {c}
              </Text>
            );
          })}
        </ScrollView>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
          }}>
          <View>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              {SUB_CATEGORIES.map((s, i) => {
                return (
                  <Text
                    onPress={() => {
                      setSubCategory(i);
                    }}
                    key={s}
                    style={{
                      fontSize: 11,
                      color: subCategory === i ? 'black' : 'gray',
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
              paddingVertical: 16,
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
            {NIKE_FEAT_PRODUCTS.map((p, index) => {
              return (
                <Animated.View
                  key={p.name}
                  style={{
                    transform: [
                      {
                        scale: scrollX.interpolate({
                          inputRange: NIKE_FEAT_PRODUCTS.map((_, i) => i * 200),
                          outputRange: NIKE_FEAT_PRODUCTS.map((_, i) => {
                            return index === i ? 1 : 0.9;
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
        <View>
          <View
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 16,
              paddingTop: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Trending now</Text>
            <MaterialIcons name="arrow-right-alt" size={24} color={'black'} />
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
              scrollEventThrottle={16}
              pagingEnabled
              snapToInterval={width / 2 + 24}
              decelerationRate={'fast'}
              disableIntervalMomentum={true}
              horizontal={true}>
              <View
                style={{
                  position: 'absolute',
                  height: 180 / 2 + 24,
                  left: -400, // allow the bg color to be visible when overscrolling
                  right: -400,
                  top: 0,
                  backgroundColor: 'white',
                }}
              />
              {NIKE_TRENDING_PRODUCTS.map((n) => {
                return <SecondaryCard key={n.name} product={n} />;
              })}
            </ScrollView>
          </View>
        </View>
        <View>
          <View
            style={{
              backgroundColor: 'white',
              paddingTop: 16,
              paddingHorizontal: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>More</Text>
            <MaterialIcons name="arrow-right-alt" size={24} color={'black'} />
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
              scrollEventThrottle={16}
              pagingEnabled
              snapToInterval={width / 2 + 24}
              decelerationRate={'fast'}
              disableIntervalMomentum={true}
              horizontal={true}>
              <View
                style={{
                  position: 'absolute',
                  height: 180 / 2 + 24,
                  left: -400, // allow the bg color to be visible when overscrolling
                  right: -400,
                  top: 0,
                  backgroundColor: 'white',
                }}
              />
              {NIKE_MORE_PRODUCTS.map((n) => {
                return <SecondaryCard key={n.name} product={n} />;
              })}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const SecondaryCard = ({product}: {product: Product}) => {
  return (
    <View
      style={{
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: 9,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
        width: width / 2 - 24,
        backgroundColor: 'white',
        marginHorizontal: 8,
        borderRadius: 10,
        padding: 8,
      }}>
      <View
        style={{
          width: width / 2 - 24,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 8,
        }}>
        <Text
          style={{
            backgroundColor: '#f55c47',
            paddingHorizontal: 16,
            paddingVertical: 2,
            fontSize: 11,
            color: 'white',
          }}>
          {product.promotion}
        </Text>
        <Ionicons name="heart-outline" size={24} color={'black'} />
      </View>
      <FastImage
        resizeMode={'cover'}
        source={{uri: product.imageUrl}}
        style={{
          height: 80,
          width: 110,
          transform: [
            {
              rotateZ: '-16deg',
            },
          ],
        }}
      />
      <Text style={{color: 'black', marginVertical: 8, fontSize: 11}}>
        {product.brand + ' ' + product.name}
      </Text>
      <Text style={{color: 'black', fontSize: 11}}>{product.price}</Text>
    </View>
  );
};

const MainCard = ({product}: {product: Product}) => {
  return (
    <View
      style={{
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: 9,
        elevation: 4,
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
          fontWeight: 'bold',
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
      <MaterialIcons
        name="arrow-right-alt"
        size={24}
        color={'white'}
        style={{position: 'absolute', bottom: 16, right: 16}}
      />
      <Ionicons
        name="heart-outline"
        size={24}
        color={'white'}
        style={{position: 'absolute', top: 16, right: 16}}
      />
    </View>
  );
};
