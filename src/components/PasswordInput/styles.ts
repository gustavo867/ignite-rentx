import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

type ContainerProps = {
  isFocused: boolean;
};

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 55px;

  flex-direction: row;
  align-items: center;

  margin-bottom: 6px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-color: ${theme.colors.main};
      border-bottom-width: 2px;
    `}

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const IconBox = styled.View`
  width: 56px;
  height: 55px;

  align-items: center;
  justify-content: center;

  margin-right: 2px;

  border-right-color: ${({ theme }) => theme.colors.line};
  border-right-width: 2px;
`;

export const InputText = styled.TextInput`
  flex: 1;

  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  padding: 0 23px;
`;

export const ChangePasswordVisibilityButton = styled(BorderlessButton)`
  margin-right: 11px;
`;
