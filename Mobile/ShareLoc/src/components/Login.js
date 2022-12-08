import { View, Text, StyleSheet, Button, Image } from "react-native";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setIsLoading(true);
    setError("");
  };

  return (
    <View styles={styles.loginContainer}>
      <TextInput
        styles={[styles.textInput, styles.textInputUsername]}
        placeholder="Nom d'utilisateur ou email"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        styles={[styles.textInput, styles.textInputPassword]}
        placeholder="Mot de passe"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Connexion" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },

  textInputUsername: {
    backgroundColor: "white",
  },

  textInputPassword: {
    backgroundColor: "white",
  },
});

export default Login;
