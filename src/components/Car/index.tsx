import React from "react";

import * as S from "./styles";

import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

type Props = {
  data: CarDTO;
  onPress(data: CarDTO): void;
};

export function Car({ data, onPress }: Props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <S.Container onPress={() => onPress(data)}>
      <S.Details>
        <S.Brand>{data.brand}</S.Brand>
        <S.Name>{data.name}</S.Name>

        <S.About>
          <S.Rent>
            <S.Period>{data.period}</S.Period>
            <S.Price>{`R$ ${data.price}`}</S.Price>
          </S.Rent>

          <S.Type>
            <MotorIcon />
          </S.Type>
        </S.About>
      </S.Details>

      <S.CarImage
        source={{
          uri: data.thumbnail,
        }}
        resizeMethod="resize"
        resizeMode="contain"
      />
    </S.Container>
  );
}
