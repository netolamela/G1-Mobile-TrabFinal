import React, { useState } from 'react';
import { View, Modal, Text, TextInput, Button, StyleSheet } from 'react-native';

const ModalAutenticar = ({ isVisible, onClose, onAuthenticate }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleAuthenticate = () => {
    if (user === 'serratec' && password === '2032') {
      onAuthenticate(); 
    } else {
      alert('Usuário ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Autenticação</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            value={user}
            onChangeText={setUser}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Autenticar" onPress={handleAuthenticate} />
          <Button title="Fechar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default ModalAutenticar;