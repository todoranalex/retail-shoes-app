import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, StatusBar, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Favorites from './components/Favorites';
import ShoppingCart from './components/ShoppingCart';
import Profile from './components/Profile';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './components/Home';

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
              <Text style={{marginLeft: 16, fontWeight: '500', fontSize: 24}}>
                Discover
              </Text>
            );
          },

          headerRight: () => {
            return (
              <View style={{flexDirection: 'row', marginRight: 16}}>
                <Icon name="search-outline" size={24} color={'black'} />
              </View>
            );
          },
          headerStyle: {
            shadowOpacity: 0,
          },
        }}
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
              elevation: 0,
              shadowColor: '#EFEFEA',
              shadowOpacity: 0,
              shadowOffset: {
                height: 0,
                width: 0,
              },
              shadowRadius: 0,
            },
            allowFontScaling: true,
            adaptive: true,
            showLabel: false,
            activeTintColor: '#e93b81',
            inactiveTintColor: 'gray',
          }}>
          <BottomTabs.Screen
            name={'Home'}
            component={HomeStack}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="home-outline" size={24} color={color} />
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
