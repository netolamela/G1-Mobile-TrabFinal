import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import axios from "axios";

const ModalAddProduto = ({
  isVisible,
  onAdicionarProduto,
  onClose,
  setProdutos,
  produtos,
}) => {
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    descricao: "",
    categoria: "",
    valor: null,
    imagem: "",
  });

  const handleAdicionarProduto = async () => {
    const trimmedNome = novoProduto.nome.trim();
    const trimmedDescricao = novoProduto.descricao.trim();
    const trimmedCategoria = novoProduto.categoria.trim();
    const trimmedValor =
      novoProduto.valor !== undefined && novoProduto.valor !== null
        ? String(novoProduto.valor).trim()
        : "";
    const trimmedImagem = novoProduto.imagem.trim();

    if (
      trimmedNome === "" ||
      trimmedDescricao === "" ||
      trimmedCategoria === "" ||
      trimmedValor === "" ||
      trimmedImagem === ""
    ) {
      Alert.alert("Todos os campos obrigatórios devem ser preenchidos");
      return;
    }

    let produto = {
      nome: trimmedNome,
      descricao: trimmedDescricao,
      categoria: trimmedCategoria,
      valor: parseFloat(trimmedValor.replace(",", ".")),
      imagem: trimmedImagem,
    };

    try {
      const response = await axios.post(
        "https://65496be2dd8ebcd4ab2491f6.mockapi.io/produtos",
        produto
      );

      setProdutos([...produtos, response.data]);

      console.log("Produto cadastrado: ", response.data);

      onAdicionarProduto({
        nome: "",
        descricao: "",
        categoria: "",
        valor: null,
        imagem: "",
      });

      onClose();
    } catch (error) {
      console.error("Erro ao cadastrar produto: ", error);
      Alert.alert("Erro ao cadastrar produto. Tente novamente.");
    }
  };

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nome do produto"
          placeholderTextColor="black"
          value={novoProduto.nome}
          onChangeText={(text) =>
            setNovoProduto({ ...novoProduto, nome: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição do produto"
          placeholderTextColor="black"
          value={novoProduto.descricao}
          onChangeText={(text) =>
            setNovoProduto({ ...novoProduto, descricao: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Categoria do produto"
          placeholderTextColor="black"
          value={novoProduto.categoria}
          onChangeText={(text) =>
            setNovoProduto({ ...novoProduto, categoria: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Valor"
          placeholderTextColor="black"
          value={novoProduto.valor ? novoProduto.valor.toString() : ""}
          onChangeText={(text) => {
            setNovoProduto({ ...novoProduto, valor: text });
          }}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="URL da imagem"
          placeholderTextColor="black"
          value={novoProduto.imagem}
          onChangeText={(text) =>
            setNovoProduto({ ...novoProduto, imagem: text })
          }
        />
        <TouchableOpacity style={styles.botao} onPress={handleAdicionarProduto}>
          <Text style={styles.textoBotao}>Adicionar Produto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={onClose}>
          <Text style={styles.textoBotao}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E2E2AC",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "white",
  },
  input: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  botao: {
    backgroundColor: "#0C432E",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    marginBottom: 10,
    borderRadius: 20,
  },
  textoBotao: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    padding: 10,
  },
});

export default ModalAddProduto;
