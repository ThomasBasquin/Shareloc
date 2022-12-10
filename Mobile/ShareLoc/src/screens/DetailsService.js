import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Title from '../components/Title';
import { Octicons } from '@expo/vector-icons';
import {COLOR} from "../constantes/Color"


const DetailsService = ({}) => {
    return (
        
        <View style={{  backgroundColor: COLOR.blanc}}>
      <Title title="Détails" />
     
      </View>
    )
}

export default DetailsService;