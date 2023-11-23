import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";

export default function ModalEditProduto({
  isVisible,
  onEditarProduto,
  onClose,
  produto,
}) {
  const [produtoEditado, setProdutoEditado] = useState();

  useEffect(() => {
    setProdutoEditado(produto || {});
  }, [produto]);

  const handleEditarProduto = async () => {
    const trimmedNome = produtoEditado?.nome.trim();
    const trimmedDescricao = produtoEditado?.descricao.trim();
    const trimmedCategoria = produtoEditado?.categoria.trim();
    const trimmedValor =
      produtoEditado?.valor !== undefined && produtoEditado?.valor !== null
        ? String(produtoEditado?.valor).trim()
        : "";
    const trimmedImagem = produtoEditado?.imagem.trim();

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
      id: produtoEditado?.id,
      nome: trimmedNome,
      descricao: trimmedDescricao,
      categoria: trimmedCategoria,
      valor: parseFloat(trimmedValor.replace(",", ".")),
      imagem: trimmedImagem,
    };

    try {
      // await handleEditarProduto(produtoEditado);
      // console.log("Produto atualizado:", response.data);

      onEditarProduto(produto);
      alert("Produto atualizado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      Alert.alert("Erro ao atualizar o produto. Tente novamente.");
    }
  };

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nome do produto"
          placeholderTextColor="black"
          value={produtoEditado?.nome}
          onChangeText={(text) =>
            setProdutoEditado({ ...produtoEditado, nome: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição do produto"
          placeholderTextColor="black"
          value={produtoEditado?.descricao}
          onChangeText={(text) =>
            setProdutoEditado({ ...produtoEditado, descricao: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Categoria do produto"
          placeholderTextColor="black"
          value={produtoEditado?.categoria}
          onChangeText={(text) =>
            setProdutoEditado({ ...produtoEditado, categoria: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Valor"
          placeholderTextColor="black"
          value={produtoEditado?.valor ? produtoEditado?.valor.toString() : ""}
          onChangeText={(text) => {
            setProdutoEditado({ ...produtoEditado, valor: text });
          }}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="URL da imagem"
          placeholderTextColor="black"
          value={produtoEditado?.imagem}
          onChangeText={(text) =>
            setProdutoEditado({ ...produtoEditado, imagem: text })
          }
        />
        <TouchableOpacity style={styles.botao} onPress={handleEditarProduto}>
          <Text style={styles.textoBotao}>Salvar Edição</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={onClose}>
          <Text style={styles.textoBotao}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

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
