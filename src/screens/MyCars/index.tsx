import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { Load } from "../../components/Load";
import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";

import * as S from "./styles";
import { BackButton } from "../../components/BackButton";
import { FlatList } from "react-native";
import { Car } from "../../components/Car";

interface CarProps {
  id: string;
  user_id: string;
  startDate: string;
  endDate: string;
  car: CarDTO;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { goBack } = useNavigation();

  const theme = useTheme();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("schedules_byuser?user_id=1");

        setCars(response.data);
      } catch (e) {
        console.log("Error", e.request);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

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
                      <S.CarFooterDate>{item.startDate}</S.CarFooterDate>
                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={theme.colors.title}
                        style={{
                          marginHorizontal: 10,
                        }}
                      />
                      <S.CarFooterDate>{item.endDate}</S.CarFooterDate>
                    </S.CarFooterPeriod>
                  </S.CarFooter>
                </S.CarWrapper>
              )}
            />
          </>
        )}
      </S.Content>
    </S.Container>
  );
}
