import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ModalDetalhes from "../../Components/modalDetalhes";
import ModalAddProduto from "../../Components/modalAddProduto";
import ModalEditProduto from "../../Components/modalEditProduto";

export default function Produtos() {
  const [pesquisa, setPesquisa] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [modalDetalheVisivel, setModalDetalheVisivel] = useState(false);
  const [modalAddVisivel, setModalAddVisivel] = useState(false);
  const [modalEditVisivel, setModalEditVisivel] = useState(false);
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

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.nome &&
      produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const handleProdutoDetalhe = (produto) => {
    setProdutoSelecionado(produto);
    setModalDetalheVisivel(true);
  };

  const fecharModalDetalhes = () => {
    setModalDetalheVisivel(false);
    setProdutoSelecionado(null);
  };

  const handleAdicionarProduto = (novoProduto) => {
    try {
      setProdutos((prevProdutos) => [...prevProdutos, novoProduto]);
      setModalAddVisivel(false);
      setProdutoSelecionado(null);
    } catch (error) {
      alert("Erro ao cadastrar o produto: ", error);
    }
  };

  const handleEditarProduto = async (produtoEditado) => {
    try {
      const response = await fetch(
        `https://65496be2dd8ebcd4ab2491f6.mockapi.io/produtos/${produtoEditado.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(produtoEditado),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar o produto");
      }

      setProdutos((prevProdutos) => {
        return prevProdutos.map((produto) =>
          produto.id === produtoEditado.id ? produtoEditado : produto
        );
      });

      setModalEditVisivel(false);
      setProdutoSelecionado(null);

      alert("Produto atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
      alert("Erro ao atualizar o produto. Tente novamente.");
    }
  };

  const handleDeleteProduto = async (id) => {
    try {
      const response = await fetch(
        `https://65496be2dd8ebcd4ab2491f6.mockapi.io/produtos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao deletar o produto");
      }

      setProdutos(produtos.filter((produto) => produto.id !== id));
      alert("Produto deletado com sucesso!");
    } catch (error) {
      alert("Erro ao deletar o produto:", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.container2}
      onPress={() => handleProdutoDetalhe(item)}
    >
      <Image style={styles.imagemProduto} source={{ uri: item.imagem }} />
      <View style={styles.textoContainer}>
        <Text style={styles.texto}>{item.nome}</Text>
        <Text style={styles.texto}>R$ {item.valor}</Text>
        <View style={styles.iconesContainer}>
          <TouchableOpacity
            style={styles.botao2}
            onPress={() => handleDeleteProduto(item.id)}
          >
            <FontAwesome name="trash" size={30} color="#0C432E" padding={8} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botao2}
            onPress={() => setModalEditVisivel(true)}
          >
            <FontAwesome
              name="edit"
              size={30}
              color="#0C432E"
              padding={8}
              textAlign="center"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ModalDetalhes
        isVisible={modalDetalheVisivel}
        produto={produtoSelecionado}
        onClose={fecharModalDetalhes}
      />
      <ModalAddProduto
        isVisible={modalAddVisivel}
        onClose={() => setModalAddVisivel(false)}
        onAdicionarProduto={handleAdicionarProduto}
        setProdutos={setProdutos}
        produtos={produtos}
      />
      <ModalEditProduto
        isVisible={modalEditVisivel}
        onClose={() => setModalEditVisivel(false)}
        onEditarProduto={handleEditarProduto}
        produto={produtoSelecionado}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={pesquisa}
        onChangeText={(texto) => setPesquisa(texto)}
        placeholder="Buscar um produto"
      />
      <TouchableOpacity style={styles.botao}>
        <Text
          style={styles.textoBotao}
          onPress={() => setModalAddVisivel(true)}
        >
          {" "}
          Adicionar Produtos {"   "}
          <FontAwesome name="plus-circle" size={24} color="white" />
        </Text>
      </TouchableOpacity>

      <FlatList
        data={produtosFiltrados}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id?.toString()}
        style={styles.flatlist}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#BD7834",
    justifyContent: "center",
  },
  container2: {
    flexDirection: "row",
    width: "100%",
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
    justifyContent: "center",
    alignItems: "center",
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
  botao2: {
    backgroundColor: "#E2E2AC",
    borderColor: "#0C432E",
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    borderRadius: 20,
    padding: 10,
    width: 55,
  },
  flatlist: {
    width: "90%",
  },
});
