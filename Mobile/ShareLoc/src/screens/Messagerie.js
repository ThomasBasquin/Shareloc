import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../components/Title";
import { COLOR } from "../constantes/Color";
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
          <View>
            <MessageAutre name="Hugo" hour="12:21"/>
            <MessageAutre name="Hugo" hour="12:21"/>
          </View>
          <MessagePerso name="Hugo" hour="12:29"/>
        </ScrollView>
      </Box>
    </View>
  );
};

const MessageAutre = ({name, hour}) => {
  return (<View>
    <NomHeure name={name} hour={hour} />
    <View style={styles.messageAutre}>
      <Text>
        TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT
      </Text>
    </View>
    </View>
  );
};

const MessagePerso = ({name, hour}) => {
  return (
    <View style={styles.messagePerso}>
      <NomHeure name={name} hour={hour} />
      <Text style={{color : COLOR.blanc}}>
        TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT
      </Text>
    </View>
  );
};

const NomHeure = ({name, hour}) => {
  return (
    <View style={{flexDirection: "row", marginLeft:5}}>
    <Text>{name}</Text>
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
});
export default Messagerie;
