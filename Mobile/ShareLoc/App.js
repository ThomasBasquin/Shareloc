import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accueil from './src/screens/Accueil';
import Test from './src/screens/Test';
import Authentification from './src/screens/Authentification';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Authentification">
        <Stack.Screen name="Authentification" component={Authentification} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Accueil" component={Accueil} options={{headerShown: false}}/>
      <Tab.Screen name="Test" component={Test} options={{headerShown: false}}/>
    </Tab.Navigator>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
