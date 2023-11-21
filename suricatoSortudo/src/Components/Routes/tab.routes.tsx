import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import Home from "../../Pages/Home";
import Produtos from "../../Pages/Produtos";
import Integrantes from "../../Pages/Integrantes";

const Tab = createBottomTabNavigator();

export default function TabNavigate() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#bd7834",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Início"
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
      <Tab.Screen
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
      <Tab.Screen
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
}
