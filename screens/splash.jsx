import React from "react";
import { useEffect } from "react";
import { Dimensions,View ,Image} from "react-native";
import * as RootNav from '../navigation/RootNavigation';
import Routes from "../navigation/Routes";
const {width , height} = Dimensions.get("window");

const SplashScreen = (MyStack) => {
    
    useEffect(() => {
        const splashTimer = setTimeout(() => {
            // MyStack.navigation.reset({
            //     index: 1,
            //     routes: [{ name: 'Home' }],
            //   });
              RootNav.replace(Routes.Home,"abc");
          
        }, 4000);
    
        // Clear the timer on component unmount
        return () => clearTimeout(splashTimer);
      }, []);    
    return <View style={{width:width ,height:height,backgroundColor:"#242A32",justifyContent:"center",alignItems:"center"}}>
       
       <Image source={require("../assets/spalshBackground.png")} style={{width:width,height:height}}/>
       
    </View>

}

export default SplashScreen;