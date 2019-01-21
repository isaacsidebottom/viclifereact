import React from 'react'
import {
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
  NavigatorIOS
} from 'react-native'
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'
import { Button } from 'react-native-elements'
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage
} from 'react-native-material-cards'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PTRView from 'react-native-pull-to-refresh'
import Comments from '../src/Comments.js'
import styles from '../styles/PageStyles.js'
import NaviBar from 'react-native-pure-navigation-bar'
import firebase from './Firebase.js'
export const GOBACK_BUTTON = '__gobackbutton__'
var posts = []
export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      refreshing: false,
      isLoading: true, // change this to false
      username: ''
    }
  }

  componentDidMount () {
    var self = this

    var userRef = firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid + '/username')
    userRef.once('value').then(function (snapshot) {
      self.setState({ username: snapshot.val() })
    })

    var postsRef = firebase.database().ref('posts')
    postsRef.once('value', function (snapshot) {
      posts = []
      snapshot.forEach(element => {
        var post = {}
        if (element.child('likes/' + firebase.auth().currentUser.uid).val()) {
          post['isLiked'] = true
        } else {
          post['isLiked'] = false
        }
        post['exacttime'] = element.key
        post['title'] = element.val().title
        post['user'] = element.val().user
        post['description'] = element.val().description
        post['likelength'] = element.val().likes.length
        post['comments'] = element.val().comments
        posts.unshift(post)
      })
      self.setState({ isLoading: false }) // use setState
    })
  }
  async deletePost (index) {
    var nodeIndex = posts[index].exacttime
    console.log('index: ' + index + ' NodeINDEX:' + nodeIndex)
    console.log('POSTS: ' + posts[index].exacttime)
    var ref = firebase.database().ref('posts/' + nodeIndex)
    await ref.remove()
    this._onRefresh()
  }
  delete (index) {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'NO',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
          color: 'red'
        },
        { text: 'YES', onPress: () => this.deletePost(index) }
      ],
      { cancelable: false }
    )
  }
  _onRefresh = () => {
    this.setState({ refreshing: true })
    var postsRef = firebase.database().ref('posts')
    postsRef
      .once('value', function (snapshot) {
        posts = []
        snapshot.forEach(element => {
          var post = {}
          if (element.child('likes/' + firebase.auth().currentUser.uid).val()) {
            post['isLiked'] = true
          } else {
            post['isLiked'] = false
          }
          post['exacttime'] = element.key
          post['title'] = element.val().title
          post['user'] = element.val().user
          post['description'] = element.val().description
          post['likelength'] = element.val().likes.length
          post['comments'] = element.val().comments
          posts.unshift(post)
        })
      })
      .then(() => {
        this.setState({ refreshing: false })
      })
  }
  async _likePost (index) {
    var liked = posts[index].isLiked
    if (liked == true) {
      var nodeIndex = posts[index].exacttime
      var ref = firebase.database().ref('posts/' + nodeIndex + '/likes/length')
      var ref2 = firebase.database().ref('posts/' + nodeIndex + '/likes')
      var oldLikeCount
      await ref.once('value').then(function (snapshot) {
        oldLikeCount = snapshot.val()
      })
      var newLikeCount
      newLikeCount = oldLikeCount - 1
      var currentUserUID = firebase.auth().currentUser.uid
      ref2.update({ length: newLikeCount, [currentUserUID]: null })
    } else {
      var nodeIndex = posts[index].exacttime
      var ref = firebase.database().ref('posts/' + nodeIndex + '/likes/length')
      var ref2 = firebase.database().ref('posts/' + nodeIndex + '/likes')
      var oldLikeCount
      await ref.once('value').then(function (snapshot) {
        oldLikeCount = snapshot.val()
      })
      var newLikeCount = oldLikeCount + 1
      var currentUserUID = firebase.auth().currentUser.uid
      ref2.update({ length: newLikeCount, [currentUserUID]: 'true' })
    }

    if (liked == true) {
      posts[index].isLiked = false
    } else {
      posts[index].isLiked = true
    }
    this._onRefresh()
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <NaviBar
            title=''
            // leftElement = {GOBACK_BUTTON}
            leftElement={null}
          />
          <ActivityIndicator
            animating
            color='black'
            size='large'
            style={{ top: 50, margin: 15 }}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <NaviBar
            style={styles.navBar}
            title='Home'
            // leftElement = {GOBACK_BUTTON}
            leftElement={null}
          />
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >

            {posts.map((post, i) => {
              var likes = post.likelength + ' '

              return (
                <Card key={i} style={styles.card}>
                  <CardTitle
                    title={post.title}
                    subtitle={post.user == this.state.username ? post.user +' (You)' : post.user }
                    separator
                  />
                  <CardContent text={post.description} />
                  <CardAction separator inColumn={false}>
                    <Button
                      containerViewStyle={{  marginRight: 0 }}
                      color={post.isLiked ? '#3EA6FF' : '#cecece'}
                      buttonStyle={styles.likeButton}
                      title={likes}
                      onPress={() => this._likePost(i)}
                      icon={{
                        size: 18,
                        name: 'thumb-up',
                        color: post.isLiked ? '#3EA6FF' : '#cecece'
                      }}
                    />
                    <Button
                    containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
                      color={'#cecece'}
                      buttonStyle={styles.likeButton}
                      title={'Comments'}
                      onPress={() => {
                        this.props.navigation.navigate('Comments', {
                          postIndex : post.exacttime
                        })
                      }}
                      icon={{
                        size: 18,
                        name: 'chat-bubble',
                        color: '#cecece'
                      }}
                    />
                    
                    {post.user == this.state.username
                      ? <Button
                      containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
                        color='red'
                        buttonStyle={styles.likeButton}
                        title={'Delete'}
                        onPress={() => this.delete(i)}
                        icon={{
                          size: 18,
                          name: 'delete',
                          color: 'red'
                        }}
                        />
                      : ''}

                  </CardAction>
                </Card>
              )
            })}

          </ScrollView>
        </View>
      )
    }
  }
}
