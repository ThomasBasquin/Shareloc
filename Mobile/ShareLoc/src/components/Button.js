import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const ButtonCustom = ({ primary = null, btnText, ...other }) => {
  return (
    <View>
      <Pressable
        style={[
          { backgroundColor: primary ? "#191641" : "#F2C335" },
          styles.pressable,
        ]}
        {...other}
      >
        <Text style={{ color: primary ? "#FAFAFA" : "black" }}>{btnText}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    alignItems: "center",
    width: 150,
    borderRadius: 20,
    margin: 10,
    padding: 10,
  },
});

export default ButtonCustom;
