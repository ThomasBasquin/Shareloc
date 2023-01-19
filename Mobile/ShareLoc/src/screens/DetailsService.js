import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../components/Title";
import { Octicons } from "@expo/vector-icons";
import { COLOR } from "../constantes/Color";
import BoxResume from "../components/BoxResume";
import ButtonComponent from "../components/ButtonComponent";
import BoxGrise from "../components/BoxGrise";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import ModalGeneral from "../components/ModalGeneral";
import useFetch from "../constantes/UseFetch";
import URLS from "../constantes/Routes";

const DetailsService = ({ route, navigation }) => {
  const { id, points, dateCreation, dateTermine, by, pour, label } =
    route.params;

  return (
    <View style={{ backgroundColor: COLOR.blanc, margin: 5, height: "100%" }}>
      <View style={{ flexDirection: "column" }}>
        <Title title={label} />
        <View style={{ alignItems: "center" }}>
          <BoxResume>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ color: COLOR.jaune, fontSize: 16, fontWeight: "600" }}
              >
                {dateTermine ? "Terminé" : "En cours"}
              </Text>
            </View>
          </BoxResume>
        </View>
      </View>
      <ContenuDetails
        points={points}
        dateCreation={dateCreation}
        dateTermine={dateTermine}
        id={id}
        by={by}
        pour={pour}
        label={label}
        navigation={navigation}
      />
    </View>
  );
};

const ContenuDetails = ({
  points,
  id,
  dateCreation,
  dateTermine,
  by,
  pour,
  label,
  navigation,
}) => {
  const [modalVisibility, setModalVisibility] = useState(false);

  const validService = (navigation) => {
    useFetch(URLS.validService.replace("{service}", id), "PUT").then(() =>
      navigation.goBack()
    );
  };

  return (
    <View>
      <BoxGrise>
        <View style={styles.row}>
          <AntDesign name="calendar" size={24} color={COLOR.bleuFonce} />
          <Text style={styles.date}>{dateCreation}</Text>
        </View>
      </BoxGrise>
      <BoxGrise>
        <View style={styles.row}>
          <FontAwesome name="star" size={24} color={COLOR.bleuFonce} />
          <Text style={styles.points}>{points} pts</Text>
        </View>
      </BoxGrise>
      <BoxGrise>
        <View style={styles.row}>
          <Ionicons
            name="md-people-sharp"
            size={32}
            color={COLOR.bleuFonce}
            style={{ marginTop: 10 }}
          />
          <View style={styles.column}>
            <View style={styles.de}>
              <Text>De</Text>
              <Text style={styles.by}>{by}</Text>
            </View>
            <View style={styles.pour}>
              <Text>Pour</Text>
              <Text style={styles.for}>{pour}</Text>
            </View>
          </View>
        </View>
      </BoxGrise>
      {!dateTermine ? (
        <ButtonComponent onPress={() => setModalVisibility(!modalVisibility)}>
          <Text>Valider le service</Text>
        </ButtonComponent>
      ) : null}
      <ModalGeneral visible={modalVisibility}>
        <Text style={styles.titreModal}>Etes vous sûr ?</Text>
        <Text style={styles.contenu}>
          Vous êtes sur le point de confirmer le service suivant :
          <Text style={{ fontWeight: "700", fontSize: 20 }}>{label}</Text>
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ButtonComponent onPress={() => validService(navigation)}>
            Confirmer
          </ButtonComponent>
          <ButtonComponent
            primary
            onPress={() => setModalVisibility(!modalVisibility)}
          >
            <Text>Annuler</Text>
          </ButtonComponent>
        </View>
      </ModalGeneral>
    </View>
  );
};

const styles = new StyleSheet.create({
  date: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 5,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
    marginLeft: 5,
  },
  points: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: "600",
  },
  de: {
    flexDirection: "row",
    borderBottomWidth: 1,
    width: 280,
    padding: 4,
  },
  pour: {
    flexDirection: "row",
    padding: 4,
  },
  by: {
    marginLeft: 40,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: COLOR.jaune,
    fontWeight: "700",
  },
  for: {
    marginLeft: 28.8,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: COLOR.jaune,
    fontWeight: "700",
  },
  titreModal: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 18,
  },
  contenu: {
    fontSize: 15,
  },
});

export default DetailsService;
