import {Image, View, StyleSheet} from "react-native";
import colors from "../design/colors";

export default function Header() {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require("../assets/Logo.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.gray_330
    },
    img:{
        height: 40,
        width: 150,
        resizeMode: "contain",
    }
})

