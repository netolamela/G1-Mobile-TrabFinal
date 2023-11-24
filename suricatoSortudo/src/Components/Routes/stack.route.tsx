import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigate from "./drawer.routes";
import Login from "../../Pages/Login";
import Animacao from "../TelaScreen";

const Stack = createNativeStackNavigator();

const StackNavigate = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isConnected ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Animacao" component={Animacao} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Drawer" component={DrawerNavigate} />
        </Stack.Navigator>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "red", fontSize: 25 }}>Oops!</Text>
          <Text style={{ fontSize: 18 }}>
            Parece que entramos em uma dimensão sem internet. Estaremos de volta
            logo! Verifique sua conexão e esteja pronto para a próxima aventura.
          </Text>
        </View>
      )}
    </View>
  );
};

export default StackNavigate;
