import React from "react";
import { Text, StyleSheet, TouchableOpacity} from "react-native";


const CustomButton =({title, color,onPress}) => {
    
const styles = StyleSheet.create({
    button: {
        borderRadius: 15,
        backgroundColor: color,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical:5
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
        fontFamily: "Poppins",
    },
});

    return (<TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>);
}

export default CustomButton;
