import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import Title from "../components/Title";
import { Octicons } from "@expo/vector-icons";
import { COLOR } from "../constantes/Color";
import ButtonComponent from "../components/ButtonComponent";
import ServiceComponent from "../components/ServiceComponent";
import ModalGeneral from "../components/ModalGeneral";
import { UserContext } from "../Context/UserContext";
import useFetch from "../constantes/UseFetch";
import URLS from "../constantes/Routes";
import DropDownPicker from "react-native-dropdown-picker";
import moment from "moment";


const Services = ({ navigation }) => {
  const [modalVisibility, setModalVisibility] = useState(false);

  const [title, setTitle] = useState("");
  const [performer, setPerformer] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [cost, setCost] = useState(0);

  const { user } = useContext(UserContext);

  const [openPickerPerformer, setOpenPickerPerformer] = useState(false);
  const [openPickerRecipient, setOpenPickerRecipient] = useState(false);
  const [recipientServices, setRecipientServices] = useState([]);
  const [performerServices, setPerformerServices] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  function fetchServices() {
    let promiseAll = [];
    promiseAll.push(
      useFetch(URLS.getServicesRecipient.replace("{user}", user.id))
    );
    promiseAll.push(
      useFetch(URLS.getServicesPerformer.replace("{user}", user.id))
    );
    if (user.colocation) {
      useFetch(
        URLS.getCollocation.replace("{collocation}", user.colocation)
      ).then((c) =>
        setMembers(
          c.members.map((m) => ({
            label: m.firstname + " " + m.lastname,
            value: m.id,
          }))
        )
      );
    }

    Promise.all(promiseAll).then(([recipient, performer]) => {
      setRecipientServices(recipient);
      setPerformerServices(performer);
      setTitle("");
      setPerformer(null);
      setRecipient(null);
      setCost(0);
      setModalVisibility(false);
    });
  }

  const annuler = () => {
    setModalVisibility(!modalVisibility);
    setTitle("");
    setPerformer(null);
    setRecipient(null);
    setCost(0);
  };

  const valider = () => {
    useFetch(URLS.createService, "POST", {
      title,
      performer,
      recipient,
      cost,
      collocation: user.colocation,
    })
      .then(() => {
        fetchServices();
      })
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
        {user.colocation ? (
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
        ) : null}
      </View>
      {user.colocation !== null ? (
        <ButtonComponent
          primary
          onPress={() => setModalVisibility(!modalVisibility)}
        >
          <Text>Cr??er un service</Text>
        </ButtonComponent>
      ) : null}
      <ServiceBeneficiaire
        navigation={navigation}
        services={recipientServices}
      />
      <ServiceActionnaire
        navigation={navigation}
        services={performerServices}
      />
      <ServiceFinis
        navigation={navigation}
        services={[...recipientServices, ...performerServices].filter(
          (s) => s.validatedAt !== null
        )}
      />
      <ModalGeneral visible={modalVisibility}>
        <Text style={styles.titreModal}>Cr??ez un service</Text>
        <TextInput
          style={styles.input}
          value={title}
          placeholder="Nom du service"
          onChangeText={(e) => setTitle(e)}
        />
        <DropDownPicker
          mode="SIMPLE"
          dropDownDirection="TOP"
          open={openPickerPerformer}
          value={performer}
          items={members}
          setOpen={setOpenPickerPerformer}
          setValue={setPerformer}
          setItems={setMembers}
          theme="LIGHT"
          placeholder="Actionnaire"
          multiple={false}
          style={styles.input}
        />
        <DropDownPicker
          mode="SIMPLE"
          dropDownDirection="BOTTOM"
          open={openPickerRecipient}
          setOpen={setOpenPickerRecipient}
          value={recipient}
          setValue={setRecipient}
          items={members}
          setItems={setMembers}
          theme="LIGHT"
          placeholder="B??n??ficiare"
          multiple={false}
          style={styles.input}
        />
        <TextInput
          style={styles.input}
          value={cost}
          placeholder="Nombre de points"
          onChangeText={(e) => setCost(parseInt(e))}
          keyboardType="numeric"
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ButtonComponent onPress={() => valider()}>Cr??er</ButtonComponent>
          <ButtonComponent primary onPress={() => annuler()}>
            <Text>Annuler</Text>
          </ButtonComponent>
        </View>
      </ModalGeneral>
    </ScrollView>
  );
};

const ServiceActionnaire = ({ navigation, services }) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.blanc, margin: 10 }}>
      <Text style={styles.titrePartie}>
        Mes services en tant que actionnaire :
      </Text>
      {services.length ? (
        services.map((s) => (
          <ServiceComponent
            id={s.id}
            navigation={navigation}
            dateCreation={moment(s.createdAt).format("LL")}
            dateTermine={
              s.validatedAt ? moment(s.validatedAt).format("LL") : null
            }
            by={s.performer.firstname}
            pour={s.recipient.firstname}
            label={s.title}
            score={s.cost}
          />
        ))
      ) : (
        <Text>Vous n'avez aucun services en tant que actionnaire</Text>
      )}
    </View>
  );
};

const ServiceBeneficiaire = ({ navigation, services }) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.blanc, margin: 10 }}>
      <Text style={styles.titrePartie}>Mes services en cours :</Text>
      {services.length ? (
        services.map((s) => (
          <ServiceComponent
            id={s.id}
            navigation={navigation}
            dateCreation={moment(s.createdAt).format("LL")}
            dateTermine={
              s.validatedAt ? moment(s.validatedAt).format("LL") : null
            }
            by={s.performer.firstname}
            pour={s.recipient.firstname}
            label={s.title}
            score={s.cost}
          />
        ))
      ) : (
        <Text>Vous n'avez aucun services en tant que b??n??ficiaire</Text>
      )}
    </View>
  );
};

const ServiceFinis = ({ navigation, services }) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.blanc, margin: 10 }}>
      <Text style={styles.titrePartie}>Mes services termin??s :</Text>
      {services.length ? (
        services.map((s) => (
          <ServiceComponent
            id={s.id}
            navigation={navigation}
            dateCreation={moment(s.createdAt).format("LL")}
            dateTermine={
              s.validatedAt ? moment(s.validatedAt).format("LL") : null
            }
            by={s.performer.firstname}
            pour={s.recipient.firstname}
            label={s.title}
            score={s.cost}
          />
        ))
      ) : (
        <Text>Vous n'avez aucun services termin??s</Text>
      )}
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
