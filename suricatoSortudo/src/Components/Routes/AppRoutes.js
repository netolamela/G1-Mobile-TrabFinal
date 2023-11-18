import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import Login from "../../Pages/Login";
import Home from "../../Pages/Home";
import Produtos from "../../Pages/Produtos";
import Integrantes from "../../Pages/Integrantes";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function AppRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: "#0c432e",
        drawerInactiveBackgroundColor: "#0c432e",
        drawerActiveTintColor: "#bd7834",
        drawerInactiveTintColor: "white",
      }}
    >
      <Drawer.Screen name="Home" component={TabNavigate} />
      <Drawer.Screen name="Produtos" component={TabNavigate} />
      <Drawer.Screen name="Integrantes" component={TabNavigate} />
    </Drawer.Navigator>
  );
}

export const TabNavigate = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#bd7834",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={30} color={color} />
          ),

          tabBarInactiveTintColor: "white",
          tabBarActiveBackgroundColor: "#0c432e",
          tabBarInactiveBackgroundColor: "#0c432e",
        }}
      />
      <Drawer.Screen
        name="Produtos"
        component={Produtos}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="folder1" size={30} color={color} />
          ),

          tabBarInactiveTintColor: "white",
          tabBarActiveBackgroundColor: "#0c432e",
          tabBarInactiveBackgroundColor: "#0c432e",
        }}
      />
      <Drawer.Screen
        name="Integrantes"
        component={Integrantes}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-people-sharp" size={30} color={color} />
          ),

          tabBarInactiveTintColor: "white",
          tabBarActiveBackgroundColor: "#0c432e",
          tabBarInactiveBackgroundColor: "#0c432e",
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});
