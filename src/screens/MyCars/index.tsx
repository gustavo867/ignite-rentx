import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { Load } from "../../components/Load";
import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";

import * as S from "./styles";
import { BackButton } from "../../components/BackButton";
import { FlatList } from "react-native";
import { Car } from "../../components/Car";
import { Car as CarModel } from "../../databases/models/car";
import { format, parseISO } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { useNetInfo } from "@react-native-community/netinfo";

interface CarProps {
  id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  car: CarModel;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { goBack } = useNavigation();
  const netInfo = useNetInfo();
  const screenisFocus = useIsFocused();

  const theme = useTheme();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("rentals");

        const dataFormatted = response.data.map((data: CarProps) => ({
          ...data,
          id: data.id,
          car: data.car,
          start_date: format(parseISO(data.start_date), "dd/MM/yyyy"),
          end_date: format(parseISO(data.end_date), "dd/MM/yyyy"),
        }));

        setCars(dataFormatted);
      } catch (e) {
        console.log("Error", e.request);
      } finally {
        setLoading(false);
      }
    }

    if (netInfo.isConnected === true) {
      fetchCars();
    }
  }, [screenisFocus, netInfo.isConnected]);

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={() => goBack()} color={theme.colors.shape} />
        <S.Title>Seus agendamentos,{"\n"}estão aqui.</S.Title>
        <S.SubTitle>Conforto, segurança e praticidade.</S.SubTitle>
      </S.Header>
      <S.Content>
        <S.Appointments>
          <S.AppointmentsTitle>Agendamentos feitos</S.AppointmentsTitle>
          <S.AppointmentsQuantity>{cars.length}</S.AppointmentsQuantity>
        </S.Appointments>
        {loading ? (
          <S.LoadContainer>
            <Load />
          </S.LoadContainer>
        ) : (
          <>
            <FlatList
              data={cars}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <S.CarWrapper>
                  <Car data={item.car} onPress={() => {}} />
                  <S.CarFooter>
                    <S.CarFooterTitle>Período</S.CarFooterTitle>
                    <S.CarFooterPeriod>
                      <S.CarFooterDate>{item.start_date}</S.CarFooterDate>
                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={theme.colors.title}
                        style={{
                          marginHorizontal: 10,
                        }}
                      />
                      <S.CarFooterDate>{item.end_date}</S.CarFooterDate>
                    </S.CarFooterPeriod>
                  </S.CarFooter>
                </S.CarWrapper>
              )}
            />
          </>
        )}

        {netInfo.isConnected === false && (
          <S.OfflineInfo>
            Conecte-se a Internet para ver seus carros agendados
          </S.OfflineInfo>
        )}
      </S.Content>
    </S.Container>
  );
}
