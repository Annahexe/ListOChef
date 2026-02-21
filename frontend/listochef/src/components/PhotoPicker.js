import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const PhotoPicker = (props) => (
  <View style={styles.imageInput}>
    {!props.photo ? (
      <Pressable onPress={props.choosePhoto}>
        <AntDesign
          name="camera"
          size={40}
          color="black"
          style={{ alignSelf: "center" }}
        />
        <Text style={{ fontSize: 20, fontFamily: "InterMedium" }}>
          Choose your photo
        </Text>
      </Pressable>
    ) : (
      <Pressable onPress={props.choosePhoto}>
        <Image
          source={{ uri: props.photo }}
          style={{ width: 200, height: 200, marginTop: 10 }}
        />
      </Pressable>
    )}
  </View>
);

const styles = StyleSheet.create({
  imageInput: {
    width: "100%",
    fontSize: 20,
    backgroundColor: "#DBE0D9",
    textAlign: "Left",
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: -1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#2C5818",
    alignItems: "center",

    elevation: 5,
  },
});

export default PhotoPicker;
