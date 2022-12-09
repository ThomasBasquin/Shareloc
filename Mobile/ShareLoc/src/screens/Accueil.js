import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../components/Title";
import BoxGrise from "../components/BoxGrise";
import Box from "../components/Box";
import { FontAwesome } from "@expo/vector-icons";
import { COLOR } from "../constantes/Color";
import { MaterialIcons } from "@expo/vector-icons";

const Accueil = ({ navigation }) => {
  return (
    <ScrollView style={{ backgroundColor: COLOR.blanc }}>
      <View style={{ flex: 1, backgroundColor: COLOR.blanc }}>
        <Title title="Accueil" />
        <MesPoints />
        <MesServices />
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

const MesServices = () => {
  return (
    <View>
      <Text style={styles.titreMesServices}>Mes services en cours :</Text>
      <Box>
        <BoxGrise>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{alignItems: "center", flexDirection: "row"}}>
              <MaterialIcons
                name="cleaning-services"
                color={COLOR.bleuFonce}
                size={18}
              />
              <Text style={styles.infoService}>Passez l'aspirateur</Text>
            </View>
          </View>
        </BoxGrise>
      </Box>
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
  },
});

export default Accueil;
