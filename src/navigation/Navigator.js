// library imports
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

// screen imports
import MuseumGalleryScreen from "../screens/MuseumGalleryScreen";
import SocialGalleryScreen from "../screens/SocialGalleryScreen";

const BottomNav = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={(index) => {navigation.navigate(state.routeNames[index])}}
    >
        <BottomNavigationTab icon={(props) => (
            <Icon {...props} name="image-outline" />
        )} />
        <BottomNavigationTab icon={(props) => (
            <Icon {...props} name="people-outline" />
        )} />
    </BottomNavigation>
);

const BottomTabNavigator = () => (
    <BottomNav.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
        <BottomNav.Screen name='Museum Gallery' component={MuseumGalleryScreen}/>
        <BottomNav.Screen name='Social Gallery' component={SocialGalleryScreen}/>
    </BottomNav.Navigator>
);

export const Navigator = () => (
    <NavigationContainer>
        <BottomTabNavigator/>
    </NavigationContainer>
);