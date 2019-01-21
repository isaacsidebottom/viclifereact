
import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  navBar: {
    backgroundColor: '#f4f4f4',
    height: 100,
    elevation: 10
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    elevation:5,
    marginBottom:10
  },
  likeButton: {
    backgroundColor: 'white'
  },
  
  
  nameText: {
    color: '#adadad'
  },
  timeText: {
    color: '#adadad',
    marginLeft: 'auto'
  },
  subtitleView:{
    marginLeft: 5,
    flexDirection:'row'
  },
  commentIcon: {
    
  },
  sendIcon: {
    backgroundColor: 'white',
  },
  emptyCommentView : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    
    width: '90%',
    // height: 50,
    fontSize: 18,
    
   color: 'black',
    
    textAlignVertical: "top"
  },
  innerCommentContainer:{
    backgroundColor: '#f4f4f4',
    margin: 5,
    width: '90%',
    borderRadius: 4,
    justifyContent: 'center',
 
// Setting up View inside component align horizontally center.
alignItems: 'center',
 
flex:1
  },
    inputIcon: {
      position: 'absolute',
      left: 40
    },
    inputContainter : {
      flexDirection: 'row',
      backgroundColor: 'white'
    }
});

export default styles