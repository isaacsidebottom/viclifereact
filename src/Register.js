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
  constructor (props) {
    super(props)
    this.state
    {
      username: ('')
      email: ('')
      password: ('')
      confirmPassword: ('')
    }
  }

  handleRegistration = async () => {
    if (this.state.username == null || this.state.username.length < 4) {
      Alert.alert('Oops', 'Your username needs to be longer than 3 characters!')
    } else if (this.state.password != this.state.confirmPassword) {
        Alert.alert('Oops', 'Your passwords dont match!')
    }else if (this.state.password.length < 6) {
        Alert.alert('Oops', 'Your passwords needs to be longer than 6 characters!')
    } else {
      try {
        const result = await firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
        if (result) {
          await firebase
            .database()
            .ref('/users/' + firebase.auth().currentUser.uid)
            .set({
              email: this.state.email,
              username: this.state.username
            })
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
  }

  render () {
    return (
      <DismissKeyboard>
        <ImageBackground source={bkimg} style={styles.backgroundContainer}>

          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.logoText}>VicLIFE!</Text>
          </View>
          {/* Username */}
          <View style={styles.inputContainter}>
            <Icon
              name='ios-contact'
              size={28}
              color={'rgba(255,255,255,0.7)'}
              style={styles.inputIcon}
            />
            <TextInput
              returnKeyType='next'
              style={styles.input}
              autoCorrect={false}
              placeholder={'Username'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              onSubmitEditing={() => this.emailInput.focus()}
              onChangeText={username => this.setState({ username })}
            />
          </View>
          {/* EMAIL */}
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
              ref={input => (this.emailInput = input)}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              onSubmitEditing={() => this.passwordInput.focus()}
              onChangeText={email => this.setState({ email })}
            />
          </View>
          {/* PASSWORD */}
          <View style={styles.inputContainter}>
            <Icon
              name='ios-key'
              size={28}
              color={'rgba(255,255,255,0.7)'}
              style={styles.inputIcon}
            />
            <TextInput
              returnKeyType='next'
              style={styles.input}
              secureTextEntry
              autoCorrect={false}
              placeholder={'Password'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              ref={input => (this.passwordInput = input)}
              onSubmitEditing={() => this.passwordConfirmInput.focus()}
              onChangeText={password => this.setState({ password })}
            />
          </View>
          {/* CONFIRM PASSWORD */}
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
              placeholder={'Confirm Password'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              ref={input => (this.passwordConfirmInput = input)}
              onSubmitEditing={this.handleRegistration}
              onChangeText={confirmPassword => this.setState({ confirmPassword })}
            />
          </View>

          <TouchableOpacity
            style={styles.btnLogin}
            onPress={this.handleRegistration}
          >
            <Text style={styles.text}>REGISTER</Text>
          </TouchableOpacity>
          <View style={styles.signUpTextContainer}>
            <Text style={styles.text}>Already have an account?</Text>
            <TouchableOpacity
              style={styles.btnSignUp}
              onPress={() => this.props.navigation.navigate('Login')}
            >
              <Text style={styles.signupText}> Login</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </DismissKeyboard>
    )
  }
}
