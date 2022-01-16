import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';
import TouchableScale from 'react-native-touchable-scale';
import {Product} from '../Utils';

const BUTTON_HEIGHT = 40;
const {width, height} = Dimensions.get('window');

export const IMAGE_HEIGHT = 250;
export const IMAGE_WIDTH = 350;

export default () => {
  const {product}: {product: Product} = useRoute().params as any;
  const [selectedSize, setSelectedSize] = useState<number>(-1);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const scrollY = useRef<Animated.Value>(new Animated.Value(0)).current;
  if (selectedImage.length > 0) {
    return (
      <Modal>
        <FastImage
          resizeMode={'contain'}
          source={{uri: selectedImage}}
          style={[StyleSheet.absoluteFill, {backgroundColor: '#f5f5f5'}]}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={() => {
              setSelectedImage('');
            }}
          />
        </FastImage>
      </Modal>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Animated.View
        style={{
          flex: 0.4,
          backgroundColor: product.bgColor,
          borderBottomLeftRadius: 250,
          borderBottomRightRadius: 50,
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, 50],
                outputRange: [0, -50],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <FastImage
          resizeMode={'cover'}
          source={{uri: product.imageUrl}}
          style={{
            alignSelf: 'center',
            height: IMAGE_HEIGHT,
            width: IMAGE_WIDTH,
            marginBottom: 16,
            transform: [
              {
                rotateZ: '-16deg',
              },
              {
                scale: 0.7,
              },
            ],
          }}
        />
      </Animated.View>
      <View style={{flex: 0.6}}>
        <Animated.ScrollView
          contentContainerStyle={{paddingBottom: BUTTON_HEIGHT + 32}}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {
              useNativeDriver: true,
            },
          )}
          scrollEventThrottle={16}>
          <ScrollView
            contentContainerStyle={{
              marginTop: 24,
              paddingHorizontal: 16,
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}>
            {product.secondaryImages?.map((img, i) => {
              const isLast = (product.secondaryImages?.length ?? 0) - 1 === i;
              return (
                <TouchableOpacity
                  key={`${img}+${i}`}
                  onPress={() => {
                    setSelectedImage(img);
                  }}>
                  <FastImage
                    resizeMode={'cover'}
                    source={{uri: img}}
                    style={{
                      width: width / 4,
                      marginEnd: isLast ? 0 : 16,
                      height: 80,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          {/*Separator */}
          <View
            style={{
              height: 1,
              width: width - 2 * 16,
              alignSelf: 'center',
              marginVertical: 16,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          />
          <View style={{paddingHorizontal: 16}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontFamily: 'Helvetica-Bold'}}>
                {product.brand + ' - ' + product.name}
              </Text>
              <Text style={{fontFamily: 'Helvetica-Bold'}}>
                {product.price}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'Helvetica-Light',
                fontSize: 13,
                marginTop: 16,
              }}>
              {product.description}
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Helvetica',
                  marginVertical: 16,
                  fontSize: 11,
                  letterSpacing: 1.2,
                  textDecorationLine: 'underline',
                }}>
                MORE DETAILS
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}>
              <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 16}}>
                Size
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 12, fontFamily: 'Helvetica-Bold'}}>
                  UK
                </Text>
              </View>
            </View>
          </View>
          <ScrollView
            contentContainerStyle={{paddingHorizontal: 16}}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {product.sizes?.map((size, i) => {
              const isLast = (product.sizes?.length ?? 0) - 1 === i;
              return (
                <TouchableOpacity
                  key={i}
                  style={{
                    height: BUTTON_HEIGHT,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: width / 4,
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.2)',
                    marginEnd: isLast ? 0 : 16,
                    borderRadius: 5,
                    backgroundColor: selectedSize === size ? 'black' : 'white',
                  }}
                  onPress={() => {
                    setSelectedSize(size);
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Helvetica',
                      fontSize: 14,
                      color: selectedSize === size ? 'white' : 'black',
                    }}>
                    {size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Animated.ScrollView>
      </View>
      <TouchableScale
        style={{
          position: 'absolute',
          bottom: 24,
          alignSelf: 'center',
          width: width - 128,
          backgroundColor: '#f55c47',
          justifyContent: 'center',
          alignItems: 'center',
          height: BUTTON_HEIGHT,
          borderRadius: 5,
        }}>
        <Text
          style={{
            fontFamily: 'Helvetica',
            fontSize: 12,
            color: 'white',
          }}>
          ADD TO BAG
        </Text>
      </TouchableScale>
    </View>
  );
};
