import React, { useCallback, useState } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { ViewToken } from "react-native";
import { FlatList } from "react-native";
import FastImage from "react-native-fast-image";

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

  const images = useMemo(() => {
    FastImage.preload(imagesUrl.map((item) => ({ uri: item })));

    return imagesUrl;
  }, [imagesUrl]);

  const indexChange = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index;

    setCurrentIndex(index);
  });

  return (
    <>
      <S.Container>
        <S.ImageIndexes>
          {images.map((_, index) => (
            <S.ImageIndex key={index} active={index === currentIndex} />
          ))}
        </S.ImageIndexes>

        <FlatList
          data={images}
          keyExtractor={(key, index) => `${key}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={16}
          onViewableItemsChanged={indexChange.current}
          renderItem={({ item }) => (
            <S.CarImageWrapper>
              <S.CarImage
                source={{ uri: item, priority: FastImage.priority.normal }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </S.CarImageWrapper>
          )}
        />
      </S.Container>
    </>
  );
}
