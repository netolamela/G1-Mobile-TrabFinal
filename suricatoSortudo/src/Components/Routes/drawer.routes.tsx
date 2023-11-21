import { StyleSheet, Text, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import TabNavigate from "./tab.routes";

import Login from "../../Pages/Login";
import Home from "../../Pages/Home";
import Produtos from "../../Pages/Produtos";
import Integrantes from "../../Pages/Integrantes";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../CustomDrawer";

const Drawer = createDrawerNavigator();

export default function DrawerNavigate() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: "#bd7834",
        drawerInactiveTintColor: "white",
        headerShown: false,
        drawerLabelStyle: { marginLeft: -25 },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="Produtos"
    >
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome name="user" size={22} color={color} />
          ),
        }}
      />
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
