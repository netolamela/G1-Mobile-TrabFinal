import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const ModalAddProduto = ({ onAdicionarProduto, onClose }) => {
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    descricao: "",
    categoria: "",
    valor: "",
    imagem: "",
  });

  const handleAdicionarProduto = () => {
    if (
      novoProduto.nome.trim() === "" ||
      novoProduto.descricao.trim() === "" ||
      novoProduto.categoria.trim() === "" ||
      novoProduto.valor.trim() === "" ||
      novoProduto.imagem.trim() === ""
    ) {
      alert.alert("Todos os campos obrigatórios devem ser preenchidos");
      return;
    }
    onAdicionarProduto(novoProduto);

    setNovoProduto({
      nome: "",
      descricao: "",
      categoria: "",
      valor: "",
      imagem: "",
    });

    onClose();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do produto"
        value={novoProduto.nome}
        onChangeText={(text) => setNovoProduto({ ...novoProduto, nome: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição do produto"
        value={novoProduto.descricao}
        onChangeText={(text) =>
          setNovoProduto({ ...novoProduto, descricao: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria do produto"
        value={novoProduto.categoria}
        onChangeText={(text) =>
          setNovoProduto({ ...novoProduto, categoria: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={novoProduto.valor}
        onChangeText={(text) => setNovoProduto({ ...novoProduto, valor: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="URL da imagem"
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
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
  },
});

export default ModalAddProduto;
