import React from 'react';
import { Text, View, Button } from 'react-native';


const Authentification = ({navigation}) => {
    return (
        <View>
            <Text>Authentification</Text>
            <Button 
            title="Authentication"
            onPress = {()=>navigation.navigate('Home')}
            />
        </View>
    )
}

export default Authentification