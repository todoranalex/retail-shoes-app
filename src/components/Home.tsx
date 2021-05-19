import React, {useState} from 'react';
import {Text, useWindowDimensions, View} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

const MAIN_CATEGORIES = ['Nike', 'Adidas', 'Jordan', 'Puma', 'Rebook'];

export default function TabViewExample() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  // const [routes] = React.useState([
  //   {key: 'first', title: 'First'},
  //   {key: 'second', title: 'Second'},
  // ]);

  const [routes] = useState(
    MAIN_CATEGORIES.map((c) => {
      return {
        key: c,
        title: c,
      };
    }),
  );

  return (
    <TabView
      swipeEnabled={false}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          renderLabel={({route, focused}) => {
            return (
              <Text
                style={{
                  fontSize: 14,
                  color: focused ? 'black' : 'gray',
                }}>
                {route.title}
              </Text>
            );
          }}
          indicatorStyle={{height: 0}}
          style={{
            backgroundColor: 'white',
            shadowOffset: {height: 0, width: 0},
            shadowColor: 'transparent',
            shadowOpacity: 0,
            elevation: 0,
          }}
          scrollEnabled={true}
          labelStyle={{
            color: 'black',
          }}
          tabStyle={{
            width: layout.width / 4.5,
          }}
        />
      )}
      style={{
        backgroundColor: 'white',
      }}
      navigationState={{index, routes}}
      renderScene={() => <></>}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
}
