import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

import { KeyboardWrapper } from "../../../components/KeyboardWrapper";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

import * as S from "./styles";
import { Alert } from "react-native";

interface Props {}

export function FirstStep({}: Props) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    diverLicense: "",
  });

  const { goBack, navigate } = useNavigation();

  async function handleNextStep() {
    const schema = Yup.object().shape({
      name: Yup.string().required("O nome é obrigatório"),
      email: Yup.string()
        .required("E-mail obrigatório")
        .email("E-mail inválido"),
      diverLicense: Yup.string().required("O CNH é obrigatório"),
    });

    try {
      await schema.validate({ ...userData });
      navigate("SignUpSecondStep", { user: userData });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Erro na validação de campos", error.message);
      } else {
        Alert.alert("Erro", "Ocorreu um erro");
      }
    }
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
          <S.FormTitle>1. Dados</S.FormTitle>
          <Input
            iconName="user"
            placeholder="Nome"
            autoCorrect={false}
            value={userData.name}
            onChangeText={(text) =>
              setUserData((state) => ({ ...state, name: text }))
            }
          />
          <Input
            iconName="mail"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            value={userData.email}
            onChangeText={(text) =>
              setUserData((state) => ({ ...state, email: text }))
            }
          />
          <Input
            iconName="credit-card"
            placeholder="CNH"
            keyboardType="numeric"
            autoCorrect={false}
            autoCapitalize="none"
            value={userData.diverLicense}
            onChangeText={(text) =>
              setUserData((state) => ({ ...state, diverLicense: text }))
            }
          />
        </S.Form>
        <Button
          title="Próximo"
          onPress={handleNextStep}
          enabled={Boolean(
            !!userData.email && !!userData.diverLicense && !!userData.name
          )}
        />
      </S.Container>
    </KeyboardWrapper>
  );
}
