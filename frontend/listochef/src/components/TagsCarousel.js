import { View, Pressable, StyleSheet, ScrollView, Text } from "react-native";

const FilterTag = (props) => {
  const tag = props.tag;
  const isSelected = props.isSelected;

  return (
    <Pressable
      onPress={() => props.onPressTag(tag.name)}
      style={[styles.tag, isSelected && styles.tagSelected]}
    >
      <Text style={styles.tagText}>
        {tag.icon} {tag.name}
      </Text>
    </Pressable>
  );
};

export const TagsCarousel = (props) => {
  const tagsList = props.tagsList;
  const selectedTags = props.selectedTags ?? [];
  const onToggleTag = props.onToggleTag;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tagsList.map((tagItem, index) => (
          <FilterTag
            key={`${tagItem.name}-${index}`}
            tag={tagItem}
            isSelected={selectedTags.includes(tagItem.name)}
            onPressTag={onToggleTag}
          />
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
