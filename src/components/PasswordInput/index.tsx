import React from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import * as S from "./styles";
import { useState } from "react";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const theme = useTheme();

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
        secureTextEntry={isPasswordVisible}
        autoCapitalize="none"
        autoCorrect={false}
        {...(rest as any)}
      />
      <S.ChangePasswordVisibilityButton
        onPress={() => setIsPasswordVisible((state) => !state)}
      >
        <Feather
          name={isPasswordVisible ? "eye" : "eye-off"}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </S.ChangePasswordVisibilityButton>
    </S.Container>
  );
}
