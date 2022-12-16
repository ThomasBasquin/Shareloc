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
import ModalGeneral from "../components/ModalGeneral";

const Services = ({ navigation }) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [nomService, setNomService] = useState("");
  const [actionnaire, setActionnaire] = useState("");
  const [beneficiaire, setBeneficiaire] = useState("");
  const [nbPoints, setNbPoints] = useState(0);

  const annuler = () => {
    setModalVisibility(!modalVisibility);
    setActionnaire("");
    setNbPoints(0);
    setBeneficiaire("");
    setNomService("");
  };

  const valider = () => {
    setModalVisibility(!modalVisibility);
    setActionnaire("");
    setNbPoints(0);
    setBeneficiaire("");
    setNomService("");
  };
  return (
    <ScrollView style={{ backgroundColor: COLOR.blanc, marginBottom: 50 }}>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          backgroundColor: COLOR.blanc,
        }}
      >
        <Title title="Services" />
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
      <ButtonComponent
        primary
        onPress={() => setModalVisibility(!modalVisibility)}
      >
        <Text>Créer un service</Text>
      </ButtonComponent>
      <ServiceBeneficiaire navigation={navigation} />
      <ServiceActionnaire navigation={navigation} />
      
      <ServiceFinis navigation={navigation} />
      <ModalGeneral visible={modalVisibility}>
        <Text style={styles.titreModal}>Créez un service</Text>
        <TextInput
          style={styles.input}
          value={nomService}
          placeholder="Nom du service"
          onChangeText={setNomService}
        />
        <TextInput
          style={styles.input}
          value={actionnaire}
          placeholder="Actionnaire"
          onChangeText={setActionnaire}
        />
        <TextInput
          style={styles.input}
          value={beneficiaire}
          placeholder="Bénéficiaire"
          onChangeText={setBeneficiaire}
        />
        <TextInput
          style={styles.input}
          value={nbPoints}
          placeholder="Nombre de points"
          onChangeText={setNbPoints}
          keyboardType="numeric"
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ButtonComponent onPress={() => valider()}>Créer</ButtonComponent>
          <ButtonComponent primary onPress={() => annuler()}>
            <Text>Annuler</Text>
          </ButtonComponent>
        </View>
      </ModalGeneral>
    </ScrollView>
  );
};

const ServiceActionnaire = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.blanc, margin: 10 }}>
      <Text style={styles.titrePartie}>
        Mes services en tant que actionnaire :
      </Text>
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

const ServiceBeneficiaire = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.blanc, margin: 10 }}>
      <Text style={styles.titrePartie}>
        Mes services en cours :
      </Text>
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

const ServiceFinis = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.blanc, margin: 10 }}>
      <Text style={styles.titrePartie}>Mes services terminés :</Text>
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
  titreModal: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 18,
  },
  input: {
    height: 40,
    width: 200,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    marginHorizontal: 40,
  },
});

export default Services;
