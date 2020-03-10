import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { isNil } from 'lodash';
import { BackgroundView, withTheme } from '@apollosproject/ui-kit';
import Passes from '@apollosproject/ui-passes';
import { MapViewConnected as Location } from '@apollosproject/ui-mapview';
import { MediaPlayer } from '@apollosproject/ui-media-player';
import AsyncStorage from '@react-native-community/async-storage';

import Providers from './Providers';
import NavigationService from './NavigationService';
import ContentSingle from './content-single';
import Event from './event';
import Tabs from './tabs';
import LandingScreen from './LandingScreen';
import UserWebBrowser from './user-web-browser';
import Onboarding from './ui/Onboarding';
import {
  readOnboardingFromStorage,
  useOnboardDispatch,
  useOnboardState,
} from './OnboardProvider';

const AppStatusBar = withTheme(({ theme }) => ({
  barStyle: 'dark-content',
  backgroundColor: theme.colors.paper,
}))(StatusBar);

const AppContainer = () => {
  const dispatch = useOnboardDispatch();

  useEffect(() => {
    async function isOnboarded() {
      const token = await AsyncStorage.getItem('hideOnboard');
      dispatch(readOnboardingFromStorage(token));
    }
    isOnboarded();
  }, []);

  const { onboarded } = useOnboardState();

  // This setup flashes because it is waiting on props possible solution `isLoading`
  if (isNil(onboarded)) return null; // TODO: should we show a loading state or something?

  const AppNavigator = createStackNavigator(
    {
      Tabs,
      ContentSingle,
      Event,
      Location,
      Passes,
      UserWebBrowser,
      Onboarding,
      LandingScreen,
    },
    {
      initialRouteName: onboarded === 'true' ? 'Tabs' : 'LandingScreen',
      mode: 'modal',
      headerMode: 'screen',
    }
  );

  const Container = createAppContainer(AppNavigator);

  return (
    <Container
      ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
};

const App = () => (
  <Providers>
    <BackgroundView>
      <AppStatusBar barStyle="dark-content" />
      <AppContainer />
      <MediaPlayer />
    </BackgroundView>
  </Providers>
);

export default App;
