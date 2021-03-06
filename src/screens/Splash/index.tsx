import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withTiming,
  Extrapolate,
  runOnJS,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/core";

import * as S from "./styles";

import BrandSvg from "../../assets/brand.svg";
import LogoSvg from "../../assets/logo.svg";
import { useAuth } from "../../hooks/auth";

export function Splash() {
  const { user } = useAuth();
  const { navigate } = useNavigation();

  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      splashAnimation.value,
      [0, 50],
      [1, 0],
      Extrapolate.CLAMP
    ),
    transform: [
      {
        translateX: interpolate(
          splashAnimation.value,
          [0, 50],
          [0, -50],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      splashAnimation.value,
      [0, 25, 50],
      [0, 0.3, 1],
      Extrapolate.CLAMP
    ),
    transform: [
      {
        translateX: interpolate(
          splashAnimation.value,
          [0, 50],
          [-50, 0],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  function startApp() {
    if (Boolean(user?.id)) {
      navigate("App");
    } else {
      navigate("SignIn");
    }
  }

  useEffect(() => {
    splashAnimation.value = withTiming(
      50,
      {
        duration: 1000,
      },
      () => {
        "worklet";
        runOnJS(startApp)();
      }
    );
  }, []);

  return (
    <S.Container>
      <Animated.View
        style={[
          brandStyle,
          {
            position: "absolute",
          },
        ]}
      >
        <BrandSvg width={80} height={50} />
      </Animated.View>

      <Animated.View
        style={[
          logoStyle,
          {
            position: "absolute",
          },
        ]}
      >
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </S.Container>
  );
}
