import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Button } from "../../components/Button";

import SpeedSvg from "../../assets/speed.svg";
import AccelerationSvg from "../../assets/acceleration.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/people.svg";

import * as S from "./styles";

export function CarDetails() {
  const { goBack, navigate } = useNavigation();

  function handleCalendar() {
    navigate("Schedules");
  }

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={() => goBack()} />
      </S.Header>

      <ImageSlider
        imagesUrl={[
          "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
        ]}
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
            <S.Brand>Lamborghini</S.Brand>
            <S.Name>Huracan</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>Ao dia</S.Period>
            <S.Price>R$ 580</S.Price>
          </S.Rent>
        </S.Details>
        <S.Accessories>
          <Accessory name="380km/h" icon={SpeedSvg} />
          <Accessory name="3.2s" icon={AccelerationSvg} />
          <Accessory name="800 HP" icon={ForceSvg} />
          <Accessory name="Gasolina" icon={GasolineSvg} />
          <Accessory name="Auto" icon={ExchangeSvg} />
          <Accessory name="2 pessoas" icon={PeopleSvg} />
        </S.Accessories>
        <S.About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide
          indultado na praça Real Maestranza de Sevilla. É um belíssimo carro
          para quem gosta de acelerar.
        </S.About>
      </S.Content>

      <S.Footer>
        <Button title="Escolher período do aluguel" onPress={handleCalendar} />
      </S.Footer>
    </S.Container>
  );
}
