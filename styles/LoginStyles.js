import { StyleSheet,Dimensions} from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
const styles = StyleSheet.create({
    backgroundContainer: {
      flex: 1,
      width: null,
      height: null,
      justifyContent: 'center',
      alignItems: 'center'
    },
    logoContainer: {
      top: -60,
      marginBottom: 30,
      alignItems: 'center'
    },
    logo: {
      width: 120,
      height: 120,
      
    },
    logoText: {
      color: 'white',
      fontSize: 40
    },
    input: {
      top: -90,
      width: WIDTH - 55,
      height: 50,
      borderRadius: 25,
      fontSize: 16,
      paddingLeft: 45,
      backgroundColor: 'rgba(0,0,0,0.35)',
      color: 'white',
      marginHorizontal: 25
    },
    inputContainter: {
      marginTop: 10
    },
    inputIcon: {
      position: 'absolute',
      top: -79,
      left: 40
    },
    btnLogin: {
      top: -90,
      width: WIDTH - 55,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#50a6ba',
      justifyContent: 'center',
      marginTop: 10
    },
    text: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: 16,
      textAlign: 'center'
    },
    signupText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight:'600'
    },
    signUpTextContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:30,
      flexDirection:'row'
    }
  })
  export default styles