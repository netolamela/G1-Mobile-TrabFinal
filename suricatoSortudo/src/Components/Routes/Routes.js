import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigate from "./drawer.routes";

export default function Routes() {
  return (
    <NavigationContainer>
      <DrawerNavigate />
    </NavigationContainer>
  );
}
