/**
 * This is a fancy bottom navigation menu, but couldnt get the pages to work...
 */

import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import BottomNavigation, {
  IconTab,
  FullTab,
  Badge
} from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/Ionicons';
import NewPost from './NewPost';
import Home from './Home';
import Contact from './Contact';

export default class Tabs extends React.Component {
  state = {
    activeTab: 'games'
  }

  tabs = [
    {
      screen: Home,
      key: 'home',
      label: 'Home',
      barColor: '#50a6ba',
      pressColor: 'rgba(255, 255, 255, 0.16)',
      icon: 'ios-home'
    },
    {
      screen: NewPost,
      key: 'new-post',
      label: 'New Post',
      barColor: '#50a6ba',
      pressColor: 'rgba(255, 255, 255, 0.16)',
      icon: 'ios-add-circle'
    },
    {
      screen: Contact,
      key: 'profile',
      label: 'Your Profile',
      barColor: '#50a6ba',
      pressColor: 'rgba(255, 255, 255, 0.16)',
      icon: 'ios-contact'
    }
  ]

  state = {
    activeTab: this.tabs[0].key
  }

  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} />
  )

  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      showBadge={tab.key === 'movies-tv'}
      renderBadge={() => <Badge>2</Badge>}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Image
            style={{
              resizeMode: 'contain',
              width: 412,
              bottom: -120,
              opacity: 0.5
            }}
          />
        </View>
        <BottomNavigation
          tabs={this.tabs}
          activeTab={this.state.activeTab}
          onTabPress={newTab => this.setState({ activeTab: newTab.key })}
          renderTab={this.renderTab}
          useLayoutAnimation
        />
      </View>
    )
  }
}