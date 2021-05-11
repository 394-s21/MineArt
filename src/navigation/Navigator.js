// library imports
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

// screen imports
import MuseumGalleryScreen from "../screens/MuseumGalleryScreen";
import SocialGalleryScreen from "../screens/SocialGalleryScreen";
import IOWScreen from "../screens/IOWScreen";
import styles from "./styles";
import { SafeAreaView } from "react-native";
import EditImageScreen from "../screens/EditImageScreen";



const MuseumStack = createStackNavigator();
const MuseumStackScreen = () => (
    <MuseumStack.Navigator>
        <MuseumStack.Screen name='Museum Gallery' component={MuseumGalleryScreen} />
    </MuseumStack.Navigator>
);

const SocialStack = createStackNavigator();
const SocialStackScreen = () => (
    <SocialStack.Navigator>
        <SocialStack.Screen name='Social Gallery' component={SocialGalleryScreen} />
    </SocialStack.Navigator>
);

const IOWStack = createStackNavigator();
const IOWStackScreen = () => (
    <IOWStack.Navigator >
        <IOWStack.Screen name='Image of the Week' component={IOWScreen} />
    </IOWStack.Navigator>
);


const BottomNav = createBottomTabNavigator();
const BottomTabNavigator = () => (
    <BottomNav.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
        <BottomNav.Screen name='IOW' component={IOWStackScreen} />
        <BottomNav.Screen name='Museum Gallery' component={MuseumStackScreen}/>
        <BottomNav.Screen name='Social Gallery' component={SocialStackScreen}/>
        <BottomNav.Screen name="Editor Screen" component={EditImageScreen}/>
    </BottomNav.Navigator>
);

const BottomTabBar = ({ navigation, state }) => (
    <SafeAreaView>
        <BottomNavigation
            selectedIndex={state.index}
            onSelect={(index) => {navigation.navigate(state.routeNames[index])}}
        >
            <BottomNavigationTab icon={(props) => (
                <Icon {...props} name="calendar-outline" />
            )} />
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

export const Navigator = () => (
    <NavigationContainer>
        <BottomTabNavigator/>
    </NavigationContainer>
);