import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Modal, Image } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function Admin() {
  const navigation = useNavigation();
  const [contas, setContas] = useState([]);
  const [contaSelecionada, setContaSelecionada] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const buscarContas = async () => {
    try {
      const response = await axios.get('https://655ac5066981238d054db51e.mockapi.io/login/usuarios');
      const contasFiltradas = response.data.filter(conta => conta.id !== 1);
      setContas(contasFiltradas);
    } catch (error) {
      console.error('Erro ao obter contas:', error);
      Alert.alert('Erro', 'Falha ao obter contas. Por favor, tente novamente.');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      buscarContas();
    });
    return unsubscribe;
  }, [navigation]);

  const handleExcluirConta = async (idConta) => {
    setContaSelecionada(idConta);
    setIsModalVisible(true);
  };

  const confirmarExclusaoConta = async () => {
    try {
      await axios.delete(`https://655ac5066981238d054db51e.mockapi.io/login/usuarios/${contaSelecionada}`);
      buscarContas();
      setIsModalVisible(false);
      setContaSelecionada(null);
      Alert.alert('Sucesso', 'Conta excluída com sucesso.');
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      Alert.alert('Erro', 'Falha ao excluir conta. Por favor, tente novamente.');
    }
  };

  const fecharModal = () => {
    setIsModalVisible(false);
    setContaSelecionada(null);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/fundo.png')} style={styles.imagemFundo} />
      <TouchableOpacity onPress={() => navigation.navigate("Home")} style={[styles.botaoVoltar, { margin: 20, marginTop: 20 }]}>
        <Icon name="arrow-left" size={25} color="white" />
      </TouchableOpacity>
      <Text style={styles.cabecalho}>Menu de Administrar Contas</Text>
      <FlatList
        data={contas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemConta}>
            <Text style={styles.nomeUsuario}>{`${item.user} - ${item.grupo}`}</Text>
            <TouchableOpacity onPress={() => handleExcluirConta(item.id)}>
              <Text style={styles.botaoExcluir}>Excluir Conta</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalConteudo}>
            <Text style={styles.textoModal}>Deseja realmente excluir esta conta?</Text>
            <TouchableOpacity onPress={confirmarExclusaoConta} style={styles.botaoConfirmar}>
              <Text style={styles.textoBotaoConfirmar}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={fecharModal} style={styles.botaoCancelar}>
              <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
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
    backgroundColor: '#BD7834',
    padding: 20,
  },
  imagemFundo: {
    position: 'absolute',
    width: "120%",
    height: "120%",
  },
  cabecalho: {
    backgroundColor: '#0C432E',
    borderRadius: 20,
    width: "100%",
    height: 50,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    alignSelf: "center",
    textAlign: 'center',
  },
  itemConta: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  botaoExcluir: {
    color: 'red',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  nomeUsuario: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalConteudo: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  textoModal: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  botaoConfirmar: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: '60%',
    alignItems: 'center',
  },
  textoBotaoConfirmar: {
    color: 'white',
    fontSize: 16,
  },
  botaoCancelar: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 8,
    width: '60%',
    alignItems: 'center',
  },
  textoBotaoCancelar: {
    color: 'white',
    fontSize: 16,
  },
});
