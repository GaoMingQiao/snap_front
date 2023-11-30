import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removePic } from "../reducers/user";

export default function GalleryScreen() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const pics = user.pics.map((data, i) => {
    // on va boucler sur le tableau photosData et pour chaque élément, on va retourner un composant Image avec la source qui est l'élément du tableau
    return (
      <View key={i} style={styles.picsContainer}>
        <TouchableOpacity onPress={() => dispatch(removePic(data))}>
          <FontAwesome name="times" size={20} />
        </TouchableOpacity>
        <Image source={{ uri: data }} style={styles.image} />
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>GalleryScreen</Text>
      <Text style={styles.logged}>Logged as : {user.email} </Text>

      <ScrollView contentContainerStyle={styles.galleryContainer}>
        {pics}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontFamily: "Futura",
    marginTop: 10,
  },
  galleryContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 60,
  },
  picsContainer: { alignItems: "flex-end" },
  icon: {
    marginRight: 10,
  },
  image: {
    width: 150,
    height: 150,
    margin: 10,
  },
  logoutButton: {
    padding: 10,
    backgroundColor: "rgba(250,0,0,0.2)",
  },
});
