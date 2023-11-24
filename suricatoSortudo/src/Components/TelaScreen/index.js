import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Animated, StyleSheet, View, Image } from 'react-native';

export default function Animacao() {
  const navigation = useNavigation();
  const scaleAnimada = useRef(new Animated.Value(0)).current;
  const opacAnimada = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const inicAnimacao = () => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnimada, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(opacAnimada, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: false,
          }),
        ]),
      ]).start(() => {
        navigation.replace('Login');
      });
    };

    const tempDelay = setTimeout(inicAnimacao);

    return () => {
      clearTimeout(tempDelay);
    };
  }, [scaleAnimada, opacAnimada, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnimada }],
          opacity: opacAnimada,
        }}
      >
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bd7834',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 500,
    height: 500,
    resizeMode: 'contain', 
  },
});
