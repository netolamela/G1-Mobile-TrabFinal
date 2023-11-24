import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const InputComIcone = ({ icone, ...props }) => {
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
      <Icon name={icone} size={20} color="#808080" style={styles.icone} />
      <TextInput {...props} style={styles.input} />
    </View>
  );
};

export default function Cadastro() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const lidarComPressionarCadastro = async () => {
    if (!usuario || !senha || !confirmaSenha) {
      setMensagemErro("Preencha todos os campos para cadastrar.");
    } else if (senha !== confirmaSenha) {
      setMensagemErro("As senhas não coincidem. Tente novamente.");
    } else {
      const usuarioExiste = await verificarUsuarioExiste(usuario);

      if (usuarioExiste) {
        setMensagemErro("Este usuário já existe. Tente outro.");
      } else {
        try {
          const resposta = await axios.post(
            "https://655ac5066981238d054db51e.mockapi.io/login/usuarios",
            {
              user: usuario,
              senha: senha,
              grupo: "funcionario",
            }
          );
          setIsModalVisible(true);
        } catch (erro) {
          setMensagemErro("Falha ao cadastrar. Por favor, tente novamente.");
        }
      }
    }
  };

  const fecharModal = () => {
    setIsModalVisible(false);
    setMensagemErro("");
    navigation.navigate("Home");
  };

  const verificarUsuarioExiste = async (nomeUsuario) => {
    try {
      const resposta = await axios.get(
        `https://655ac5066981238d054db51e.mockapi.io/login/usuarios?user=${nomeUsuario}`
      );
      return resposta.data.length > 0;
    } catch (erro) {
      console.log("Erro ao verificar usuário:", erro);
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/fundo.png")}
        style={styles.imagemFundo}
      />
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.botaoVoltar}
      >
        <Icon name="arrow-left" size={25} color="white" />
      </TouchableOpacity>
      <View style={styles.cadastro}>
        <View style={[styles.campos, { marginTop: 10 }]}>
          <InputComIcone
            icone="user"
            placeholder="Digite seu usuário"
            placeholderTextColor="#808080"
            onChangeText={setUsuario}
          />
          <InputComIcone
            icone="lock"
            placeholder="Digite sua senha"
            secureTextEntry
            placeholderTextColor="#808080"
            onChangeText={setSenha}
          />
          <InputComIcone
            icone="lock"
            placeholder="Confirme sua senha"
            secureTextEntry
            placeholderTextColor="#808080"
            onChangeText={setConfirmaSenha}
          />
          <TouchableOpacity
            style={styles.botaoCadastro}
            onPress={lidarComPressionarCadastro}
          >
            <Text style={styles.textoBotao}>Cadastrar</Text>
          </TouchableOpacity>
          {mensagemErro ? (
            <Text style={styles.mensagemErro}>{mensagemErro}</Text>
          ) : null}
        </View>
      </View>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.containerModal}>
          <View style={styles.conteudoModal}>
            <Text style={styles.textoModal}>
              Você cadastrou uma nova conta!
            </Text>
            <TouchableOpacity onPress={fecharModal} style={styles.botaoFechar}>
              <Text style={styles.textoBotaoFechar}>Retorne para Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    width: 150,
    height: 150,
    resizeMode: "contain",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
  },
  botaoVoltar: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 10,
  },
  campos: {
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
  },
  cadastro: {
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
  botaoCadastro: {
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
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  containerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  conteudoModal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  textoModal: {
    fontSize: 18,
    marginBottom: 20,
  },
  botaoFechar: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  textoBotaoFechar: {
    color: "white",
    fontSize: 16,
  },
});
