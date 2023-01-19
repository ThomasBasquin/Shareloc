import React, {useState} from "react";
import { Text, View, ScrollView, StyleSheet, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../components/Title";
import { COLOR } from "../constantes/Color";
import { FontAwesome } from '@expo/vector-icons';
import Box from "../components/Box";

const Messagerie = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.blanc }}>
      <Title title="Messagerie" />
      <Discussion />
    </View>
  );
};

const Discussion = () => {
  return (
    <View style={{ backgroundColor: COLOR.blanc, height: "100%" }}>
      <Box>
        <ScrollView style={{ height: "70%", margin: 5 }}>
          
            <MessageAutre name="Hugo" hour="12:21" message="Coucou bande de nouille"/>
            <MessageAutre name="Hugo" hour="12:21" message="Coucou bande de nouille"/>
          
          <MessagePerso name="Hugo" hour="12:29" message="Coucou bande de nouille"/>
          <MessagePerso name="Hugo" hour="12:29" message="Coucou bande de nouille"/>
          <MessagePerso name="Hugo" hour="12:29" message="Coucou bande de nouille"/>
          <MessagePerso name="Hugo" hour="12:29" message="Coucou bande de nouille"/>
        </ScrollView>
      </Box>
      <AddMessage />
    </View>
  );
};

const MessageAutre = ({name, hour, message}) => {
  return (<View style={{marginTop: 7}}>
    <NomHeure name={name} hour={hour} />
    <View style={styles.messageAutre}>
      <Text>
        {message}
      </Text>
    </View>
    </View>
  );
};

const AddMessage =() => {
  const [message, setMessage] = useState("");
  return (
    <View style={{flexDirection : 'row', padding : 20}}>
      <TextInput
      style={styles.input}
      value={message}
      placeholder="Nouveau message"
      onChangeText={setMessage} />
      <View style={{backgroundColor : COLOR.jaune, padding : 10, borderRadius : 20, height : 48, marginLeft : 10}}>
      <FontAwesome name="send" size={24} color="black" />
    </View>
    </View>
  )
}

const MessagePerso = ({name, hour, message}) => {
  return (<View style={{marginTop: 7, right:0, left : 60}}>
    <View style={{left :160}}>
    <NomHeure name={name} hour={hour} />
    </View>
    <View style={styles.messagePerso}>
      
      <Text style={{color : COLOR.blanc}}>
        {message}
      </Text>
    </View>
    </View>
  );
};

const NomHeure = ({name, hour}) => {
  return (
    <View style={{flexDirection: "row", marginLeft:5, marginBottom:5}}>
    <Text style={{marginRight:5}}>{name}</Text>
    <Text>{hour}</Text>
    </View>
  )
}

const styles = new StyleSheet.create({
  messageAutre: {
    maxWidth: 250,
    backgroundColor: COLOR.gris,
    padding: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  messagePerso: {
    maxWidth: 250,
    backgroundColor: COLOR.bleuFonce,
    padding: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  input: {
    height: 40,
    width: 250,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
});
export default Messagerie;
