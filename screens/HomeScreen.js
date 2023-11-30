import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmail } from "../reducers/user";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

  const handlePress = () => {
    if (!email.match(regex)) {
      setErrorMsg("Invalid Email 🤬");
      return;
    }
    dispatch(addEmail(email.toLowerCase()));
    navigation.navigate("TabNavigator", { screen: "Gallery" });
    setEmail("");
    setErrorMsg("");
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <KeyboardAvoidingView style={styles.container}>
        <Image style={styles.image} source={require("../assets/camera.png")} />
        <View style={styles.absoluteBlock}>
          <Text>{email}</Text>
          <Text style={styles.title}>SNAP</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
          {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
          <TouchableOpacity style={styles.button} onPress={() => handlePress()}>
            <Text style={styles.textButton}>Go to Gallery</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    opacity: 0.8,
  },
  title: {
    fontSize: 70,
    color: "white",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
  },
  absoluteBlock: {
    position: "absolute",
  },
  button: {
    backgroundColor: "purple",
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 12,
    borderRadius: 10,
  },
  textButton: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "yellow",
    marginTop: 20,
  },
});
