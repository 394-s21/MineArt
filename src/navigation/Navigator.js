// library imports
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

// screen imports
import MuseumGalleryScreen from "../screens/MuseumGalleryScreen";
import SocialGalleryScreen from "../screens/SocialGalleryScreen";
import styles from "./styles";
import { SafeAreaView } from "react-native";
import EditImageScreen from "../screens/EditImageScreen";

const BottomNav = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
    <SafeAreaView>
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
            <BottomNavigationTab icon={(props) => (
              <Icon {...props} name="brush-outline"/>
            )} />
        </BottomNavigation>
    </SafeAreaView>
);

const BottomTabNavigator = () => (
    <BottomNav.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
        <BottomNav.Screen name='Museum Gallery' component={MuseumGalleryScreen}/>
        <BottomNav.Screen name='Social Gallery' component={SocialGalleryScreen}/>
        <BottomNav.Screen name="Editor Screen" component={EditImageScreen}/>
    </BottomNav.Navigator>
);

export const Navigator = () => (
    <NavigationContainer>
        <BottomTabNavigator/>
    </NavigationContainer>
);