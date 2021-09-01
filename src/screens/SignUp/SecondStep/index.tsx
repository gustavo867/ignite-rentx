import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import { useTheme } from "styled-components";

import { KeyboardWrapper } from "../../../components/KeyboardWrapper";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/PasswordInput";

import * as S from "./styles";

import { api } from "../../../services/api";

interface RouteProps {
  user: { name: string; email: string; driverLicense: string };
}

export function SecondStep() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const theme = useTheme();
  const route = useRoute();

  const { user } = route.params as RouteProps;

  const { goBack, navigate } = useNavigation();

  async function handleRegister() {
    if (!password || !confirmPassword) {
      return Alert.alert("Informe a senha e a confirmação.");
    }

    if (password !== confirmPassword) {
      return Alert.alert("As senhas não sao iguais.");
    }

    await api
      .post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password: password,
      })
      .then((res) => {
        navigate("Success", {
          title: "Conta criada!",
          subTitle: "Agora é so fazer login\ne aproveitar.",
          nextScreen: "SignIn",
        });
      })
      .catch(() => {
        Alert.alert("Opa", "Não foi possível cadastrar");
      });
  }

  return (
    <KeyboardWrapper>
      <S.Container>
        <S.Header>
          <BackButton onPress={() => goBack()} />
          <S.Steps>
            <Bullet active={true} />
            <Bullet active={false} />
          </S.Steps>
        </S.Header>
        <S.Title>Crie sua{"\n"}conta</S.Title>
        <S.SubTitle>Faça seu cadastro de{"\n"}forma rápida e fácil.</S.SubTitle>

        <S.Form>
          <S.FormTitle>02. Senha</S.FormTitle>
          <PasswordInput
            iconName="lock"
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setPassword}
            value={password}
          />
          <PasswordInput
            iconName="lock"
            placeholder="Repetir senha"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
        </S.Form>
        <Button
          title="Cadastrar"
          color={theme.colors.success}
          onPress={handleRegister}
        />
      </S.Container>
    </KeyboardWrapper>
  );
}
