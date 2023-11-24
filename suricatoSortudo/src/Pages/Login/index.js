import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const InputComIcone = ({ icon, ...props }) => {
  return (
    <View
      style={[
        styles.containerInput,
        {
          backgroundColor: "white",
          marginBottom: 16,
          width: 280,
          alignSelf: "center",
        },
      ]}
    >
      <Icon name={icon} size={20} color="#808080" style={styles.icone} />
      <GestureHandlerRootView style={styles.input}>
        <TextInput {...props} />
      </GestureHandlerRootView>
    </View>
  );
};

export default function Login() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  const lidarComPressionarLogin = async () => {
    if (!usuario || !senha) {
      setMensagemErro("Preencha todos os campos.");
      return;
    }
    try {
      const response = await axios.get(
        `https://655ac5066981238d054db51e.mockapi.io/login/usuarios?user=${usuario}&senha=${senha}`
      );

      if (response.data.length > 0) {
        //console.log("Usuário logado:", usuario);
        navigation.navigate("Drawer", {
          screen: "Home",
          params: { username: usuario },
        });
      } else {
        setMensagemErro(
          "Usuário não encontrado. Por favor, cadastre uma conta ou verifique suas credenciais."
        );
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      setMensagemErro("Falha ao realizar login. Por favor, tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/fundo.png")}
        style={styles.imagemFundo}
      />
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <View style={styles.login}>
        <View style={[styles.inputs, { marginTop: 10 }]}>
          <InputComIcone
            icon="user"
            placeholder="Digite seu usuário aqui"
            placeholderTextColor="#808080"
            onChangeText={setUsuario}
          />
          <InputComIcone
            icon="lock"
            placeholder="Digite sua senha aqui"
            secureTextEntry
            placeholderTextColor="#808080"
            onChangeText={setSenha}
          />
          <TouchableOpacity
            style={styles.botaoLogin}
            onPress={lidarComPressionarLogin}
          >
            <Text style={styles.textoBotao}>Login</Text>
          </TouchableOpacity>
          {mensagemErro ? (
            <Text
              style={[
                styles.mensagemErro,
                { color: "red", textAlign: "center" },
              ]}
            >
              {mensagemErro}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BD7834",
    justifyContent: "center",
    alignItems: "center",
  },
  imagemFundo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
  },
  login: {
    width: "80%",
    borderRadius: 25,
    backgroundColor: "#D4BF6A",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    padding: 20,
  },
  inputs: {
    marginTop: 50,
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#808080",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  icone: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    width: 200,
    justifyContent: "center",
  },
  botaoLogin: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 100,
    marginTop: 25,
    width: "100%",
    alignItems: "center",
  },
  textoBotao: {
    color: "white",
    fontSize: 18,
  },
  mensagemErro: {
    marginTop: 10,
  },
});
