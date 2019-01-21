import React from 'react';
import { Text, View,Alert } from 'react-native';
import styles from '../styles/PageStyles.js'
import Icon from 'react-native-vector-icons/Ionicons'
import NaviBar from 'react-native-pure-navigation-bar';
import firebase from './Firebase.js' // import firebase
export default class Contact extends React.Component {
  handleLogout = async () => {
    try {
      const result = await firebase.auth().signOut();
      if (result == null) {
        this.props.navigation.navigate('Auth')
      }
    } catch (e) {
      var errorMessage = e.errorMessage
      Alert.alert('Oops', errorMessage)
    }
  }

  render() {

    return (
      
      <View style={styles.container}>
        <NaviBar
        title='Your Profile'
        leftElement=''
        rightElement = {<Icon name={'ios-log-out'} size={30} onPress={this.handleLogout}/>}
        />
  <View>
    <Text>Your email: {firebase.auth().currentUser.email}</Text>
  </View>
      </View>
    );
  }
}