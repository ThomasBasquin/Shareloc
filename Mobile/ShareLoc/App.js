import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accueil from './src/screens/Accueil';
import Colocation from './src/screens/Colocation';
import Profil from './src/screens/Profil';
import Services from './src/screens/Services';
import Authentification from './src/screens/Authentification';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <NavigationContainer style={{ flex: 1, backgroundColor: 'white'}}>
      <Stack.Navigator initialRouteName="Authentification">
        <Stack.Screen name="Authentification" component={Authentification} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <Tab.Navigator style={{ flex: 1, backgroundColor: 'white'}}
    screenOptions={{
      tabBarStyle: { position: 'absolute' },
    }}
    tabBarOptions={
      {
          activeTintColor: 'black',
          inactiveTintColor: 'blue',
          labelPosition: 'below-icon'
      }
  }>
      <Tab.Screen name="Accueil" 
      component={Accueil} 
      options={{headerShown: false, 
      tabBarLabel: 'Accueil',
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" color={color} size={size} />
      ),}} />

      <Tab.Screen name="Colocation" component={Colocation} options={{headerShown: false}}/>
      <Tab.Screen name="Services" component={Services} options={{headerShown: false}}/>
      <Tab.Screen name="Profil" component={Profil} options={{headerShown: false}}/>
    </Tab.Navigator>
    </SafeAreaView>
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
