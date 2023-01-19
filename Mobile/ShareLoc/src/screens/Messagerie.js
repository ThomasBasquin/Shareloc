import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../components/Title";
import { COLOR } from "../constantes/Color";
import { FontAwesome } from "@expo/vector-icons";
import Box from "../components/Box";
import { UserContext } from "../Context/UserContext";
import useFetch from "../constantes/UseFetch";
import URLS from "../constantes/Routes";
import { format, isToday, isYesterday } from "date-fns";
import moment from "moment";

const Messagerie = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    useFetch(
      URLS.getMessageFromColocation.replace("{idColoc}", user.colocation)
    ).then(setMessages);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.blanc }}>
      <Title title="Messagerie" />
      <Discussion messages={messages} setMessages={setMessages} user={user} />
    </View>
  );
};

const Discussion = ({ messages, setMessages, user }) => {
  return (
    <View style={{ backgroundColor: COLOR.blanc, height: "100%" }}>
      <Box>
        <ScrollView style={{ height: "70%", margin: 5 }}>
          {messages.length ? (
            messages.map((m) => {
              const messageDate = moment(m.sendAt);
              const today = moment();
              const yesterday = moment().subtract(1, "days");

              let messageDateFormatted;
              if (messageDate.isSame(today, "day")) {
                messageDateFormatted = messageDate.format("HH:mm");
              } else if (messageDate.isSame(yesterday, "day")) {
                messageDateFormatted = "Hier " + messageDate.format("HH:mm");
              } else {
                messageDateFormatted = messageDate.format("DD/MM/YYYY");
              }

              if (m.sender.firstname == user.firstname) {
                return (
                  <MessagePerso
                    name={
                      <Text style={{ fontWeight: "bold" }}>
                        {m.sender.firstname}
                      </Text>
                    }
                    hour={messageDateFormatted}
                    message={m.message}
                  />
                );
              } else {
                return (
                  <MessageAutre
                    name={
                      <Text style={{ fontWeight: "bold" }}>
                        {m.sender.firstname}
                      </Text>
                    }
                    hour={messageDateFormatted}
                    message={m.message}
                  />
                );
              }
            })
          ) : (
            <Text style={{ marginLeft: 20, color: "white", fontSize: 20 }}>
              Aucun message pour la colocation.
            </Text>
          )}
        </ScrollView>
      </Box>

      <AddMessage user={user} setMessages={setMessages} />
    </View>
  );
};

const MessageAutre = ({ name, hour, message }) => {
  return (
    <View style={{ marginTop: 7 }}>
      <NomHeure name={name} hour={hour} />
      <View style={styles.messageAutre}>
        <Text>{message}</Text>
      </View>
    </View>
  );
};

const AddMessage = ({ user, setMessages }) => {
  const [message, setMessage] = useState("");

  async function addMessage(collocation, sender, message) {
    return useFetch(URLS.addMessage, "POST", {
      collocation,
      sender,
      message,
    }).then(() => {
      useFetch(
        URLS.getMessageFromColocation.replace("{idColoc}", user.colocation)
      ).then((messages) => {
        setMessages(messages);
        setMessage("");
      });
    });
  }

  return (
    <View style={{ flexDirection: "row", padding: 20 }}>
      <TextInput
        style={styles.input}
        value={message}
        placeholder="Nouveau message"
        onChangeText={setMessage}
      />
      <TouchableOpacity
        onPressIn={() => {
          addMessage(user.colocation, user.id, message);
        }}
      >
        <View
          style={{
            backgroundColor: COLOR.jaune,
            padding: 10,
            borderRadius: 20,
            height: 48,
            marginLeft: 10,
          }}
        >
          <FontAwesome name="send" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const MessagePerso = ({ name, hour, message }) => {
  return (
    <View style={{ marginTop: 7, right: 0, left: 60 }}>
      <View style={{ left: 160 }}>
        <NomHeure name={name} hour={hour} />
      </View>
      <View style={styles.messagePerso}>
        <Text style={{ color: COLOR.blanc }}>{message}</Text>
      </View>
    </View>
  );
};

const NomHeure = ({ name, hour }) => {
  return (
    <View style={{ flexDirection: "row", marginLeft: 5, marginBottom: 5 }}>
      <Text style={{ marginRight: 5 }}>{name}</Text>
      <Text>{hour}</Text>
    </View>
  );
};

const styles = new StyleSheet.create({
  messageAutre: {
    maxWidth: 250,
    backgroundColor: COLOR.gris,
    padding: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  messagePerso: {
    maxWidth: 250,
    backgroundColor: COLOR.bleuFonce,
    padding: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  input: {
    height: 40,
    width: 250,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
});
export default Messagerie;
