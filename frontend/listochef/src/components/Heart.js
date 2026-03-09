import { StyleSheet, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Heart = (props) => {
  return (
    <Pressable onPress={props.onPress} style={[styles.heartDefault, props.stiles === "onImage" ? styles.heartOverlay : null]} hitSlop={10}>
      <FontAwesome name={"heart"} size={30} color={props.colorHeart} style={styles.iconShadow} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  heartOverlay: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 6,
    borderRadius: 50,
  },
  heartDefault: {
    padding: 6,
    borderRadius: 50,
  },
  iconShadow: {
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    paddingRight: 2,
    paddingBottom: 2,
  },
});

export default Heart;
