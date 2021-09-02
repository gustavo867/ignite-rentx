import React from "react";

import * as S from "./styles";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { Car as CarModel } from "../../databases/models/car";
import { useNetInfo } from "@react-native-community/netinfo";
import FastImage from "react-native-fast-image";

type Props = {
  data: CarModel;
  onPress(data: CarModel): void;
};

export function Car({ data, onPress }: Props) {
  const netInfo = useNetInfo();
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <S.Container onPress={() => onPress(data)}>
      <S.Details>
        <S.Brand>{data.brand}</S.Brand>
        <S.Name>{data.name}</S.Name>

        <S.About>
          <S.Rent>
            <S.Period>{data.period}</S.Period>
            <S.Price>{`R$ ${
              netInfo.isConnected === true ? data.price : "..."
            }`}</S.Price>
          </S.Rent>

          <S.Type>
            <MotorIcon />
          </S.Type>
        </S.About>
      </S.Details>

      <S.CarImage
        source={{
          uri: data.thumbnail,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </S.Container>
  );
}
