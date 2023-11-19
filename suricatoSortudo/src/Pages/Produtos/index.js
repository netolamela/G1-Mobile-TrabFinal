import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ModalDetalhes from "../../Components/modalDetalhes";

export default function Produtos() {
  const [pesquisa, setPesquisa] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  useEffect(() => {
    const buscarProduto = async () => {
      try {
        const response = await fetch(
          "https://65496be2dd8ebcd4ab2491f6.mockapi.io/produtos"
        );
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    buscarProduto();
  }, []);

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const handleProdutoDetalhe = (produto) => {
    setProdutoSelecionado(produto);
    setModalVisivel(true);
  };

  const fecharModalDetalhes = () => {
    setModalVisivel(false);
    setProdutoSelecionado(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        value={pesquisa}
        onChangeText={(texto) => setPesquisa(texto)}
        placeholder="Buscar um produto"
      />
      <TouchableOpacity style={styles.botao}>
        <Text style={styles.textoBotao}>
          {" "}
          Adicionar Produtos {"   "}
          <FontAwesome name="plus-circle" size={24} color="white" />
        </Text>
      </TouchableOpacity>

      {produtosFiltrados.map((produto) => (
        <TouchableOpacity
          key={produto.id}
          style={styles.container2}
          onPress={() => handleProdutoDetalhe(produto)}
        >
          <Image
            style={styles.imagemProduto}
            source={{ uri: produto.imagem }}
            onPress={() => handleProdutoDetalhe(produto)}
          />
          <View style={styles.textoContainer}>
            <Text style={styles.texto}>{produto.nome}</Text>
            <Text style={styles.texto}>R$ {produto.valor}</Text>
            <View style={styles.iconesContainer}>
              <FontAwesome name="trash" size={35} color="#0C432E" />
              <FontAwesome name="edit" size={35} color="#0C432E" />
            </View>
          </View>
          <ModalDetalhes
            isVisible={modalVisivel}
            produto={produtoSelecionado}
            onClose={fecharModalDetalhes}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#BD7834",
    justifyContent: "center",
  },
  container2: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    backgroundColor: "#D4BF6A",
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  imagemProduto: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 10,
  },
  textoContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  iconesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    padding: 15,
  },
  texto: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    margin: 10,
    textAlign: "center",
  },
  textoBotao: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginHorizontal: 20,
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
});
