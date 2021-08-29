import { FlatList } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

type Car = {
  brand: string;
  name: string;
  rent: {
    price: string;
    period: string;
  };
  thumbnail: string;
};

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled(SafeAreaView)`
  width: 100%;
  height: 113px;

  justify-content: space-between;
  padding-horizontal: 24px;
  flex-direction: row;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.header};
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.shape};
`;

export const CarList = styled(FlatList as new () => FlatList<number>).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
})``;
