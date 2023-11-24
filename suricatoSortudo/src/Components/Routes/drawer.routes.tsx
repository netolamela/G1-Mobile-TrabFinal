import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import TabNavigate from "./tab.routes";

import Login from "../../Pages/Login";
import Home from "../../Pages/Home";
import Produtos from "../../Pages/Produtos";
import Integrantes from "../../Pages/Integrantes";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../CustomDrawer";
import Admin from "../../Pages/Admin";
import Cadastro from "../../Pages/Cadastro";
import StackNavigate from "./stack.route";

const Drawer = createDrawerNavigator();

export default function DrawerNavigate({ route }) {
  //console.log("Drawer:", route.params.params.username);
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: "#bd7834",
        drawerInactiveTintColor: "white",
        headerShown: false,
        drawerLabelStyle: { marginLeft: -25 },
      }}
      drawerContent={(props) => <CustomDrawer {...props} route={route} />}
      initialRouteName="Home"
    >
      {/* <Drawer.Screen
        name="Login"
        component={StackNavigate}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome name="user" size={22} color={color} />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Home"
        component={TabNavigate}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Produtos"
        component={Produtos}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="folder1" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Administrar Contas"
        component={Admin}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome name="user-circle" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Cadastrar Conta"
        component={Cadastro}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome name="user-plus" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Integrantes"
        component={Integrantes}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="ios-people-sharp" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});
