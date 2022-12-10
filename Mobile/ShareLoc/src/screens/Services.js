import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Title from '../components/Title';
import { Octicons } from '@expo/vector-icons';
import {COLOR} from "../constantes/Color"


const Services = ({navigation}) => {
    return (
        
        <View style={{ justifyContent: "space-between", flexDirection: "row", backgroundColor: COLOR.blanc}}>
      <Title title="Services" />
      <TouchableOpacity
                onPressIn={() => {
                  navigation.navigate("Messagerie")
                }}
              >
      <Octicons name="feed-discussion" size={35} color={COLOR.bleuFonce} style={{margin:25}}/></TouchableOpacity>
      </View>
    )
}

export default Services;