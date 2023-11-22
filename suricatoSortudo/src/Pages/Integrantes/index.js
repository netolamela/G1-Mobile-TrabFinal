import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Linking } from "react-native";

const Integrantes = () => {
  const navigation = useNavigation();

  const integrantes = [
    {
      nome: "Aurélio Lamela",
      linkedin: "https://www.linkedin.com/in/aurélio-lamela/",
      github: "https://github.com/netolamela",
      imagem: require("../../../assets/aurelio.jpg"),
    },
    {
      nome: "Emanuel Cardoso",
      linkedin: "https://www.linkedin.com/in/emanuel-cardoso-55621a135/",
      github: "https://github.com/ecard58",
      imagem: require("../../../assets/emanuel.jpg"),
    },
    {
      nome: "Lucas Gonzaga",
      linkedin: "https://www.linkedin.com/in/olucasgon/",
      github: "https://github.com/olucasgon",
      imagem: require("../../../assets/lucas.jpg"),
    },
    {
      nome: "Luciana Brand",
      linkedin: "https://www.linkedin.com/in/lucianabrand/",
      github: "https://github.com/lucianabrand",
      imagem: require("../../../assets/luciana.jpg"),
    },
    {
      nome: "Mahyara Paraquett",
      linkedin: "https://www.linkedin.com/in/mahyara-paraquett/",
      github: "https://github.com/MahyParaquett",
      imagem: require("../../../assets/mahyara.jpg"),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topoContainer}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.nomePagina}>Integrantes</Text>
      </View>

      {integrantes.map((integrante, index) => (
        <View key={index} style={styles.integranteContainer}>
          <Image source={integrante.imagem} style={styles.imagem} />
          <View style={styles.infoContainer}>
            <Text style={styles.nome}>{integrante.nome}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => Linking.openURL(integrante.github)}
                style={{ marginRight: 10 }}
              >
                <AntDesign name="github" size={30} color="#061a06" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL(integrante.linkedin)}
              >
                <AntDesign name="linkedin-square" size={30} color="#061a06" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
      <Text style={{ textAlign: "center" }}>
        Todos os direitos de imagem reservados.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bd7834",
  },
  topoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0C432E",
    justifyContent: "space-around",
    marginTop: 30,
  },
  logo: {
    width: 80,
    height: 80,
  },
  nomePagina: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  integranteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#d4bf6a",
  },
  imagem: {
    width: 80,
    height: 80,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flexDirection: "column",
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0c432e",
    margin: 10,
  },
});

export default Integrantes;
