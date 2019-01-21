import React from 'react'
import {
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  KeyboardAvoidingView,
  FlatList,
  TextInput
} from 'react-native'
import Emoji from 'react-native-emoji'
import { Button, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from '../styles/PageStyles.js'
import NaviBar from 'react-native-pure-navigation-bar'
import firebase from './Firebase.js'
export const GOBACK_BUTTON = '__gobackbutton__'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      refreshing: false,
      isLoading: true, // change this to false
      username: '',
      comments: [],
      currentTime: 0,
      newComment: ''
    }
  }

  componentDidMount () {
    // preprocess posts data.
    var self = this
    var userRef = firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid + '/username')
    userRef.once('value').then(function (snapshot) {
      self.setState({ username: snapshot.val() })
    })

    var postsRef = firebase
      .database()
      .ref('posts/' + this.props.navigation.getParam('postIndex', '-1'))
    postsRef.on('value', function (snapshot) {
      var CommentsArray = []
      // STILL NEED TO DO - NEED TO FIX
      snapshot.forEach(element => {
        var comment = {}
        if (element.key == 'comments') {
          element.forEach(element2 => {
            comment['time'] = element2.key
            element2.forEach(element3 => {
              if (element3.key == 'comment') {
                comment['comment'] = element3.val()
              } else {
                comment['name'] = element3.val()
              }
            })
            if (comment['time'] != null) {
              CommentsArray.unshift(comment)
              comment = {}
            }
          })
        }
      })
      self.setState({ isLoading: false }) // use setState
      self.setState({ comments: CommentsArray })
    })
  }
  _onRefresh = () => {
    var self = this
    this.setState({ refreshing: true })
    var CommentsArray = []
    var postsRef = firebase
      .database()
      .ref('posts/' + this.props.navigation.getParam('postIndex', '-1'))
    postsRef.once('value', function (snapshot) {
      snapshot.forEach(element => {
        var comment = {}
        if (element.key == 'comments') {
          element.forEach(element2 => {
            comment['time'] = element2.key
            element2.forEach(element3 => {
              if (element3.key == 'comment') {
                comment['comment'] = element3.val()
              } else {
                comment['name'] = element3.val()
              }
            })
            if (comment['time'] != null) {
              CommentsArray.unshift(comment)
              comment = {}
            }
          })
        }
      })
      self.setState({ isLoading: false }) // use setState
      self.setState({ comments: CommentsArray })
      self.setState({ refreshing: false })
    })
  }

  timeDifference (current, previous) {
    var msPerMinute = 60 * 1000
    var msPerHour = msPerMinute * 60
    var msPerDay = msPerHour * 24
    var msPerMonth = msPerDay * 30
    var msPerYear = msPerDay * 365

    var elapsed = current - previous

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago'
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago'
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago'
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago'
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago'
    } else {
      return Math.round(elapsed / msPerYear) + ' years ago'
    }
  }
  async sendComment () {
    if (this.state.newComment != '') {
      this.setState({ newComment: '' })
      var self = this
      this.setState({ refreshing: true })
      var commentsRef = firebase
        .database()
        .ref(
          'posts/' +
            this.props.navigation.getParam('postIndex', '-1') +
            '/comments/' +
            new Date().getTime()
        )
      commentsRef
        .set({
          comment: self.state.newComment,
          user: self.state.username
        })
        .then(() => {
          this.setState({ refreshing: false })
        })
    }
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <NaviBar
            title=''
            // leftElement = {GOBACK_BUTTON}
            leftElement={null}
            onLeft={() => this.props.navigation.goBack()}
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
            title='Comments'
            leftElement={GOBACK_BUTTON}
            onLeft={() => this.props.navigation.goBack()}
          />
          {this.state.comments.length == 0
            ? <View style={styles.emptyCommentView}>
              <Text>
                  There appears to be no comments, be the first one!
                  {' '}
                <Emoji name={':grinning:'} />
              </Text>
            </View>
            : <FlatList
              style={{ flex: 1 }}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                  />
                }
              data={this.state.comments}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ListItem
                  hideChevron
                  leftIcon={
                    <Icon
                      name='ios-contact'
                      size={28}
                      color={'black'}
                      style={styles.commentIcon}
                      />
                    }
                  title={
                    <View
                      style={{
                        justifyContent: 'center',
                        flex: 1,
                        marginLeft: 5
                      }}
                      >
                      {' '}
                      <Text style={{ padding: 10, fontSize: 18 }}>
                        {item.comment}
                      </Text>
                      {' '}
                    </View>
                    }
                  titleStyle={{ marginLeft: 5 }}
                  subtitle={
                    <View style={styles.subtitleView}>
                        \
                        <Text style={styles.nameText}>
                          {item.name == this.state.username
                            ? item.name + ' (You)'
                            : item.name}
                        </Text>
                      <Text style={styles.timeText}>
                        {this.timeDifference(new Date().getTime(), item.time)}
                      </Text>

                    </View>
                    }
                  />
                )}
              />}

          <KeyboardAvoidingView
            style={styles.inputContainter}
            behavior='padding'
            enabled
          >
            <View style={styles.innerCommentContainer}>
              <TextInput
                value={this.state.newComment}
                multiline
                style={styles.input}
                // autoCapitalize='none'
                autoCorrect
                placeholder={'#GoodVibesPlease'}
                placeholderTextColor={'#dbdbdb'}
                onChangeText={newComment => this.setState({ newComment })}
              />
            </View>

            <Button
              buttonStyle={styles.sendIcon}
              // title={'Delete'}
              onPress={() => this.sendComment()}
              icon={{
                size: 24,
                name: 'send',
                color: '#49a2bc',
                style: { alignSelf: 'center' }
              }}
            />
          </KeyboardAvoidingView>

        </View>
      )
    }
  }
}
