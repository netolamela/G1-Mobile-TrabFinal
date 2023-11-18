import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
        backgroundColor: "#bd7834",
      }}
    >
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <ImageBackground
          source={require("../../assets/logo.png")}
          style={{ height: 80, width: 80, marginRight: 16 }}
        ></ImageBackground>
      </TouchableOpacity>
      <Text style={{ fontSize: 30 }}>Suricato Sortudo</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
