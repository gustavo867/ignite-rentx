import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";

import { Car } from "../../components/Car";
import { Load } from "../../components/Load";

import * as S from "./styles";

import Logo from "../../assets/logo.svg";

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { BackHandler } from "react-native";

const { width, height } = Dimensions.get("screen");

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CarDTO[]>([]);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const theme = useTheme();

  const myCarsButtonStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: positionY.value },
      { translateX: positionX.value },
    ],
  }));

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive: (event, ctx: any) => {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd: () => {},
  });

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("cars");

        setData(response.data);
        setLoading(false);
      } catch (e) {
        console.log("Error", e.request);
      }
    }

    fetchCars();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, []);

  function handleCarDetails(data: CarDTO) {
    navigate("CarDetails", { data });
  }

  function handleOpenMyCars() {
    navigate("MyCars");
  }

  return (
    <S.Container>
      <S.Header>
        <Logo width={RFValue(108)} height={RFValue(12)} />
        <S.TotalCars>Total de {data.length} carros</S.TotalCars>
      </S.Header>
      {loading ? (
        <S.LoadContainer>
          <Load />
        </S.LoadContainer>
      ) : (
        <>
          <S.CarList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <Car data={item} onPress={handleCarDetails} />
            )}
          />
        </>
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: "absolute",
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <ButtonAnimated
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,

              alignItems: "center",
              justifyContent: "center",

              backgroundColor: theme.colors.main,
            }}
            onPress={handleOpenMyCars}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </S.Container>
  );
}
