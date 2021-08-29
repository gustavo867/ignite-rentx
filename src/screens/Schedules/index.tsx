import React from "react";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";

import ArrowSvg from "../../assets/arrow.svg";

import * as S from "./styles";

export function Schedules() {
  const theme = useTheme();
  const { navigate } = useNavigation();

  function handleSchedulingDetails() {
    navigate("SchedulingDetails");
  }

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={() => {}} color={theme.colors.shape} />
        <S.Title>
          Escolha uma{"\n"}data de início e{"\n"}fim do aluguel
        </S.Title>

        <S.RentalPeriod>
          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue selected={true}>18/06/2021</S.DateValue>
          </S.DateInfo>
          <ArrowSvg />
          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue selected={false} />
          </S.DateInfo>
        </S.RentalPeriod>
      </S.Header>

      <S.Content>
        <Calendar />
      </S.Content>
      <S.Footer>
        <Button title="Confirmar" onPress={handleSchedulingDetails} />
      </S.Footer>
    </S.Container>
  );
}
