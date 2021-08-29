import { useNavigation } from "@react-navigation/native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";

import * as S from "./styles";

export function Home() {
  const { navigate } = useNavigation();

  const data = {
    brand: "Audi",
    name: "RS 5 Coupé",
    rent: {
      price: "120,00",
      period: "Ao dia",
    },
    thumbnail: "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
  };

  function handleCarDetails() {
    navigate("CarDetails");
  }

  return (
    <S.Container>
      <S.Header>
        <Logo width={RFValue(108)} height={RFValue(12)} />
        <S.TotalCars>Total de 12 carros</S.TotalCars>
      </S.Header>
      <S.CarList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Car data={data} onPress={handleCarDetails} />
        )}
      />
    </S.Container>
  );
}
