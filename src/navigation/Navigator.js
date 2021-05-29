// library imports
import React from 'react';
import { Platform, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon
} from '@ui-kitten/components';

// screen imports
import MuseumGalleryScreen from '../screens/MuseumGalleryScreen';
import SocialGalleryScreen from '../screens/SocialGalleryScreen';
import ImageScreen from '../screens/ImageScreen';
import AboutScreen from '../screens/AboutScreen';
import EditImageScreen from '../screens/EditImageScreen';
import WebEditImageScreen from '../screens/WebEditImageScreen';
import UserImageDetailScreen from '../screens/UserImageDetailScreen';
import styles from './styles';

const PlatformDependentEditImageScreen = 
  Platform.OS == 'web' ? WebEditImageScreen : EditImageScreen;

const MuseumStack = createStackNavigator();
const MuseumStackScreen = () => (
  <MuseumStack.Navigator>
    <MuseumStack.Screen 
      name="Museum Gallery" 
      component={MuseumGalleryScreen}
      options={{ title: 'MineArt' }} />
    <MuseumStack.Screen
      name="Image Details"
      component={ImageScreen}
      options={{ title: 'Explore Artwork' }}
    />
    <MuseumStack.Screen
      name="User Image Details"
      component={UserImageDetailScreen}
      options={{ title: 'User Image' }}
    />
    <MuseumStack.Screen name="Edit Image" component={PlatformDependentEditImageScreen} />
    <MuseumStack.Screen
      name="Social Gallery"
      component={SocialGalleryScreen}
      options={{ title: 'Artwork Gallery' }}
    />
  </MuseumStack.Navigator>
);

const AboutStack = createStackNavigator();
const AboutStackScreen = () => (
  <AboutStack.Navigator>
    <AboutStack.Screen name="About Us" component={AboutScreen} />
  </AboutStack.Navigator>
);

const BottomNav = createBottomTabNavigator();
const BottomTabNavigator = () => (
  <BottomNav.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <BottomNav.Screen name="Museum Gallery" component={MuseumStackScreen} />
    <BottomNav.Screen name="About" component={AboutStackScreen} />
  </BottomNav.Navigator>
);

const BottomTabBar = ({ navigation, state }) => (
  <SafeAreaView>
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => {
        navigation.navigate(state.routeNames[index]);
      }}
    >
      <BottomNavigationTab
        icon={(props) => <Icon {...props} name="image-outline" />}
      />
      <BottomNavigationTab
        icon={(props) => <Icon {...props} name="people-outline" />}
      />
    </BottomNavigation>
  </SafeAreaView>
);

export const Navigator = () => (
  <NavigationContainer>
    <BottomTabNavigator />
  </NavigationContainer>
);
