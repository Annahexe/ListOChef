import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

const EditProfile = ({ navigation }) => {
  return <View style={styles.backdrop}></View>;
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center", // o flex-end si quieres tipo bottom sheet
    padding: 20,
    paddingVertical: 50,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    flex: 2,
    overflow: "hidden",
  },
  button: {
    margin: 10,
    backgroundColor: "#4B643F",
    padding: 10,
    borderRadius: 8,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: { width: -1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  scrollContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 2,
    marginVertical: 15,
    paddingBottom: 20,
    marginBottom: 0,
  },
  buttonContainer: {
    width: "60%",
    alignSelf: "center",
  },
  textButton: {
    fontSize: 25,
    fontFamily: "InterBold",
    color: "white",
    textAlign: "center",
  },
  mainImage: {
    borderRadius: 15,
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  imageContainer: {
    position: "relative",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  saveButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10, // asegurar que esté encima
    padding: 5,
  },
  multipleLines: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default EditProfile;
