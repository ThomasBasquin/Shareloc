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
import BoxGrise from "../components/BoxGrise";
import Box from "../components/Box";
import { FontAwesome } from "@expo/vector-icons";
import { COLOR } from "../constantes/Color";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import BoxService from "../components/BoxService";

const ServiceComponent = ({ navigation, date, by, pour, label, score }) => {
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
            <InfoService date={date} by={by} pour={pour} label={label} />
          </View>
          <ScoreService
            points={score}
            navigation={navigation}
            date={date}
            by={by}
            pour={pour}
            label={label}
          />
        </View>
      </BoxGrise>
    </View>
  );
};

const ScoreService = ({ points, navigation, date, by, pour, label }) => {
  return (
    <Text style={{ fontSize: 21, fontWeight: "600" }}>
      {points} pts <FontAwesome name="star" size={24} color={COLOR.jaune} />
      <TouchableOpacity
        onPressIn={() => {
          navigation.navigate("Détails", {
            points: points,
            date: date,
            by: by,
            pour: pour,
            label: label,
          });
        }}
      >
        <Entypo name="chevron-right" size={35} color={COLOR.bleuFonce} />
      </TouchableOpacity>
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
          color: COLOR.bleuFonce,
          padding: 2,
          fontSize: 12,
          fontWeight: "",
        }}
      >
        <AntDesign name="calendar" size={16} color={COLOR.bleuFonce} />
        {date}
      </Text>
      <Text
        style={{
          marginLeft: 10,
          color: COLOR.bleuFonceanc,
          padding: 2,
          fontSize: 12,
        }}
      >
        <FontAwesome5 name="people-arrows" size={16} color={COLOR.bleuFonce} />
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
    marginBottom: 10,
  },
  infoService: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "800",
  },
});

export default ServiceComponent;
