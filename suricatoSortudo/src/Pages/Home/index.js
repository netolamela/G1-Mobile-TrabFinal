import { StyleSheet, Text, View } from "react-native";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import React from "react";
import { TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carrossel from "./carrossel";
import { ScrollView } from "react-native-gesture-handler";

export default function Home() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topoContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <ImageBackground
            source={require("../../assets/logo.png")}
            style={{ height: 80, width: 80 }}
          ></ImageBackground>
        </TouchableOpacity>
        <Text style={styles.nomePagina}>Suricato Sortudo</Text>
      </View>
      <Text style={styles.titulo}>Novidades</Text>
      <Carrossel />
      <Text style={styles.titulo}>Clássicos x Modernos</Text>
      <View style={styles.caixa}>
        <Text style={styles.texto}>
          Os jogos de tabuleiro modernos se destacam das versões clássicas em
          diversos aspectos, refletindo a evolução do gênero ao longo do tempo.
          Enquanto os jogos de tabuleiro clássicos costumam ter regras simples e
          mecânicas diretas, os modernos frequentemente introduzem complexidade
          estratégica mais profunda, oferecendo uma gama mais variada de
          escolhas aos jogadores. Além disso, os jogos modernos muitas vezes
          valorizam a imersão e a narrativa, com temas ricos e componentes de
          alta qualidade, tornando a experiência mais envolvente. A colaboração
          entre jogadores também é uma característica notável em muitos jogos
          modernos, ao contrário dos clássicos, que muitas vezes enfatizam a
          competição direta. Em resumo, os jogos de tabuleiro modernos oferecem
          uma gama mais ampla de experiências, apelando para um público
          diversificado e elevando o hobby a novos patamares de criatividade e
          inovação.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bd7834",
  },
  caixa: {
    margin: 25,
    padding: 25,
    borderRadius: 10,
    backgroundColor: "#d4bf6a",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    margin: 30,
    fontSize: 30,
    color: "#0c432e",
    textAlign: "center",
  },
  texto: {
    fontSize: 15,
    textAlign: "center",
  },
  topoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0C432E",
    justifyContent: "space-around",
    marginTop: 30,
    flex: 1,
  },
  nomePagina: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
});
