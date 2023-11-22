import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput,  Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const InputWithIcon = ({ icon, ...props }) => {
  return (
    <View style={[styles.inputContainer, { backgroundColor: 'white', marginBottom: 16, width: 300, alignSelf: 'center' }]}>
      <Icon name={icon} size={20} color="#808080" style={styles.icon} />
      <TextInput {...props} style={styles.input} />
    </View>
  );
};

export default function Cadastro() {

  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [residenciaConfirm, setResidenciaConfirm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCadastro = async () => {
    if (!user || !senha || !confirmaSenha) {
      setErrorMessage('Preencha todos os campos para cadastrar.');
    } else if (senha !== confirmaSenha) {
      setErrorMessage('As senhas não coincidem. Tente novamente.');
    } else {
      const userExists = await checkUserExists(user);

      if (userExists) {
        setErrorMessage('Este usuário já existe. Tente outro.');
      } else {
        try {
          const response = await axios.post('https://655ac5066981238d054db51e.mockapi.io/login/usuarios', {
            user,
            senha,
            grupo: 'funcionario',
          });
          setIsModalVisible(true);
        } catch (error) {
          setErrorMessage('Falha ao cadastrar. Por favor, tente novamente.');
        }
      }
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setErrorMessage('');
    navigation.navigate('Home');
  };

  const checkUserExists = async (username) => {
    try {
      const response = await axios.get(`https://655ac5066981238d054db51e.mockapi.io/login/usuarios?user=${username}`);
      return response.data.length > 0;
    } catch (error) {
      console.log('Erro ao verificar usuário:', error);
      return false;
    }
  };
  
  return (
    <View style={styles.container}>
    <Image source={require('../../assets/fundo.png')} style={styles.backgroundImage} />
    <Image source={require('../../assets/logo.png')} style={styles.logo} />
    <TouchableOpacity onPress={() => navigation.navigate('Admin')} style={styles.backButton}>
      <Icon name="arrow-left" size={25} color="white" />
    </TouchableOpacity>
    <View style={styles.signup}>
      <View style={[styles.inputs, { marginTop: 10 }]}>
        <InputWithIcon icon="user" placeholder="Digite seu usuário" placeholderTextColor="#808080" onChangeText={setUser} />
        <InputWithIcon icon="lock" placeholder="Digite sua senha" secureTextEntry placeholderTextColor="#808080" onChangeText={setSenha} />
        <InputWithIcon icon="lock" placeholder="Confirme sua senha" secureTextEntry placeholderTextColor="#808080" onChangeText={setConfirmaSenha} />
        <TouchableOpacity style={styles.signupButton} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
      </View>
    </View>

    <Modal visible={isModalVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Você cadastrou uma nova conta!</Text>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Retorne para Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </View>
 );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BD7834',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  inputs: {
    marginTop: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    width: 200,
  },
  signup: {
    width: '80%',
    borderRadius: 25,
    backgroundColor: '#D4BF6A',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    padding: 20,
  },
  signupButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 100,
    marginTop: 25,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  returnToLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
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
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  
  
});