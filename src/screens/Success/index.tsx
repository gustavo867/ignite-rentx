import React from "react";
import { useWindowDimensions } from "react-native";

import * as S from "./styles";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { ConfirmButton } from "../../components/ConfirmButton";
import { useNavigation, useRoute } from "@react-navigation/native";

type RouteProps = {
  title: string;
  subTitle: string;
  nextScreen: string;
};

export function Success() {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();

  const route = useRoute();
  const { title, subTitle, nextScreen } = route.params as RouteProps;

  function handleNavigateToHome() {
    navigate(nextScreen);
  }

  return (
    <S.Container>
      <LogoSvg width={width} />
      <S.Content>
        <DoneSvg width={80} height={80} />
        <S.Title>{title}</S.Title>

        <S.Message>{subTitle}</S.Message>
      </S.Content>
      <S.Footer>
        <ConfirmButton title="Ok" onPress={handleNavigateToHome} />
      </S.Footer>
    </S.Container>
  );
}
