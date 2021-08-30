import React, { useCallback, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { format } from "date-fns";

import { useTheme } from "styled-components";

import { getPlatformDate } from "../../utils/getPlatformDate";
import { generateInterval } from "../../components/Calendar/generateInterval";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Calendar, DayProps, MarkedDateProps } from "../../components/Calendar";

import ArrowSvg from "../../assets/arrow.svg";

import * as S from "./styles";
import { Alert } from "react-native";
import { CarDTO } from "../../dtos/CarDTO";

type RentalPeriod = {
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
};

type RouteProps = {
  car: CarDTO;
};

export function Schedules() {
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const route = useRoute();
  const { car } = route.params as RouteProps;
  const { navigate, goBack } = useNavigation();

  const theme = useTheme();

  function handleSchedulingDetails() {
    if (!rentalPeriod.start || !rentalPeriod.end) {
      return Alert.alert("Selecione o intervalo para alugar.");
    }

    navigate("SchedulingDetails", {
      car,
      dates: Object.keys(markedDates),
    });
  }

  const handleChangeDate = useCallback(
    (date: DayProps) => {
      let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
      let end = date;

      if (start.timestamp > end.timestamp) {
        start = end;
        end = start;
      }

      setLastSelectedDate(end);

      const interval = generateInterval(start, end);

      setMarkedDates(interval);

      const firstDate = Object.keys(interval)[0];
      const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

      setRentalPeriod({
        start: start.timestamp,
        end: end.timestamp,
        startFormatted: format(
          getPlatformDate(new Date(firstDate)),
          "dd/MM/yyyy"
        ),
        endFormatted: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy"),
      });
    },
    [lastSelectedDate]
  );

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={() => goBack()} color={theme.colors.shape} />
        <S.Title>
          Escolha uma{"\n"}data de início e{"\n"}fim do aluguel
        </S.Title>

        <S.RentalPeriod>
          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </S.DateValue>
          </S.DateInfo>
          <ArrowSvg />
          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>
      </S.Header>

      <S.Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </S.Content>
      <S.Footer>
        <Button
          title="Confirmar"
          onPress={handleSchedulingDetails}
          enabled={!!rentalPeriod.endFormatted}
        />
      </S.Footer>
    </S.Container>
  );
}
