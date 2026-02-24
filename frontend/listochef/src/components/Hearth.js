import { StyleSheet, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Hearth = (props) => {
  return (
    <Pressable onPress={props.onPress}>
      <FontAwesome
        style={[
          styles.hearthDefault,
          props.stiles == "onImage" ? styles.heartOverlay : null,
        ]}
        name={"heart"}
        size={30}
        color={props.colorHearth}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  heartOverlay: {
    position: "absolute",
    top: -135,
    zIndex: 10,
    right: 15,
    padding: 6,
    borderRadius: 50,
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  hearthDefault: {
    padding: 6,
    borderRadius: 50,
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default Hearth;
