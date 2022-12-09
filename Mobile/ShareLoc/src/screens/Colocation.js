import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../components/Title";
import Box from "../components/Box";
import BoxResume from "../components/BoxResume";
import { COLOR } from "../constantes/Color";
import { FontAwesome } from "@expo/vector-icons";

const Colocation = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Title title="Ma colocation" />
      <Resume />
        <Participants />
    </View>
  );
};

const Resume = () => {
    return (
<Box>
        <View>
          <Text style={styles.text}>Résumé</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <BoxResume>
              <Text style={styles.titreBoxResume}>Participants</Text>
              <View style={{ flexDirection: "row" }}>
              <Ionicons name="ios-people" color={COLOR.jaune} size={20} style={{marginBottom:2}}/>
                <Text style={{ color: COLOR.blanc, marginLeft: 10, marginTop: 3 }}>
                  5
                </Text>
              </View>
              
            </BoxResume>
            <BoxResume>
              <Text style={styles.titreBoxResume}>Services</Text>
              <View style={{ flexDirection: "row" }}>
              <FontAwesome name="exchange" size={21} color={COLOR.jaune} style={{marginBottom:2}}/>
                <Text style={{ color: COLOR.blanc, marginLeft: 10, marginTop: 3 }}>
                  5
                </Text>
              </View>
              
            </BoxResume>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <BoxResume>
              <Text style={styles.titreBoxResume}>Points</Text>
              <View style={{ flexDirection: "row" }}>
              <FontAwesome name="star" size={20} color={COLOR.jaune} style={{marginBottom:2}}/>
                <Text style={{ color: COLOR.blanc, marginLeft: 10, marginTop: 3 }}>
                  67
                </Text>
              </View>
              
            </BoxResume>
            <BoxResume>
              <Text style={styles.titreBoxResume}>Top Coloc</Text>
              <View style={{ flexDirection: "row" }}>
                <FontAwesome name="trophy" size={20} color={COLOR.jaune} style={{marginBottom:2}}/>
                <Text style={{ color: COLOR.blanc, marginLeft: 10, marginTop: 3 }}>
                  Roméo
                </Text>
              </View>
            </BoxResume>
          </View>
        </View>
      </Box>)
}


const Participants = () => {
    return (
        <View style={styles.participants}>
            <Text style={styles.titreParticipants}>Participants</Text>
        </View>
    )
}



const styles = new StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: "600",
    color: COLOR.bleuFonce,
    width: "100%",
    textAlign: "center",
  },
  titreBoxResume: {
    fontSize: 14,
    fontWeight: "500",
    color: COLOR.jaune,
    width: "100%",
    textAlign: "center",
    marginBottom: 5,
  },
  participants: {
    margin : "5%"
  },
  titreParticipants : {
    fontSize: 20,
    fontWeight: "800",
    color: COLOR.bleuFonce,
  }
});


export default Colocation;
