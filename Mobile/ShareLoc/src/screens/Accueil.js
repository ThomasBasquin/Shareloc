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
import ServiceComponent from "../components/ServiceComponent";

const Accueil = ({ navigation }) => {
  return (
    <ScrollView style={{ backgroundColor: COLOR.blanc, marginBottom: 50 }}>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          backgroundColor: COLOR.blanc,
        }}
      >
        <Title title="Accueil" />
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
      <View style={{ flex: 1, backgroundColor: COLOR.blanc, margin: 10 }}>
        <MesPoints />
        <Text style={styles.titreMesServices}>Mes services en cours :</Text>
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
          date="19/02/2022"
          by="Lucas"
          pour="Roméo"
          label="Passez le balais"
          score={12}
        />
        <ServiceComponent
          navigation={navigation}
          date="25/12/2022"
          by="Thomas"
          pour="Roméo"
          label="Faire le repas de Noël"
          score={25}
        />
        <ServiceComponent
          navigation={navigation}
          date="15/12/2022"
          by="Thomas"
          pour="Roméo"
          label="Me faire des bisous"
          score={25}
        />
        <ServiceComponent
          navigation={navigation}
          date="25/12/2022"
          by="Thomas"
          pour="Roméo"
          label="Me faire des bisous"
          score={25}
        />
        <ServiceComponent
          navigation={navigation}
          date="25/12/2022"
          by="Thomas"
          pour="Roméo"
          label="Me faire des bisous"
          score={25}
        />
        <ServiceComponent
          navigation={navigation}
          date="25/12/2022"
          by="Thomas"
          pour="Roméo"
          label="Me faire des bisous"
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
    fontSize: 28,
    fontWeight: "600",
    marginLeft: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  infoService: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: "600",
  },
});

export default Accueil;
