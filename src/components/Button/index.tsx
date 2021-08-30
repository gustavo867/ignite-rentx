import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { Load } from "../Load";

import * as S from "./styles";

interface Props extends RectButtonProps {
  onPress?: () => void;
  color?: string;
  title: string;
  enabled?: boolean;
  loading?: boolean;
}

export function Button({
  onPress,
  color,
  title,
  enabled = true,
  loading = false,
  ...rest
}: Props) {
  const theme = useTheme();

  return (
    <S.Container
      style={{
        opacity: enabled === false || loading === true ? 0.5 : 1,
      }}
      onPress={onPress}
      color={color}
      {...rest}
    >
      {loading ? (
        <Load size="small" color={theme.colors.shape} />
      ) : (
        <S.Title>{title}</S.Title>
      )}
    </S.Container>
  );
}
