import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Title from '../components/Title'
import Box from '../components/Box'
import BoxResume from '../components/BoxResume'
import {COLOR} from "../constantes/Color"


const Colocation = ({navigation}) => {
    return (
        
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Title title="Ma colocation" />
            <Box>
                <View>
                    <Text style={styles.text}>Résumé</Text>
                    <BoxResume>
                        <Text style={styles.titreBoxResume}>Participants</Text>
                    </BoxResume>
                </View>
            </Box>
            <Ionicons name='md-checkmark-circle' size={32} color='green' />
        </View>
    )
}
const styles = new StyleSheet.create({
    text: {
      fontSize: 18,
      fontWeight: "600",
      color: COLOR.bleuFonce,
      width:"100%", 
      textAlign: 'center'
    },
    titreBoxResume: {
        fontSize: 14,
        fontWeight: "500",
        color: COLOR.jaune,
        width:"100%", 
        textAlign: 'center'
      },
    
    
  });
export default Colocation;