import { StyleSheet, Text, View, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import uno from "../../assets/img/uno.jpg";
import batalhaNaval from "../../assets/img/batalhaNaval.jpg";
import perfil from "../../assets/img/perfil.jpg";

const Carrossel = () => {
  const data = [
    { image: uno, title: "Uno" },
    { image: batalhaNaval, title: "Batalha Naval" },
    { image: perfil, title: "Perfil" },
  ];
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View>
      <Carousel
        loop
        width={300}
        height={300}
        autoPlay={true}
        scrollAnimationDuration={1000}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 400,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 100,
    backgroundColor: "#d4bf6a",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "80%",
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
  },
});

export default Carrossel;
