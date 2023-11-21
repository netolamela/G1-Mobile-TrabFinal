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
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Carousel
        loop
        width={370}
        height={400}
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
    width: 350,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d4bf6a",
    borderRadius: 10,
    marginLeft: 10,
  },
  image: {
    width: "90%",
    height: "70%",
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
  },
});

export default Carrossel;
