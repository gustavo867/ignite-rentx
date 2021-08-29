import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

type ContainerProps = {
  color?: string;
};

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;
  background-color: ${({ theme, color }) => color ?? theme.colors.main};

  padding: 19px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(15)}px;
`;
