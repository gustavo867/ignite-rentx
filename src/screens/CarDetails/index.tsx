import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Button } from "../../components/Button";

import * as S from "./styles";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

type RouteProps = {
  data: CarDTO;
};

export function CarDetails() {
  const route = useRoute();
  const theme = useTheme();
  const { data } = route.params as RouteProps;
  const { goBack, navigate } = useNavigation();

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP),
  }));

  const slideCarsStyleAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
  }));

  function handleCalendar() {
    navigate("Schedules", { car: data });
  }

  return (
    <S.Container>
      <Animated.View
        style={[
          headerStyleAnimation,
          {
            position: "absolute",
            overflow: "hidden",
            zIndex: 1,
            backgroundColor: theme.colors.background_secondary,
          },
        ]}
      >
        <SafeAreaView>
          <S.Header>
            <BackButton onPress={() => goBack()} />
          </S.Header>

          <Animated.View style={slideCarsStyleAnimation}>
            <ImageSlider imagesUrl={data.photos.map((item) => item.photo)} />
          </Animated.View>
        </SafeAreaView>
      </Animated.View>

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 24,
          paddingTop: 160,
          alignItems: "center",
        }}
      >
        <S.Details>
          <S.Description>
            <S.Brand>{data.brand}</S.Brand>
            <S.Name>{data.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{data.period}</S.Period>
            <S.Price>R$ {data.price}</S.Price>
          </S.Rent>
        </S.Details>
        <S.Accessories>
          {data.accessories.map((item, index) => (
            <Accessory
              key={`${item.name}-${index}`}
              name={item.name}
              icon={getAccessoryIcon(item.type)}
            />
          ))}
        </S.Accessories>
        <S.About>{data.about}</S.About>
        <S.About>{data.about}</S.About>
        <S.About>{data.about}</S.About>
        <S.About>{data.about}</S.About>
        <S.About>{data.about}</S.About>
      </Animated.ScrollView>

      <S.Footer>
        <Button title="Escolher período do aluguel" onPress={handleCalendar} />
      </S.Footer>
    </S.Container>
  );
}
