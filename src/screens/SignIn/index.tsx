import React, { useState } from "react";
import { Alert, Keyboard } from "react-native";
import * as Yup from "yup";
import { useTheme } from "styled-components";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";

import * as S from "./styles";
import { useNavigation } from "@react-navigation/native";
import { KeyboardWrapper } from "../../components/KeyboardWrapper";
import { useAuth } from "../../hooks/auth";

export function SignIn() {
  const theme = useTheme();
  const { signIn } = useAuth();
  const { navigate } = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    const schema = Yup.object().shape({
      email: Yup.string()
        .required("E-mail obrigatório")
        .email("Digite um e-mail válido"),
      password: Yup.string().required("A Senha é obrigatória"),
    });

    try {
      await schema.validate({ email, password });

      signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Erro na validação de campos", error.message);
      } else {
        Alert.alert(
          "Erro na autenticação",
          "Ocorreu um erro ao fazer login, verifique as credencias"
        );
      }
    }
  }

  function handleCloseKeyboard() {
    Keyboard.dismiss();
  }

  function handleNewAccount() {
    navigate("SignUpFirstStep");
  }

  return (
    <KeyboardWrapper>
      <S.Container>
        <S.Header>
          <S.Title>Estamos{"\n"}quase lá.</S.Title>
          <S.SubTitle>
            Faça seu login para começar{"\n"}uma experiência incrível.
          </S.SubTitle>
        </S.Header>

        <S.Form>
          <Input
            iconName="mail"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />
          <PasswordInput
            iconName="lock"
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setPassword}
            value={password}
          />
        </S.Form>

        <S.Footer>
          <Button
            title="Login"
            onPress={handleSignIn}
            enabled={!!password && !!email}
          />
          <Button
            title="Criar conta gratuita"
            onPress={handleNewAccount}
            color={theme.colors.background_secondary}
            light
            style={{
              marginTop: 8,
            }}
          />
        </S.Footer>
      </S.Container>
    </KeyboardWrapper>
  );
}
