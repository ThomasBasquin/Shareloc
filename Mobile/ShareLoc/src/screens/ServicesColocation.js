import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../components/Title";
import { Octicons } from "@expo/vector-icons";
import { COLOR } from "../constantes/Color";
import ButtonComponent from "../components/ButtonComponent";
import ServiceComponent from "../components/ServiceComponent";
import BoxResume from "../components/BoxResume";

const ServicesColocation = ({ navigation }) => {
  const [enCours, setEnCours] = useState(false);
  const [termines, setTermines] = useState(false);

  const enCoursFonction = () => {
    if (termines) {
      setTermines(!termines);
    }
    setEnCours(!enCours);
  };
  const estTermines = () => {
    if (enCours) {
      setEnCours(!enCours);
    }
    setTermines(!termines);
  };
  return (
    <View style={{ backgroundColor: COLOR.blanc, height: "100%" }}>
      <Title title="Services de ma colocation" />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={() => {
            enCoursFonction();
          }}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <BoxResume>
            <Text
              style={{
                color: enCours ? COLOR.jaune : COLOR.blanc,
                textAlign: "center",
              }}
            >
              Services en cours
            </Text>
          </BoxResume>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            estTermines();
          }}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <BoxResume>
            <Text
              style={{
                color: termines ? COLOR.jaune : COLOR.blanc,
                textAlign: "center",
              }}
            >
              Services terminés
            </Text>
          </BoxResume>
        </TouchableOpacity>
      </View>
      {enCours ? <ServicesEnCours navigation={navigation} /> : <></>}
      {termines ? <ServicesTermines navigation={navigation} /> : <></>}
    </View>
  );
};

const ServicesEnCours = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: COLOR.blanc, margin: 10 }}>
      <Text style={styles.titrePartie}>Les services en cours :</Text>
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
    </View>
  );
};

const ServicesTermines = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: COLOR.blanc, margin: 10 }}>
      <Text style={styles.titrePartie}>Les services terminés :</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  titrePartie: {
    fontSize: 20,
    fontWeight: "600",
    margin: 5,
  },
});

export default ServicesColocation;
