import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Favorites from './components/Favorites';
import ShoppingCart from './components/ShoppingCart';
import Profile from './components/Profile';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './components/Home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductDetails from './components/ProductDetails';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Product} from './Utils';

const HomeStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={'Home'}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          headerTitleStyle: {color: 'transparent'},
          headerLeft: () => {
            return (
              <Text
                style={{
                  marginLeft: 16,
                  fontFamily: 'Helvetica-Bold',
                  fontSize: 26,
                }}>
                Discover
              </Text>
            );
          },

          headerRight: () => {
            return (
              <View style={{flexDirection: 'row', marginRight: 16}}>
                <Icon
                  name="md-search-sharp"
                  size={24}
                  style={{marginRight: 16}}
                  color={'black'}
                />
                <MaterialCommunityIcons
                  name="bell-outline"
                  size={24}
                  color={'black'}
                />
              </View>
            );
          },
          headerStyle: {
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen
        name={'ProductDetails'}
        component={ProductDetails}
        options={({route}) => ({
          title: (route as any)?.params?.product?.name,
          headerTitleStyle: {
            fontFamily: 'Helvetica',
            fontSize: 14,
            color: 'white',
          },
          headerStyle: {
            backgroundColor: (route as any)?.params?.product?.bgColor,
            shadowOpacity: 0,
          },
          headerLeft: () => {
            const navigation = useNavigation();
            return (
              <TouchableOpacity>
                <MaterialIcons
                  style={{marginLeft: 16, transform: [{rotate: '180deg'}]}}
                  name="arrow-right-alt"
                  size={24}
                  onPress={() => {
                    navigation.goBack();
                  }}
                  color={'white'}
                />
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 16,
                }}>
                <Icon name="heart-outline" size={20} color={'white'} />
              </TouchableOpacity>
            );
          },
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const BottomTabs = createBottomTabNavigator();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <BottomTabs.Navigator
          initialRouteName={'Home'}
          tabBarOptions={{
            style: {
              backgroundColor: '#EFEFEA',
              borderTopColor: 'transparent',
            },
            allowFontScaling: true,
            adaptive: true,
            showLabel: false,
            activeTintColor: '#f55c47',
            inactiveTintColor: 'gray',
          }}>
          <BottomTabs.Screen
            name={'Home'}
            component={HomeStack}
            options={{
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="home-outline"
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <BottomTabs.Screen
            name={'Favorites'}
            component={Favorites}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="heart-outline" size={24} color={color} />
              ),
            }}
          />
          <BottomTabs.Screen
            name={'ShoppingCart'}
            component={ShoppingCart}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="cart-outline" size={24} color={color} />
              ),
            }}
          />
          <BottomTabs.Screen
            name={'Profile'}
            component={Profile}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="person-outline" size={24} color={color} />
              ),
            }}
          />
        </BottomTabs.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
