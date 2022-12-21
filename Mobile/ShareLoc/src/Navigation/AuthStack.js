import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Authentification from "../screens/Authentification";
import Signup from "../screens/Signup";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Navigator initialRouteName="Authentification">
          <Stack.Screen
            name="Authentification"
            component={Authentification}
            options={{ headerShown: false }}
          />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
