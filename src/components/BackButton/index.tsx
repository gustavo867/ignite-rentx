import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import * as S from "./styles";
import { BorderlessButtonProps } from "react-native-gesture-handler";

interface Props extends BorderlessButtonProps {
  color?: string;
}

export function BackButton({ color, ...rest }: Props) {
  const theme = useTheme();

  return (
    <S.Container {...rest}>
      <MaterialIcons
        size={24}
        name="chevron-left"
        color={color ?? theme.colors.text}
      />
    </S.Container>
  );
}
