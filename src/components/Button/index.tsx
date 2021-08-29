import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import * as S from "./styles";

interface Props extends RectButtonProps {
  onPress?: () => void;
  color?: string;
  title: string;
}

export function Button({ onPress, color, title, ...rest }: Props) {
  return (
    <S.Container onPress={onPress} color={color} {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}
