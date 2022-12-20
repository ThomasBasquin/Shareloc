import React from "react";
import { StyleSheet, View,Text } from "react-native";
import { COLOR } from "../constantes/Color";


/**
 * Composant pour renvoyer une erreur
 * @param {string} text Message d'erreur
 * @param {*} style Style aditionnel
 * @param {*} other other
 */
export default function ErrorMessage({text,style={}}){
    return (
        <View style={{...styles.view,...style}}>
            <Text style={styles.texte}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        width:"94%",
        padding:15,
        margin:"2%",
        backgroundColor: COLOR.rouge,
        borderRadius:15
    },
    texte:{
        color:COLOR.blanc,
        fontWeight:"800"
    }
})