import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../components/Title";
import Box from "../components/Box";
import BoxResume from "../components/BoxResume";
import { COLOR } from "../constantes/Color";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import ServiceComponent from "../components/ServiceComponent";
import ButtonComponent from "../components/ButtonComponent"

const Colocation = ({ navigation }) => {
  return (
    <ScrollView style={{ backgroundColor: COLOR.blanc, marginBottom: 50 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: COLOR.blanc,
          }}
        >
          <Title title="Ma colocation" />
          <TouchableOpacity
            onPressIn={() => {
              navigation.navigate("Messagerie");
            }}
          >
            <Octicons
              name="feed-discussion"
              size={35}
              color={COLOR.bleuFonce}
              style={{ margin: 25 }}
            />
          </TouchableOpacity>
        </View>

        <Resume />
        <Participants />
        <ServicesEnCours navigation={navigation} />
      </View>
    </ScrollView>
  );
};

const Resume = () => {
  return (
    <Box>
      <View>
        <Text style={styles.text}>Résumé</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <BoxResume>
            <Text style={styles.titreBoxResume}>Participants</Text>
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="ios-people"
                color={COLOR.jaune}
                size={20}
                style={{ marginBottom: 2 }}
              />
              <Text
                style={{ color: COLOR.blanc, marginLeft: 10, marginTop: 3 }}
              >
                5
              </Text>
            </View>
          </BoxResume>
          <BoxResume>
            <Text style={styles.titreBoxResume}>Services</Text>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome
                name="exchange"
                size={21}
                color={COLOR.jaune}
                style={{ marginBottom: 2 }}
              />
              <Text
                style={{ color: COLOR.blanc, marginLeft: 10, marginTop: 3 }}
              >
                5
              </Text>
            </View>
          </BoxResume>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <BoxResume>
            <Text style={styles.titreBoxResume}>Points</Text>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome
                name="star"
                size={20}
                color={COLOR.jaune}
                style={{ marginBottom: 2 }}
              />
              <Text
                style={{ color: COLOR.blanc, marginLeft: 10, marginTop: 3 }}
              >
                67
              </Text>
            </View>
          </BoxResume>
          <BoxResume>
            <Text style={styles.titreBoxResume}>Top Coloc</Text>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome
                name="trophy"
                size={20}
                color={COLOR.jaune}
                style={{ marginBottom: 2 }}
              />
              <Text
                style={{ color: COLOR.blanc, marginLeft: 10, marginTop: 3 }}
              >
                Roméo
              </Text>
            </View>
          </BoxResume>
        </View>
      </View>
    </Box>
  );
};

const Participants = () => {
  return (
    <View style={styles.participants}>
      <Text style={styles.titreParticipants}>Participants :</Text>
      <Box>
        <ItemParticipants prenom="Roméo" role="créateur" points={76} />
        <ItemParticipants prenom="Thomas" role="participant" points={50} />
        <ItemParticipants prenom="Hugo" role="participant" points={35} />
        <ItemParticipants prenom="Gaytan" role="participant" points={14} />
        <ItemParticipants prenom="Lucas" role="participant" points={0} />
      </Box>
    </View>
  );
};
const ItemParticipants = ({ prenom, role, points }) => {
  return (
    <View style={styles.itemParticipants}>
      <Text style={styles.prenom}>
        {prenom} <Text style={styles.role}>({role})</Text>
      </Text>
      <Text style={styles.nbPoints}>
        {points} <Text style={{ color: COLOR.jaune }}>pts</Text>
      </Text>
    </View>
  );
};

const ServicesEnCours = ({ navigation }) => {
  return (
    <View style={styles.participants}>
      <Text style={styles.titreParticipants}>Services en cours :</Text>
      <ServiceComponent
        navigation={navigation}
        date="18/02/2022"
        by="Hugo"
        pour="Roméo"
        label="Passez l'aspirateur"
        score={10}
      />
      <ServiceComponent
        navigation={navigation}
        date="18/02/2022"
        by="Hugo"
        pour="Roméo"
        label="Passez l'aspirateur"
        score={10}
      />
      <ServiceComponent
        navigation={navigation}
        date="18/02/2022"
        by="Hugo"
        pour="Roméo"
        label="Passez l'aspirateur"
        score={10}
      />
      
      <ButtonComponent primary onPress={()=> {navigation.navigate("ServicesColocation")}}>Voir tout</ButtonComponent>
    
    </View>
  );
};

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
    margin: "2%",
  },
  titreParticipants: {
    fontSize: 25,
    fontWeight: "800",
    color: COLOR.bleuFonce,
    marginBottom: 10,
    marginLeft: 10,
  },
  prenom: {
    fontSize: 19,
    fontWeight: "600",
    color: COLOR.bleuFonce,
  },
  role: {
    color: COLOR.jaune,
    fontSize: 15,
    fontWeight: "400",
  },
  itemParticipants: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: COLOR.gris,
  },
  nbPoints: {
    fontSize: 16,
  },
  voirTout : {
    fontSize: 18,
    fontWeight: "600",
    margin :10
  }
});

export default Colocation;
