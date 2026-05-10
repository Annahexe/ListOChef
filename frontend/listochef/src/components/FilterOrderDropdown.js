import { useState } from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import { Menu } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

/**
 * FilterOrderDropdown component used to select the recipe order.
 * Allows the user to choose between Oldest and Newest.
 *
 * @param {Object} props - Component props.
 * @param {string} props.filterOrderValue - Current selected order value.
 * @param {Function} props.setFilterOrderValue - Updates the selected order value.
 * @returns {JSX.Element} Dropdown menu for selecting recipe order.
 */
export const FilterOrderDropdown = ({ filterOrderValue, setFilterOrderValue }) => {
  const [visible, setVisible] = useState(false);

  /**
   * Updates the selected option and closes the dropdown menu.
   *
   * @param {string} option - Selected order option.
   */
  const selectOption = (option) => {
    setFilterOrderValue(option);
    setVisible(false);
  };

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentStyle={styles.menuContent}
      anchor={
        <Pressable style={styles.anchor} onPress={() => setVisible(true)}>
          <Text style={styles.anchorText}>{filterOrderValue}</Text>

          <MaterialCommunityIcons name="chevron-down" size={22} color="#2C5818" />
        </Pressable>
      }
    >
      <Menu.Item title="Oldest" onPress={() => selectOption("Oldest")} />
      <Menu.Item title="Newest" onPress={() => selectOption("Newest")} />
    </Menu>
  );
};

const styles = StyleSheet.create({
  anchor: {
    height: 35,
    width: 230,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: "#2C5818",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  anchorText: {
    color: "#2C5818",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
  },
  menuContent: {
    width: 230,
    borderWidth: 1.5,
    borderColor: "#2C5818",
    borderRadius: 16,
    backgroundColor: "white",
  },
});
