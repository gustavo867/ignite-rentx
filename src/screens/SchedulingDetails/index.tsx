import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Button } from "../../components/Button";

import * as S from "./styles";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { api } from "../../services/api";
import { Alert } from "react-native";
import { Car as CarModel } from "../../databases/models/car";
import { useNetInfo } from "@react-native-community/netinfo";

type RouteProps = {
  car: CarModel;
  dates: string[];
};

type RentalPeriod = {
  start: string;
  end: string;
};

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const netInfo = useNetInfo();
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const [loading, setLoading] = useState(false);
  const { navigate, goBack } = useNavigation();
  const { params } = useRoute();
  const { car, dates } = params as RouteProps;
  const theme = useTheme();
  const rentTotal = Number(dates.length) * car.price;

  async function handleSchedulingComplete() {
    setLoading(true);

    await api
      .post("rentals", {
        user_id: 1,
        car_id: car.id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal,
      })
      .then(() => {
        setLoading(false);
        navigate("SchedulingComplete");
      })
      .catch((error) => {
        console.log("Error", error.request);

        setLoading(false);

        Alert.alert("Não foi possível confirmar o agendamento");
      });
  }

  useEffect(() => {
    async function fetchCarUpdate() {
      const response = await api.get(`cars/${car.id}`);

      setCarUpdated(response.data);
    }

    if (netInfo.isConnected === true) {
      fetchCarUpdate();
    }
  }, [netInfo.isConnected]);

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={() => goBack()} />
      </S.Header>

      <ImageSlider
        imagesUrl={
          carUpdated?.photos
            ? carUpdated?.photos.map((item) => item.photo)
            : [car.thumbnail]
        }
      />

      <S.Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 24,
          alignItems: "center",
        }}
      >
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.period}</S.Period>
            <S.Price>
              R$ {netInfo.isConnected === true ? car.price : "..."}
            </S.Price>
          </S.Rent>
        </S.Details>
        {carUpdated?.accessories && (
          <S.Accessories>
            {carUpdated.accessories.map((item, index) => (
              <Accessory
                key={`${item.name}-${index}`}
                name={item.name}
                icon={getAccessoryIcon(item.type)}
              />
            ))}
          </S.Accessories>
        )}

        <S.RentalPeriod>
          <S.CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </S.CalendarIcon>

          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>{rentalPeriod.start}</S.DateValue>
          </S.DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue>{rentalPeriod.end}</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceLabel>TOTAL</S.RentalPriceLabel>
          <S.RentalPriceDetails>
            <S.RentalPriceQuota>
              R$ {netInfo.isConnected === true ? car.price : "..."} x
              {dates.length} diárias
            </S.RentalPriceQuota>
            <S.RentalPriceTotal>
              R$ {netInfo.isConnected === true ? rentTotal : "..."}
            </S.RentalPriceTotal>
          </S.RentalPriceDetails>
        </S.RentalPrice>
      </S.Content>

      <S.Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleSchedulingComplete}
          enabled={netInfo.isConnected === true ? !loading : false}
          loading={loading}
        />

        {netInfo.isConnected === false && (
          <S.OfflineInfo>
            Conecte-se a Internet para ver mais detalhes e agendar seu carro.
          </S.OfflineInfo>
        )}
      </S.Footer>
    </S.Container>
  );
}
