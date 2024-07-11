import { StyleSheet, Text, View } from 'react-native'
const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text>Image</Text>
      </View>
      <View style={styles.inputContainer}>

      </View>
    </View>
  )
}
export default LoginScreen
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#228B22'
  },
  imageContainer:{
    flex:1,
    justifyContent:'center'
  },
  inputContainer:{
    flex:1,
  }

})