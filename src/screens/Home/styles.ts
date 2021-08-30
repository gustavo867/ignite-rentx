import { FlatList } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { CarDTO } from "../../dtos/CarDTO";

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

export const CarList = styled(FlatList as new () => FlatList<CarDTO>).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
})``;

export const LoadContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const MyCarsButton = styled(RectButton)`
  width: 60px;
  height: 60px;
  border-radius: 30px;

  align-items: center;
  justify-content: center;

  position: absolute;
  right: 22px;
  bottom: 13px;

  background-color: ${({ theme }) => theme.colors.main};
`;
