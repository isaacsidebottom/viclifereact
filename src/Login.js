import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'

import firebase from './Firebase.js' // import firebase
import styles from '../styles/LoginStyles.js'
// import images
import bkimg from '../images/bkimg.js'
import logo from '../images/logo-white.png'

// local variables

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state
    {
      email: ('')
      password: ('')
    }
  }

  handleLogin = async () => {
    try {
      const result = await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        // .signInWithEmailAndPassword("test10@gmail.com", "password") //(TEST ACC)
      if (result) {
        this.props.navigation.navigate('App')
      }
    } catch (e) {
      var errorMessage
      if (e.code == 'auth/argument-error') {
        errorMessage = 'Check your email and password!'
      } else if (e.code == 'auth/user-not-found') {
        errorMessage =
          'This user does not exist :(, try again otherwise sign up!'
      } else if (e.code == 'auth/wrong-password') {
        errorMessage = 'Incorrect password!'
      } else if (e.code == 'auth/invalid-email') {
        errorMessage = 'Your email is not formatted correctly!'
      } else {
        errorMessage = e.code
      }
      Alert.alert('Oops', errorMessage)
    }
  }

  render() {
    return (

      <DismissKeyboard>
        <ImageBackground source={bkimg} style={styles.backgroundContainer} >

          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.logoText}>VicLIFE</Text>
          </View>

          <View style={styles.inputContainter}>
            <Icon
              name='ios-mail'
              size={28}
              color={'rgba(255,255,255,0.7)'}
              style={styles.inputIcon}
            />
            <TextInput
              returnKeyType='next'
              keyboardType='email-address'
              style={styles.input}
              autoCapitalize='none'
              autoCorrect={false}
              placeholder={'Email'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              onSubmitEditing={() => this.passwordInput.focus()}
              onChangeText={email => this.setState({ email })}
            />
          </View>

          <View style={styles.inputContainter}>
            <Icon
              name='ios-key'
              size={28}
              color={'rgba(255,255,255,0.7)'}
              style={styles.inputIcon}
            />
            <TextInput
              returnKeyType='go'
              style={styles.input}
              secureTextEntry
              autoCorrect={false}
              placeholder={'Password'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              ref={input => (this.passwordInput = input)}
              onSubmitEditing={this.handleLogin}
              onChangeText={password => this.setState({ password })}
            />
          </View>

          <TouchableOpacity style={styles.btnLogin} onPress={this.handleLogin}>
            <Text style={styles.text}>LOGIN</Text>
          </TouchableOpacity>
          <View style={styles.signUpTextContainer}>
            <Text  style={styles.text}>Dont have an account?</Text>
            <TouchableOpacity style={styles.btnSignUp} onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={styles.signupText}> Register</Text>
            </TouchableOpacity>
          </View>

        </ImageBackground>
      </DismissKeyboard>
    )
  }
}
