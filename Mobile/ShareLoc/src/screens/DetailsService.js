import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Title from '../components/Title';
import { Octicons } from '@expo/vector-icons';
import {COLOR} from "../constantes/Color"


const DetailsService = ({route, navigation}) => {
    const {points, date, by, label} = route.params;
    return (
        
        <View style={{  backgroundColor: COLOR.blanc}}>
      <Title title="Détails" />
     <Text></Text>
      </View>
    )
}

export default DetailsService;