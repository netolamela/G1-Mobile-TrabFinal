import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "./src/Components/Routes/AppRoutes";

export default function App() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}
