import styled from "styled-components/native";

type ContainerProps = {
  active: boolean;
};

export const Container = styled.View<ContainerProps>`
  width: 6px;
  height: 6px;
  border-radius: 3px;

  background-color: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.shape};
  margin-left: 8px;
`;

export const Title = styled.Text``;
