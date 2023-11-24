import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigate from "./drawer.routes";
import StackNavigate from "./stack.route";

export default function Routes() {
  return (
    <NavigationContainer>
      <StackNavigate />
    </NavigationContainer>
  );
}
