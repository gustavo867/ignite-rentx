import React from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import * as S from "./styles";
import { useState } from "react";
import { useEffect } from "react";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function Input({ iconName, value, ...rest }: Props) {
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    if (value) {
      setIsFilled(true);
    }
  }, []);

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <S.Container isFocused={isFocused}>
      <S.IconBox>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </S.IconBox>
      <S.InputText
        onFocus={() => setIsFocused(true)}
        onBlur={handleInputBlur}
        {...(rest as any)}
      />
    </S.Container>
  );
}
