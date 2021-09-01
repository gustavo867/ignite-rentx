import React, { useCallback, useState } from "react";
import { useRef } from "react";
import { ViewToken } from "react-native";
import { FlatList } from "react-native";

import * as S from "./styles";

interface Props {
  imagesUrl: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const indexChange = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index;

    setCurrentIndex(index);
  });

  return (
    <>
      <S.Container>
        <S.ImageIndexes>
          {imagesUrl.map((_, index) => (
            <S.ImageIndex key={index} active={index === currentIndex} />
          ))}
        </S.ImageIndexes>

        <FlatList
          data={imagesUrl}
          keyExtractor={(key, index) => `${key}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={16}
          onViewableItemsChanged={indexChange.current}
          renderItem={({ item }) => (
            <S.CarImageWrapper>
              <S.CarImage source={{ uri: item }} resizeMode="contain" />
            </S.CarImageWrapper>
          )}
        />
      </S.Container>
    </>
  );
}
