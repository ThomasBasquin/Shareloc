import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


const Colocation = ({navigation}) => {
    return (
        
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Text>Colocation</Text>
            <Ionicons name='md-checkmark-circle' size={32} color='green' />
        </View>
    )
}

export default Colocation;