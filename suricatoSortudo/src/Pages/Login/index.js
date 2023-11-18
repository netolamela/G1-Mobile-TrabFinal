import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Login() {
  return (
    <View>
      <Text style={styles.text}> Login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: { marginTop: 57, fontSize: 40 },
});
