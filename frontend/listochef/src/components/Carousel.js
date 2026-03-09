import React, { useEffect, useRef, useState } from "react";
import { View, FlatList } from "react-native";

const Carousel = ({ data = [], renderItem, cardWidth, spacing = 12, autoScroll = false, autoScrollInterval = 3000 }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const resolvedCardWidth = cardWidth || containerWidth * 0.8;
  const fullItemWidth = resolvedCardWidth + spacing;
  const sidePadding = containerWidth > 0 ? (containerWidth - resolvedCardWidth) / 2 : 0;

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
