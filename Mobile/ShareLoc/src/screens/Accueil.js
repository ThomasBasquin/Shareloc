import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../components/Title";
import BoxGrise from "../components/BoxGrise";
import Box from "../components/Box";
import { FontAwesome } from "@expo/vector-icons";
import { COLOR } from "../constantes/Color";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Accueil = ({ navigation }) => {
  return (
    <ScrollView style={{ backgroundColor: COLOR.blanc }}>
      <View style={{ flex: 1, backgroundColor: COLOR.blanc }}>
        <Title title="Accueil" />
        <MesPoints />
        <Text style={styles.titreMesServices}>Mes services en cours :</Text>
        <MesServices
          date="18/02/2022"
          by="Hugo"
          label="Passez l'aspirateur"
          score={10}
        />
        <MesServices
          date="19/02/2022"
          by="Lucas"
          label="Passez le balais"
          score={12}
        />
        <MesServices
          date="25/12/2022"
          by="Thomas"
          label="Faire le repas de noêl"
          score={25}
        />
      </View>
    </ScrollView>
  );
};

const MesPoints = () => {
  return (
    <BoxGrise>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.points}>Mes points</Text>
        <Text style={styles.pointsScore}>
          76 <FontAwesome name="star" size={24} color={COLOR.jaune} />
        </Text>
      </View>
    </BoxGrise>
  );
};

const MesServices = ({ date, by, label, score }) => {
  return (
    <View>
      <BoxGrise>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <MaterialIcons
              name="cleaning-services"
              color={COLOR.bleuFonce}
              size={30}
            />
            <InfoService date={date} by={by} label={label} />
          </View>
          <ScoreService points={score} />
        </View>
      </BoxGrise>
    </View>
  );
};

const ScoreService = ({ points }) => {
  return (
    <Text style={{ fontSize: 21, fontWeight: "600" }}>
      {points} pts <FontAwesome name="star" size={24} color={COLOR.jaune} />
      <Entypo name="chevron-right" size={30} color="black" />
    </Text>
  );
};

const InfoService = ({ date, by, label }) => {
  return (
    <View style={{ flexDirection: "column" }}>
      <Text style={styles.infoService}>{label}</Text>
      <Text
        style={{
          marginLeft: 10,
          color: COLOR.blanc,
          padding: 2,
          fontSize: 12,
          fontWeight: "",
        }}
      >
        <AntDesign name="calendar" size={16} color={COLOR.blanc} />
        {date}
      </Text>
      <Text
        style={{
          marginLeft: 10,
          color: COLOR.blanc,
          padding: 2,
          fontSize: 12,
        }}
      >
        <FontAwesome5 name="people-arrows" size={16} color={COLOR.blanc} />
        Par {by}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  points: {
    fontSize: 20,
    fontWeight: "600",
  },
  pointsScore: {
    fontSize: 20,
    fontWeight: "600",
  },
  titreMesServices: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 12,
    marginTop: 10,
  },
  infoService: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: "600",
  },
});

export default Accueil;
