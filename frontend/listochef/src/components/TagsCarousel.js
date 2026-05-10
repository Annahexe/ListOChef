import { View, Pressable, StyleSheet, ScrollView, Text } from "react-native";

/**
 * FilterTag component used to display a single selectable tag.
 * Shows the tag name and optional icon, and applies selected styling when active.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.tag - Tag object to display.
 * @param {boolean} props.isSelected - Indicates if the tag is currently selected.
 * @param {Function} props.onPressTag - Function executed when the tag is pressed.
 * @returns {JSX.Element} Selectable tag button.
 */
const FilterTag = (props) => {
  const tag = props.tag;
  const isSelected = props.isSelected;

  const tagName = tag.name ?? tag.ingredientCategoryName;

  return (
    <Pressable onPress={() => props.onPressTag(tagName)} style={[styles.tag, isSelected && styles.tagSelected]}>
      <Text style={styles.tagText} numberOfLines={1}>
        {tag.icon ? `${tag.icon} ` : ""}
        {tagName}
      </Text>
    </Pressable>
  );
};

/**
 * TagsCarousel component that displays a horizontal list of selectable tags.
 * Used to filter lists by one or multiple selected tags.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.tagsList - List of tags to display.
 * @param {Array} props.selectedTags - List of currently selected tag names.
 * @param {Function} props.onToggleTag - Function executed when a tag is selected or unselected.
 * @returns {JSX.Element} Horizontal carousel of filter tags.
 */
export const TagsCarousel = (props) => {
  const tagsList = props.tagsList;
  const selectedTags = props.selectedTags ?? [];
  const onToggleTag = props.onToggleTag;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tagsList.map((tagItem, index) => (
          <FilterTag key={`${tagItem.name}-${index}`} tag={tagItem} isSelected={selectedTags.includes(tagItem.name)} onPressTag={onToggleTag} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "95%", marginVertical: "3%" },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "rgba(75, 100, 63, 0.5)",
  },
  tagSelected: {
    backgroundColor: "#4B643F",
  },
  tagText: {
    fontFamily: "MontserratSemiBold",
    color: "white",
    fontSize: 16,
  },
});
