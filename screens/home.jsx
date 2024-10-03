import React from "react";
import * as RootNav from "../navigation/RootNavigation" 
import { Text, View, Image, TouchableOpacity,StyleSheet, } from "react-native";
import Routes from "../navigation/Routes";



const Home = () => {
  
  const handlePress = () => {
    try{
    RootNav.replace(Routes.Record);
    } catch(e){
      console.log(e);
    }
  };

  return <View style={styles.container}>
    <Image
      style={styles.image}
      source={require('../assets/HomeBackground.png')}
    />
    <TouchableOpacity style={styles.btn} onPress={handlePress}>
      <Text style={styles.btnText}>Get Started</Text>
    </TouchableOpacity>
</View>

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003f5c',
  },
  image: {
    flex: 1,
    width:"100%",
    height:"100%",
    resizeMode: 'cover', 
  },
  btn: {
    position:'absolute',
    width: '80%',
    backgroundColor: '#d21a32',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    bottom:20,
  },
  btnText: {
    fontSize:18,
    fontWeight:"bold",
    color: 'white',

  },
});
export default Home;