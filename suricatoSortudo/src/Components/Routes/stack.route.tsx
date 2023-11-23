import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigate from "./drawer.routes";
import Login from "../../Pages/Login";

const Stack = createNativeStackNavigator();

const StackNavigate = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Drawer" component={DrawerNavigate} />
    </Stack.Navigator>
  );
};

export default StackNavigate;
