import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CustomDrawer = ({ route, ...props }) => {
  const navigation = useNavigation();
  const usuario = route.params.params.username;
  //console.log("usuario no custemD:", usuario);
  return (
    <View style={{ flex: 1, backgroundColor: "#0c432e" }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 16,
          }}
        >
          <Image
            source={require("../assets/logo.png")}
            style={{ height: 80, width: 80, marginRight: 16 }}
          />
          <Text style={{ color: "white", fontSize: 18 }}>Olá, {usuario}!</Text>
        </View>
        <View>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          color: "#d4bf6a",
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: "#ccc",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="logout" color="white" size={22} />
            <Text style={{ marginLeft: 5, color: "white" }}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomDrawer;
