import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./src/Context/AuthContext";
import AppProvider from "./src/Navigation/AppProvider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <AppProvider />
    </AuthProvider>
  );
}
