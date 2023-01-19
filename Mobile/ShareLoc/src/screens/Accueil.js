import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Title from "../components/Title";
import BoxGrise from "../components/BoxGrise";
import { FontAwesome } from "@expo/vector-icons";
import { COLOR } from "../constantes/Color";
import { Octicons } from "@expo/vector-icons";
import ServiceComponent from "../components/ServiceComponent";
import { UserContext } from "../Context/UserContext";
import useFetch from "../constantes/UseFetch";
import URLS from "../constantes/Routes";
import moment from "moment";

const Accueil = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [services, setServices] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    let promiseAll = [];
    promiseAll.push(useFetch(URLS.getPoints.replace("{user}", user.id)));
    promiseAll.push(
      useFetch(URLS.getServicesRecipient.replace("{user}", user.id))
    );

    Promise.all(promiseAll).then(([points, services]) => {
      setPoints(points.points);
      setServices(services);
    });
  }, []);

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
      <View style={{ flex: 1, backgroundColor: COLOR.blanc, margin: 10 }}>
        <MesPoints points={points} />
        <Text style={styles.titreMesServices}>Mes services en cours :</Text>
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
          <Text>Vous n'avait pas de services en cours</Text>
        )}
      </View>
    </ScrollView>
  );
};

const MesPoints = ({ points }) => {
  return (
    <BoxGrise>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.points}>Mes points</Text>
        <Text style={styles.pointsScore}>
          {points} <FontAwesome name="star" size={24} color={COLOR.jaune} />
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
