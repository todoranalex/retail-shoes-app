import React, {useEffect, useRef, useState} from 'react';
import {Text, View, ScrollView, Animated, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  HomeData,
  initialHomePage,
  mainCategories,
  nikeHomePage,
  Product,
  subCategories,
} from '../Utils';

const {width} = Dimensions.get('window');

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

export default () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [category, setCategory] = useState(0);
  const [subCategory, setSubCategory] = useState(0);
  const [homeData, setHomeData] = useState<HomeData>(initialHomePage);

  const topProducts =
    subCategory === 0
      ? homeData.featured
      : subCategory === 1
      ? homeData.nearing
      : subCategory === 2
      ? homeData.new
      : [];

  useEffect(() => {
    if (category === 0) {
      setHomeData(nikeHomePage);
    } else {
      //TODO also populate other categories.
      setHomeData(initialHomePage);
    }
  }, [category]);

  return (
    <View style={{flex: 1, backgroundColor: '#EFEFEA'}}>
      {/* <View //add a mask view so that overscroll color at the top is white instead of gray
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          height: 300,
          width,
        }}
      /> */}
      <CateogoriesHeader
        category={category}
        onCategorySelected={(cat) => {
          setCategory(cat);
        }}
      />
      {topProducts.length > 0 && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
            }}>
            <SubCategoriesHeader
              subCategory={subCategory}
              onSubCategoryPressed={(subCat) => {
                setSubCategory(subCat);
              }}
            />
            <Animated.ScrollView
              contentContainerStyle={{
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
              pagingEnabled
              snapToInterval={(width + 48) / 2 + 32}
              decelerationRate={'fast'}>
              {topProducts.map((p, index) => {
                return (
                  <Animated.View
                    key={p.name}
                    style={{
                      transform: [
                        {
                          scale: scrollX.interpolate({
                            inputRange: topProducts.map(
                              (_, i) => i * ((width + 48) / 2 + 32),
                            ),
                            outputRange: topProducts.map((_, i) => {
                              return index === i ? 1 : 0.85;
                            }),
                            extrapolate: 'clamp',
                          }),
                        },
                      ],
                    }}>
                    <MainCard
                      products={topProducts}
                      product={p}
                      scrollX={scrollX}
                    />
                  </Animated.View>
                );
              })}
            </Animated.ScrollView>
          </View>
          {homeData.trending && (
            <ContentScrollView
              label={'Trending now'}
              products={homeData.trending}
            />
          )}
          {homeData.more && (
            <ContentScrollView label={'More'} products={homeData.more} />
          )}
        </ScrollView>
      )}
    </View>
  );
};

const SubCategoriesHeader = ({
  subCategory,
  onSubCategoryPressed,
}: {
  subCategory: number;
  onSubCategoryPressed(subCat: number): void;
}) => {
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          width: 48,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {subCategories.map((s, i) => {
          return (
            <Text
              onPress={() => {
                onSubCategoryPressed(i);
              }}
              key={s}
              style={{
                fontSize: 11,
                fontFamily:
                  subCategory === i ? 'Helvetica-Bold' : 'Helvetica-Light',
                transform: [{rotateZ: '-90deg'}],
              }}>
              {s}
            </Text>
          );
        })}
      </ScrollView>
    </View>
  );
};

const CateogoriesHeader = ({
  category,
  onCategorySelected,
}: {
  category: number;
  onCategorySelected(category: number): void;
}): JSX.Element => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingVertical: 16,
      }}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        {mainCategories.map((c, i) => {
          return (
            <Text
              onPress={() => {
                onCategorySelected(i);
              }}
              style={{
                fontSize: 16,
                marginHorizontal: 16,
                fontFamily:
                  category === i ? 'Helvetica-Bold' : 'Helvetica-Light',
                color: category === i ? 'black' : 'gray',
              }}
              key={c}>
              {c}
            </Text>
          );
        })}
      </ScrollView>
    </View>
  );
};

const ContentScrollView = ({
  label,
  products,
}: {
  label: string;
  products: Product[];
}): JSX.Element => {
  return (
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
        <Text style={{fontSize: 16, fontFamily: 'Helvetica-Bold'}}>
          {label}
        </Text>
        <MaterialIcons name="arrow-right-alt" size={24} color={'black'} />
      </View>
      <View>
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 24,
            paddingHorizontal: 8,
          }}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={width / 2 - 8}
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
          {products.map((n) => {
            return <SecondaryCard key={n.name} product={n} />;
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const SecondaryCard = ({product}: {product: Product}): JSX.Element => {
  return (
    <View
      style={{
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: 9,
        elevation: 4,
        alignItems: 'center',
        height: 220,
        marginHorizontal: 8,
        width: width / 2 - 24,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 8,
      }}>
      <View
        style={{
          width: width / 2 - 32,
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
            fontFamily: 'Helvetica',
          }}>
          {product.promotion}
        </Text>
        <Ionicons name="heart-outline" size={24} color={'black'} />
      </View>
      <FastImage
        resizeMode={'cover'}
        source={{uri: product.imageUrl}}
        style={{
          height: 100,
          width: 150,
          marginBottom: 16,
          transform: [
            {
              rotateZ: '-16deg',
            },
          ],
        }}
      />
      <Text
        style={{
          color: 'black',
          marginVertical: 8,
          fontSize: 11,
          textAlign: 'center',
          fontFamily: 'Helvetica-Bold',
        }}>
        {product.brand + ' ' + product.name}
      </Text>
      <Text style={{color: 'black', fontSize: 11, fontFamily: 'Helvetica'}}>
        {product.price}
      </Text>
    </View>
  );
};

const MainCard = ({
  product,
  products,
  scrollX,
}: {
  product: Product;
  products: Product[];
  scrollX: Animated.Value;
}): JSX.Element => {
  return (
    <View
      style={{
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: 9,
        elevation: 4,
        height: 340,
        width: (width + 48) / 2,
        backgroundColor: product.bgColor,
        marginHorizontal: 16,
        borderRadius: 10,
        padding: 16,
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 14,
          marginBottom: 8,
          fontFamily: 'Helvetica',
        }}>
        {product.brand}
      </Text>
      <Text
        style={{
          paddingRight: 16,
          color: 'white',
          fontSize: 18,
          marginBottom: 8,
          fontFamily: 'Helvetica-Bold',
        }}>
        {product.name}
      </Text>
      <Text style={{color: 'white', fontSize: 14, fontFamily: 'Helvetica'}}>
        {product.price}
      </Text>
      <AnimatedFastImage
        resizeMode={'contain'}
        source={{uri: product.imageUrl}}
        style={{
          position: 'absolute',
          height: 340,
          width: (width + 48) / 2,
          left: 16,
          transform: [
            {
              rotateZ: scrollX.interpolate({
                inputRange: products.map((_, i) => i * ((width + 48) / 2 + 32)),
                outputRange: products.map((_, i) => {
                  return products.indexOf(product) === i ? '-16deg' : '-50deg';
                }),
                extrapolate: 'clamp',
              }),
            },
            {
              scale: scrollX.interpolate({
                inputRange: products.map((_, i) => i * ((width + 48) / 2 + 32)),
                outputRange: products.map((_, i) => {
                  return products.indexOf(product) === i ? 1.2 : 0.45;
                }),
                extrapolate: 'clamp',
              }),
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
