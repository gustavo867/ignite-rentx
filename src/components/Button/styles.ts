import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

type ContainerProps = {
  color?: string;
};

type TitleProps = {
  light?: boolean;
};

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;
  background-color: ${({ theme, color }) => color ?? theme.colors.main};

  padding: 19px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text<TitleProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme, light }) =>
    light ? theme.colors.header : theme.colors.shape};
  font-size: ${RFValue(15)}px;
`;
