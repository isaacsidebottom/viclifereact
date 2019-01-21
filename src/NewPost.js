import React from 'react';
//COMPONENTS
import { Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Divider from 'react-native-divider';
import Icon from 'react-native-vector-icons/Ionicons'
import NaviBar from 'react-native-pure-navigation-bar';

//STYLES
import styles from '../styles/PageStyles.js'

//FIREBASE
import firebase from './Firebase.js'

//VARIABLES
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

//DEFAULT CLASS
export default class NewPost extends React.Component {
  constructor() {
    super()
    this.state = {
      title: (''),
      content: ('')
    }
  }

  handleSubmitPost = async () => {
    if(this.state.content == "" || this.state.title == ""){
      Alert.alert('Oops!', 'Your post is missing something.')
      return;
    }else{
      var self = this;
      var now = new Date();
      var ref = firebase.database().ref('posts/' + now.getTime());
      var userRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/username');
      var username;
      await userRef.once('value').then(function (snapshot) {
        username = snapshot.val();
      });
      await ref.update({
        description: this.state.content,
        title: this.state.title,
        likes: {
          length: 0
        },
        user: username
      }, function (error) {
        if (error) {
          Alert.alert('Oops', e.message)
        } else {
          Alert.alert('Success!', 'Your post was successfully sent.')
          self.setState({title:'',content:''})
          Keyboard.dismiss()
          //self.props.navigation.navigate('Home') //Switch Screens
        }
      });
    }
    

  }
  render() {
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <NaviBar
            title='Create a new post!'
            leftElement=''
            rightElement={<Icon name={'ios-send'} size={30}  />}
            onRight={this.handleSubmitPost}
          />
          <TextInput value={this.state.title} ref={input => (this.titleInput = input)} returnKeyType='next' onSubmitEditing={() => this.contentInput.focus()} onChangeText={title => this.setState({ title })} placeholder={'Title'} style={[{ fontSize: 30 }, { padding: 15 }]} />
          <Divider />
          <TextInput value={this.state.content} ref={input => (this.contentInput = input)} onChangeText={content => this.setState({ content })} placeholder={'Start here'} style={[{ fontSize: 16 }, { padding: 20 }]} multiline={true} />
        </View>
      </DismissKeyboard>
    );
  }
}