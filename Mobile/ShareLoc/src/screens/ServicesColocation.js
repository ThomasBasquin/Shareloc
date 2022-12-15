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
import BoxResume from "../components/BoxResume";

const ServicesColocation = ({ navigation }) => {
    const [enCours, setEnCours] = useState(false);
    const [termines, setTermines] = useState(false);

    const enCoursFonction = () => {
        if(termines)
        {
            setTermines(!termines);
        }
        setEnCours(!enCours);
    }
    const estTermines = () => {
        if(enCours)
        {
            setEnCours(!enCours);
        }
        setTermines(!termines);
    }
    return (
        <View>
            <Title title="Services de ma colocation" />
            <View style={{flexDirection : 'row', justifyContent : 'center'}}>
            <TouchableOpacity onPress={()=> {enCoursFonction()}} style={{justifyContent : 'center', alignItems : "center"}}><BoxResume><Text style={{color: enCours ? COLOR.jaune : COLOR.blanc, textAlign: "center",}}>Services en cours</Text></BoxResume></TouchableOpacity>
            <TouchableOpacity onPress={()=> {estTermines()}} style={{justifyContent : 'center', alignItems : "center"}}><BoxResume><Text style={{color: termines ? COLOR.jaune : COLOR.blanc, textAlign: "center",}}>Services terminés</Text></BoxResume></TouchableOpacity>
            </View>
        </View>
    )
};

export default ServicesColocation;