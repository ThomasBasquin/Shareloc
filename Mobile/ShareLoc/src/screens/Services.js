import React, { useState, useContext,useEffect } from "react";
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
import moment from "moment";
import DropDownPicker from 'react-native-dropdown-picker';

const Services = ({ navigation }) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [serviceCreated, setServiceCreated] = useState({title:"",performer:"",recipient:"",cost:0});

  const { user } = useContext(UserContext);

  const [recipientServices, setRecipientServices] = useState([]);
  const [performerServices, setPerformerServices] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    let promiseAll=[];
    promiseAll.push(useFetch(URLS.getServicesRecipient.replace("{user}", user.id)));
    promiseAll.push(useFetch(URLS.getServicesPerformer.replace("{user}", user.id)));
    if(user.colocation){
      useFetch(URLS.getCollocation.replace("{collocation}", user.colocation))
  .then((c)=> setMembers(c.members))
    }

    Promise.all(promiseAll)
    .then(([recipient,performer])=>{
      setRecipientServices(recipient);
      setPerformerServices(performer);
    })
  }, []);

  console.log(members);


  const annuler = () => {
    setModalVisibility(!modalVisibility);
    setServiceCreated({title:"",performer:"",recipient:"",cost:0});
  };

  const valider = () => {
    setModalVisibility(!modalVisibility);
    setServiceCreated({title:"",performer:"",recipient:"",cost:0});
    useFetch(URLS.createService,"POST",{})
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
      {user.colocation !== null ? (
        <ButtonComponent
          primary
          onPress={() => setModalVisibility(!modalVisibility)}
        >
          <Text>Créer un service</Text>
        </ButtonComponent>
      ) : null}
      <ServiceBeneficiaire navigation={navigation} services={recipientServices} />
      <ServiceActionnaire navigation={navigation} services={performerServices} />
      <ServiceFinis navigation={navigation} services={[...recipientServices,...performerServices].filter(s => s.validatedAt!==null)} />
      <ModalGeneral visible={modalVisibility}>
        <Text style={styles.titreModal}>Créez un service</Text>
        <TextInput
          style={styles.input}
          value={serviceCreated.title}
          placeholder="Nom du service"
          onChangeText={e => setServiceCreated({...serviceCreated,title:e})}
        />
        <TextInput
          style={styles.input}
          value={serviceCreated.performer}
          placeholder="Actionnaire"
          onChangeText={e => setServiceCreated({...serviceCreated,performer:e})}
        />
        <TextInput
          style={styles.input}
          value={serviceCreated.recipient}
          placeholder="Bénéficiaire"
          onChangeText={e => setServiceCreated({...serviceCreated,recipient:e})}
        />
        <TextInput
          style={styles.input}
          value={serviceCreated.cost}
          placeholder="Nombre de points"
          onChangeText={e => setServiceCreated({...serviceCreated,cost:parseInt(e)})}
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

const ServiceActionnaire = ({ navigation, services }) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.blanc, margin: 10 }}>
      <Text style={styles.titrePartie}>
        Mes services en tant que actionnaire :
      </Text>
      { services.length ? services.map(s => (
        <ServiceComponent
        navigation={navigation}
        date={moment(s.createdAt).format("LL")}
        by={s.performer.firstname}
        pour={s.recipient.firstname}
        label={s.title}
        score={s.cost}
      />
        )) : <Text>Vous n'avez aucun services en tant que actionnaire</Text> }
    </View>
  );
};

const ServiceBeneficiaire = ({ navigation,services }) => {

  return (
    <View style={{ flex: 1, backgroundColor: COLOR.blanc, margin: 10 }}>
      <Text style={styles.titrePartie}>Mes services en cours :</Text>
      { services.length ? services.map(s => (
        <ServiceComponent
        navigation={navigation}
        date={moment(s.createdAt).format("LL")}
        by={s.performer.firstname}
        pour={s.recipient.firstname}
        label={s.title}
        score={s.cost}
      />
        )) : <Text>Vous n'avez aucun services en tant que bénéficiaire</Text> }
    </View>
  );
};

const ServiceFinis = ({ navigation, services }) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.blanc, margin: 10 }}>
      <Text style={styles.titrePartie}>Mes services terminés :</Text>
      { services.length ? services.map(s => (
        <ServiceComponent
        navigation={navigation}
        date={moment(s.createdAt).format("LL")}
        by={s.performer.firstname}
        pour={s.recipient.firstname}
        label={s.title}
        score={s.cost}
      />
        )) : <Text>Vous n'avez aucun services terminés</Text> }

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
