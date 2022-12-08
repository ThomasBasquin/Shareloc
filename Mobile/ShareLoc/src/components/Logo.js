import { View, Text, StyleSheet } from "react-native";

const Logo = () => {
  return;
  <View>
    <Image source={require("../../assets/logo.png")} />
  </View>;
};

const styles = StyleSheet.create({
  logo: {
    width: 66,
    height: 58,
  },
});

export default Logo;
