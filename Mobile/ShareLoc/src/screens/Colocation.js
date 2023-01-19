import React, { useContext, useEffect, useState } from "react";
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
import ButtonComponent from "../components/ButtonComponent";
import useFetch from "../constantes/UseFetch";
import URLS from "../constantes/Routes";
import { UserContext } from "../Context/UserContext";
import moment from "moment";

const Colocation = ({ navigation }) => {
  const { user, setUserInfo } = useContext(UserContext);

  const [colocation, setColocation] = useState(null);
  const [invitations, setInvitations] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (!user.colocation) {
      useFetch(URLS.getInvitations).then(setInvitations);
    } else {
      let promiseAll = [];
      promiseAll.push(
        useFetch(
          URLS.getServicesFromColocation.replace(
            "{collocation}",
            user.colocation
          )
        )
      );
      promiseAll.push(
        useFetch(URLS.getCollocation.replace("{collocation}", user.colocation))
      );

      Promise.all(promiseAll).then(([services, colocation]) => {
        setServices(services);
        setColocation(colocation);
      });
    }
  }, [user]);

  function answerInvitation(invitation, accepted) {
    useFetch(
      URLS.answerInvitation.replace("{invitation}", invitation.id),
      "PUT",
      {
        accepted,
      }
    ).then(() => {
      setInvitations(invitations.filter((i) => i.id !== invitation.id));
      if (accepted) {
        setUserInfo({ ...user, colocation: invitation.collocation.id });
      }
    });
  }

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

        {user.colocation && colocation && services.length ? (
          <>
            <Resume colocation={colocation} services={services} />
            <Participants
              members={colocation.members}
              manager={colocation.manager}
            />
            <ServicesEnCours navigation={navigation} services={services} />
          </>
        ) : (
          <View>
            <Text>Vous n'avez pas de colocation en cours</Text>
            <Text>Mes invitations :</Text>
            <View>
              {invitations.length ? (
                invitations.map((i) => (
                  <View
                    style={{
                      margin: "2.5%",
                      borderRadius: 15,
                      padding: 20,
                      backgroundColor: COLOR.gris,
                    }}
                  >
                    <Text
                      style={{ fontSize: 20, color: COLOR.bleuFonce }}
                    >{`Invitation de ${i.sender.firstname} ${i.sender.lastname} pour rejoindre la colocation ${i.collocation.name}`}</Text>
                    <View
                      style={{ flexDirection: "row", justifyContent: "center" }}
                    >
                      <ButtonComponent
                        onPress={() => answerInvitation(i, false)}
                      >
                        <Text>Rejeter</Text>
                      </ButtonComponent>
                      <ButtonComponent
                        primary
                        onPress={() => answerInvitation(i, true)}
                      >
                        <Text>Rejoindre</Text>
                      </ButtonComponent>
                    </View>
                  </View>
                ))
              ) : (
                <Text>Vous n'avez pas d'invitations</Text>
              )}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const Resume = ({colocation,services}) => {
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
                {colocation.members.length}
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
                {services.length}
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
                {colocation.members.reduce((accumulator,m)=>accumulator+m.points,0)}
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
                {colocation.members.reduce((accumulator,m)=>{
                  if(accumulator){
                    return (accumulator.points > m.points ? accumulator : m )
                  }else{
                    return m;
                  }
                },null).firstname}
              </Text>
            </View>
          </BoxResume>
        </View>
      </View>
    </Box>
  );
};

const Participants = ({members,manager}) => {
  return (
    <View style={styles.participants}>
      <Text style={styles.titreParticipants}>Participants :</Text>
      <Box>
        <ItemParticipants prenom={manager.firstname} role={"Créateur"} points={manager.points} />
        {members.filter(m => m.id!==manager.id).map(m => (
          <ItemParticipants prenom={m.firstname} role={"Membre"} points={m.points} />
        )) }
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

const ServicesEnCours = ({ navigation,services }) => {
  return (
    <View style={styles.participants}>
      <Text style={styles.titreParticipants}>Services en cours :</Text>
      {services.map(s => (
        <ServiceComponent
          navigation={navigation}
          date={moment(s.createdAt).format("LL")}
          by={s.performer.firstname}
          pour={s.recipient.firstname}
          label={s.title}
          score={s.cost}
        />
      ))}

      {/* <ButtonComponent
        primary
        onPress={() => {
          navigation.navigate("ServicesColocation");
        }}
      >
        Voir tout
      </ButtonComponent> */}
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
  voirTout: {
    fontSize: 18,
    fontWeight: "600",
    margin: 10,
  },
});

export default Colocation;
