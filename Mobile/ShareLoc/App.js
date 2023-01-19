import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./src/Context/AuthContext";
import AppProvider from "./src/Navigation/AppProvider";
import { UserProvider } from "./src/Context/UserContext";

export default function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <AppProvider />
      </AuthProvider>
    </UserProvider>
  );
}
