import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { addPics } from "../reducers/user";
import { useIsFocused } from "@react-navigation/native";

export default function SnapScreen() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null || !isFocused) {
    return <View />;
  }

  const takePicture = async () => {
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.4 });

      console.log("Photo taken successfully:", photo);

      const formData = new FormData();

      formData.append("photoFromFront", {
        uri: photo.uri,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      console.log("FormData created:", formData);

      // const response = await fetch("http://10.75.14.104:5005/upload", {
      const response = await fetch("https://snap-back.vercel.app/upload", {
        method: "POST",
        body: formData,
      });

      console.log("Fetch response:", response);

      if (!response.ok) {
        throw new Error(
          "La requête a échoué avec le code : " + response.status
        );
      }

      const data = await response.json();

      console.log("JSON response data:", data);

      if (data.result) {
        dispatch(addPics(data.url));
        console.log("Image uploaded successfully.");
      } else {
        console.log("Image upload failed. Server response:", data);
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  };

  return (
    <Camera
      type={type}
      flashMode={flashMode}
      ref={cameraRef}
      style={styles.container}
    >
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            )
          }
        >
          <FontAwesome name="rotate-right" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setFlashMode(
              flashMode === FlashMode.off ? FlashMode.on : FlashMode.off
            )
          }
        >
          <FontAwesome
            name="flash"
            size={25}
            color={flashMode === FlashMode.on ? "#e8be4b" : "#fff"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.snapContainer}>
        <TouchableOpacity onPress={() => takePicture()}>
          <FontAwesome name="circle-thin" size={90} color="#fff" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 0.1,
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  button: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(250,0,0,0.2)",
    borderRadius: 50,
  },
  snapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 25,
  },
});
