import React from 'react';
import Login from '../components/Login'
import { Text, View, Button } from 'react-native';


const Authentification = ({navigation}) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white'}}>
            <Login />
            <Button 
            title="Authentication"
            onPress = {()=>navigation.navigate('Home')}
            />
        </View>
    )
}

export default Authentification