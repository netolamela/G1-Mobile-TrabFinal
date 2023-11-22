import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Modal, Image } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function Admin() {
  const navigation = useNavigation();
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get('https://655ac5066981238d054db51e.mockapi.io/login/usuarios');
      const filteredAccounts = response.data.filter(account => account.id !== 1);
      setAccounts(filteredAccounts);
    } catch (error) {
      console.error('Erro ao obter contas:', error);
      Alert.alert('Erro', 'Falha ao obter contas. Por favor, tente novamente.');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchAccounts();
    });
    return unsubscribe;
  }, [navigation]);

  const handleDeleteAccount = async (accountId) => {
    setSelectedAccount(accountId);
    setIsModalVisible(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      await axios.delete(`https://655ac5066981238d054db51e.mockapi.io/login/usuarios/${selectedAccount}`);
      fetchAccounts();
      setIsModalVisible(false);
      setSelectedAccount(null);
      Alert.alert('Sucesso', 'Conta excluída com sucesso.');
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      Alert.alert('Erro', 'Falha ao excluir conta. Por favor, tente novamente.');
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedAccount(null);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/fundo.png')} style={styles.backgroundImage} />
      <TouchableOpacity onPress={() => navigation.navigate("Home")} style={[styles.backButton, { margin: 20, marginTop: 20 }]}>
        <Icon name="arrow-left" size={25} color="white" />
      </TouchableOpacity>
      <Text style={styles.header}>Menu de Administrar Contas</Text>
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.accountItem}>
            <Text style={styles.userName}>{`${item.user} - ${item.grupo}`}</Text>
            <TouchableOpacity onPress={() => handleDeleteAccount(item.id)}>
              <Text style={styles.deleteButton}>Excluir Conta</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Deseja realmente excluir esta conta?</Text>
            <TouchableOpacity onPress={confirmDeleteAccount} style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
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
  backgroundImage: {
    position: 'absolute',
    width: "120%",
    height: "120%",
  },
  header: {
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
  accountItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  deleteButton: {
    color: 'red',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  userName: {
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
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: '60%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 8,
    width: '60%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
});