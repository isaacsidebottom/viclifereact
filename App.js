import React from 'react';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
//import pages
import Home from './src/Home.js';
import NewPost from './src/NewPost.js';
import Contact from './src/Contact.js';
import Login from './src/Login.js';
import Register from './src/Register.js'
import Comments from './src/Comments.js'
//import Tabs from './src/Tabs.js'; POTENTIALLY LATER ON

const HomeStack = createStackNavigator(
  { Home: Home,Comments: Comments },{ headerMode:'none' }
);
const AppStack = createMaterialBottomTabNavigator({
  // const AppStack = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarColor: '#52b9d8',
      tabBarIcon: ({ tintColor }) => (
        <Icon color={tintColor} name="ios-home" size={24} />
      )
    }
  },
  NewPost: {
    screen: NewPost,
    navigationOptions: {
      tabBarLabel: 'New Post',
      tabBarColor: '#49a2bc',
      tabBarIcon: ({ tintColor }) => (
        <Icon color={tintColor} name="ios-create" size={24} />
      )
    }
  },
  Contact: {
    screen: Contact,
    navigationOptions: {
      tabBarLabel: 'Your Profile',
      tabBarColor: '#3d8ca5',
      tabBarIcon: ({ tintColor }) => (
        <Icon color={tintColor} name="ios-contact" size={24} />
      )
    }
  }
}, {
    //tabBarOptions: { USED FOR 'createBottomTabNavigator'

    initialRouteName: 'Home',
    shifting: true,
    activeTintColor: '#F8F8F8', // active icon color
    inactiveTintColor: '#91daea',  // inactive icon color
    barStyle: { backgroundColor: '#2D4D65' },
    // style: {
    //     backgroundColor: '#2D4D65' // TabBar background
    // }
    //}
  });
const AuthStack = createStackNavigator({ Login: Login,Register: Register },{ headerMode:'none' }); 

export default createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack
    
  },
  {
    initialRouteName: 'Auth',
  }
);