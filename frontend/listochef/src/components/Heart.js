import { StyleSheet, Pressable, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

/**
 * Renders a heart icon button with optional overlay positioning.
 *
 * @param {Object} props - Component props.
 * @param {function} props.onPress - Callback when the heart is pressed.
 * @param {string} props.colorHeart - Color of the heart icon.
 * @param {string} [props.stiles] - Optional style modifier (e.g., "onImage").
 * @returns {JSX.Element} Heart button component.
 */
const Heart = (props) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={[
        styles.heartDefault,
        props.stiles === "onImage" ? styles.heartOverlay : null,
      ]}
      hitSlop={10}
    >
      <View style={styles.iconContainer}>
        <FontAwesome
          name="heart"
          size={30}
          color="black"
          style={styles.shadowIcon}
        />
        <FontAwesome name="heart" size={30} color={props.colorHeart} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  heartOverlay: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  heartDefault: {
    borderRadius: 50,
  },
  iconContainer: {
    position: "relative",
  },

  shadowIcon: {
    position: "absolute",
    left: 2,
    top: 2,
    opacity: 0.35,
  },
});

export default Heart;
