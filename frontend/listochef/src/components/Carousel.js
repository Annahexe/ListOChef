import React, { useEffect, useRef, useState } from "react";
import { View, FlatList } from "react-native";

/**
 * Reusable horizontal carousel component.
 * Displays a list of cards with snap scrolling and optional automatic scrolling.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.data - Items displayed in the carousel.
 * @param {Function} props.renderItem - Function that renders each carousel item.
 * @param {number} props.cardWidth - Optional fixed width for each carousel card.
 * @param {number} props.spacing - Space between carousel items.
 * @param {boolean} props.autoScroll - Enables automatic carousel movement.
 * @param {number} props.autoScrollInterval - Time in milliseconds between automatic scrolls.
 * @returns {JSX.Element} Horizontal carousel component.
 */
const Carousel = ({ data = [], renderItem, cardWidth, spacing = 12, autoScroll = false, autoScrollInterval = 3000 }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  /** Card width calculated from prop or from the container width. */
  const resolvedCardWidth = cardWidth || containerWidth * 0.8;

  /** Total width occupied by one card plus its spacing. */
  const fullItemWidth = resolvedCardWidth + spacing;

  /** Horizontal padding used to center the first and last carousel cards. */
  const sidePadding = containerWidth > 0 ? (containerWidth - resolvedCardWidth) / 2 : 0;

  /**
   * Handles automatic carousel scrolling when autoScroll is enabled.
   * Moves to the next item and returns to the first item after the last one.
   */
  useEffect(() => {
    if (!autoScroll || data.length <= 1 || containerWidth === 0) return;

    const interval = setInterval(() => {
      const nextIndex = currentIndex === data.length - 1 ? 0 : currentIndex + 1;

      flatListRef.current?.scrollToOffset({
        offset: nextIndex * fullItemWidth,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [autoScroll, autoScrollInterval, currentIndex, data.length, fullItemWidth, containerWidth]);

  /**
   * Updates the current carousel index after manual scrolling.
   *
   * @param {Object} event - Native scroll event.
   */
  const handleMomentumScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / fullItemWidth);
    setCurrentIndex(index);
  };

  return (
    <View
      style={{ width: "100%" }}
      onLayout={(event) => {
        setContainerWidth(event.nativeEvent.layout.width);
      }}
    >
      {containerWidth > 0 && (
        <FlatList
          ref={flatListRef}
          data={data}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={fullItemWidth}
          decelerationRate="fast"
          bounces={false}
          contentContainerStyle={{
            paddingHorizontal: sidePadding,
          }}
          ItemSeparatorComponent={() => <View style={{ width: spacing }} />}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          renderItem={({ item, index }) => <View style={{ width: resolvedCardWidth }}>{renderItem({ item, index })}</View>}
        />
      )}
    </View>
  );
};

export default Carousel;
