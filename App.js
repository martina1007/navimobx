/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Provider as MobXProvider, inject, observer } from 'mobx-react/native';

import Store from './src/stores/Store';
import Navigator from './src/navigator';

const store = new Store();

// gets the current screen from navigation state
function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

/**
* JSDOC : APP
*/
@observer
export default class App extends React.Component<{}> {
  render() {
    return (
      <MobXProvider store={store}>
        <SafeAreaView style={{ flex: 100, backgroundColor: '#EEE' }}>
          <Navigator
            onNavigationStateChange={(prevState, currentState) => {
              const currentScreen = getCurrentRouteName(currentState);
              const prevScreen = getCurrentRouteName(prevState);
              // console.log('\n  App.js :: onNavigationStateChange  ', prevScreen, currentScreen);
              if (prevScreen !== currentScreen) {
                store.screenChanged(prevScreen, currentScreen);
                // the line below uses the Google Analytics tracker
                // change the tracker here to use other Mobile analytics SDK.
                // tracker.trackScreenView(currentScreen);
              }
            }}
          />
        </SafeAreaView>
      </MobXProvider>
    );
  }
}
