import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
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
import DropDownPicker from "react-native-dropdown-picker";

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
        { user.colocation ?
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
          </TouchableOpacity> : null}
        </View>

        {user.colocation && colocation && services.length ? (
          <>
            {colocation.manager.id === user.id && (
              <>
                <InviteMembers user={user} />
              </>
            )}
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

const InviteMembers = ({ user }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userWithoutColocation, setUserWithoutColocation] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openPicker, setOpenPicker] = useState(false);

  function openModal(){
    setModalVisible(true);
    useFetch(URLS.getUsersWithoutColocation)
    .then(users => setUserWithoutColocation(users.map(u => ({label : u.firstname + " " + u.lastname, value: u.id}))));
  }


  function sendInvitation(){
    useFetch(URLS.createInvitation,"POST",{collocation:user.colocation,sender:user.id,receipter:selectedUser})
    .then((e)=>{
      setModalVisible(false);
    })
  }

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Inviter un membre</Text>
            <DropDownPicker
              mode="SIMPLE"
              dropDownDirection="BOTTOM"
              open={openPicker}
              value={selectedUser}
              items={userWithoutColocation}
              setOpen={setOpenPicker}
              setValue={setSelectedUser}
              setItems={setUserWithoutColocation}
              theme="LIGHT"
              placeholder="Utilisateur"
              multiple={false}
            />
            <View style={styles.modalButtonsDiv}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: COLOR.rouge }]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.modalButtonText}>Retour</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={sendInvitation}
              >
                <Text style={[styles.modalButtonText, { color: COLOR.jaune }]}>
                  Envoyer
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <ButtonComponent
          onPress={openModal}
          style={{ width: "30%" }}
        >
          <Text>Inviter</Text>
        </ButtonComponent>
      </View>
    </View>
  );
};

const Resume = ({ colocation, services }) => {
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
                {colocation.members.reduce(
                  (accumulator, m) => accumulator + m.points,
                  0
                )}
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
                {
                  colocation.members.reduce((accumulator, m) => {
                    if (accumulator) {
                      return accumulator.points > m.points ? accumulator : m;
                    } else {
                      return m;
                    }
                  }, null).firstname
                }
              </Text>
            </View>
          </BoxResume>
        </View>
      </View>
    </Box>
  );
};

const Participants = ({ members, manager }) => {
  return (
    <View style={styles.participants}>
      <Text style={styles.titreParticipants}>Participants :</Text>
      <Box>
        <ItemParticipants
          prenom={manager.firstname}
          role={"Créateur"}
          points={manager.points}
        />
        {members
          .filter((m) => m.id !== manager.id)
          .map((m) => (
            <ItemParticipants
              prenom={m.firstname}
              role={"Membre"}
              points={m.points}
            />
          ))}
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

const ServicesEnCours = ({ navigation, services }) => {
  return (
    <View style={styles.participants}>
      <Text style={styles.titreParticipants}>Services en cours :</Text>
      {services.map((s) => (
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  modalLabel: {
    fontSize: 18,
    marginVertical: 6,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  modalButton: {
    marginTop: 25,
    backgroundColor: COLOR.bleuFonce,
    padding: 10,
    alignSelf: "center",
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalButtonsDiv: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default Colocation;
