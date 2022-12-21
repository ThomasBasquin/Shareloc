import { NavigationContainer } from "@react-navigation/native";
import { COLOR } from "./../constantes/Color";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Messagerie from "../screens/Messagerie";
import DetailsService from "../screens/DetailsService";
import ServicesColocation from "../screens/ServicesColocation";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Accueil from "../screens/Accueil";
import Colocation from "../screens/Colocation";
import Services from "../screens/Services";
import Profil from "../screens/Profil";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppStack() {
  return (
    <NavigationContainer style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Messagerie"
          component={Messagerie}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: COLOR.bleuFonce,
            },
            headerTintColor: COLOR.blanc,
          }}
        />
        <Stack.Screen
          name="Détails"
          component={DetailsService}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: COLOR.bleuFonce,
            },

            headerTintColor: COLOR.blanc,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ServicesColocation"
          component={ServicesColocation}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: COLOR.bleuFonce,
            },

            headerTintColor: COLOR.blanc,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
