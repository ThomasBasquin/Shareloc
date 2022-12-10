import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Accueil from "./src/screens/Accueil";
import Colocation from "./src/screens/Colocation";
import Profil from "./src/screens/Profil";
import Services from "./src/screens/Services";
import Authentification from "./src/screens/Authentification";
import Messagerie from "./src/screens/Messagerie";
import DetailsService from "./src/screens/DetailsService";
import Signup from "./src/screens/Signup";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLOR } from "./src/constantes/Color";
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.blanc }}>
      <NavigationContainer style={{ flex: 1, backgroundColor: "white" }}>
        <Stack.Navigator initialRouteName="Authentification">
          <Stack.Screen
            name="Authentification"
            component={Authentification}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Messagerie"
            component={Messagerie}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Détails"
            component={DetailsService}
            
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.bleuFonce }}>
      <Tab.Navigator
        style={{ flex: 1, backgroundColor: "black" }}
        screenOptions={{
          tabBarStyle: { position: "absolute" },
          tabBarHideOnKeyboard: true,
        }}
        tabBarOptions={{
          activeTintColor: COLOR.jaune,
          inactiveTintColor: COLOR.blanc,
          activeBackgroundColor: COLOR.bleuFonce,
          inactiveBackgroundColor: COLOR.bleuFonce,
        }}
      >
        <Tab.Screen
          name="Accueil"
          component={Accueil}
          options={{
            headerShown: false,
            tabBarLabel: "Accueil",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Colocation"
          component={Colocation}
          options={{
            headerShown: false,
            tabBarLabel: "Colocation",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-people" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Services"
          component={Services}
          options={{
            headerShown: false,
            tabBarLabel: "Services",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="cleaning-services"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profil"
          component={Profil}
          options={{
            headerShown: false,
            tabBarLabel: "Profil",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
