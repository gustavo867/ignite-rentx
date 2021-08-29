import React from "react";

import GasolineSvg from "../../assets/gasoline.svg";
import * as S from "./styles";

type CarData = {
  brand: string;
  name: string;
  rent: {
    price: string;
    period: string;
  };
  thumbnail: string;
};

type Props = {
  data: CarData;
  onPress: () => void;
};

export function Car({ data, onPress }: Props) {
  return (
    <S.Container onPress={onPress}>
      <S.Details>
        <S.Brand>{data.brand}</S.Brand>
        <S.Name>{data.name}</S.Name>

        <S.About>
          <S.Rent>
            <S.Period>{data.rent.period}</S.Period>
            <S.Price>{`R$ ${data.rent.price}`}</S.Price>
          </S.Rent>

          <S.Type>
            <GasolineSvg />
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
