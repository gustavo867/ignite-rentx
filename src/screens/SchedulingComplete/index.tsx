import React from "react";
import { useWindowDimensions } from "react-native";

import * as S from "./styles";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { ConfirmButton } from "../../components/ConfirmButton";
import { useNavigation } from "@react-navigation/native";

export function SchedulingComplete() {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();

  function handleNavigateToHome() {
    navigate("Home");
  }

  return (
    <S.Container>
      <LogoSvg width={width} />
      <S.Content>
        <DoneSvg width={80} height={80} />
        <S.Title>Carro alugado!</S.Title>

        <S.Message>
          Agora você so precisa ir{"\n"}até a concessionária da RENTX{"\n"}pegar
          o seu automóvel.
        </S.Message>
      </S.Content>
      <S.Footer>
        <ConfirmButton title="Ok" onPress={handleNavigateToHome} />
      </S.Footer>
    </S.Container>
  );
}
