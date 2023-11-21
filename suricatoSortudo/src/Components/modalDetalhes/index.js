import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

const ProdutoModal = ({ isVisible, produto, onClose }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        {produto && (
          <>
            <Image
              style={styles.modalImagemProduto}
              source={{ uri: produto.imagem }}
            />
            <Text style={styles.modalTexto}>{produto.nome}</Text>
            <Text style={styles.modalTexto}>{produto.descricao}</Text>
            <Text style={styles.modalTexto}>{produto.categoria}</Text>
            <Text style={styles.modalTexto}>R$ {produto.valor}</Text>

            <TouchableOpacity style={styles.botao} onPress={onClose}>
              <Text style={styles.textoBotao}>Fechar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Modal>
  );
};

export default ProdutoModal;

const styles = {
  modalContainer: {
    backgroundColor: "#E2E2AC",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "white",
  },
  modalImagemProduto: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTexto: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
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
};
