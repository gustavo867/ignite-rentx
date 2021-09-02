import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { Alert } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";

import { BackButton } from "../../components/BackButton";
import { Input } from "../../components/Input";
import { KeyboardWrapper } from "../../components/KeyboardWrapper";
import { Button } from "../../components/Button";
import { PasswordInput } from "../../components/PasswordInput";

import { useAuth } from "../../hooks/auth";

import * as S from "./styles";
import { useNetInfo } from "@react-native-community/netinfo";

export function Profile() {
  const theme = useTheme();
  const netInfo = useNetInfo();
  const { user, signOut, updateUser } = useAuth();
  const [avatar, setAvatar] = useState(user.avatar ?? "");
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    driverLicense: user.driver_license,
  });
  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");
  const { goBack, navigate } = useNavigation();

  function handleOptionChange(optionSelected: typeof option) {
    if (netInfo.isConnected === true) {
      setOption(optionSelected);

      return;
    }

    if (optionSelected === "passwordEdit") {
      setOption("dataEdit");

      Alert.alert(
        "Você está offline",
        "Para mudar a senha, conecte-se a internet"
      );

      return;
    } else {
      setOption(optionSelected);
    }
  }

  function handleSignOut() {
    Alert.alert(
      "Tem certeza",
      "Se você sair, irá precisar de internet para conectar-se novamente",
      [
        {
          text: "Cancelar",
        },
        {
          text: "Sair",
          onPress: () => signOut(),
        },
      ]
    );
  }

  async function handleProfileUpdate() {
    if (option === "dataEdit") {
      const schema = Yup.object().shape({
        name: Yup.string().required("O nome é obrigatório"),
        driverLicense: Yup.string().required("O CNH é obrigatório"),
      });

      try {
        await schema.validate(userData);

        await updateUser({
          ...user,
          ...userData,
          avatar,
        });

        navigate("Success", {
          title: "Feito",
          subTitle: "Suas informações foram atualizadas",
          nextScreen: "Profile",
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          Alert.alert("Erro na validação de campos", error.message);
        } else {
          Alert.alert("Não foi possível atualizar o perfil");
        }
      }
    }
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled === false) {
      setAvatar(result.uri);
    }
  }

  return (
    <KeyboardWrapper>
      <S.Container>
        <S.Header>
          <S.HeaderTop>
            <BackButton color={theme.colors.shape} onPress={() => goBack()} />
            <S.HeaderTitle>Editar perfil</S.HeaderTitle>
            <S.LogOutButton onPress={handleSignOut}>
              <Feather name="power" size={24} color={theme.colors.shape} />
            </S.LogOutButton>
          </S.HeaderTop>

          <S.PhotoContainer>
            {!!avatar && (
              <S.Photo
                source={{
                  uri: avatar,
                }}
              />
            )}
            <S.PhotoButton onPress={handleAvatarSelect}>
              <Feather name="camera" size={24} color={theme.colors.shape} />
            </S.PhotoButton>
          </S.PhotoContainer>
        </S.Header>

        <S.Content>
          <S.Options>
            <S.Option
              onPress={() => handleOptionChange("dataEdit")}
              active={option === "dataEdit"}
            >
              <S.OptionTitle active={option === "dataEdit"}>
                Dados
              </S.OptionTitle>
            </S.Option>
            <S.Option
              onPress={() => handleOptionChange("passwordEdit")}
              active={option === "passwordEdit"}
            >
              <S.OptionTitle active={option === "passwordEdit"}>
                Trocar senha
              </S.OptionTitle>
            </S.Option>
          </S.Options>

          {option === "dataEdit" ? (
            <S.Section>
              <Input
                iconName="user"
                placeholder="Nome"
                autoCorrect={false}
                onChangeText={(text) =>
                  setUserData((state) => ({ ...state, name: text }))
                }
                value={userData.name}
                defaultValue={user.name}
              />
              <Input
                iconName="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                editable={false}
                value={userData.email}
                onChangeText={(text) =>
                  setUserData((state) => ({ ...state, email: text }))
                }
                defaultValue={user.email}
              />
              <Input
                iconName="credit-card"
                placeholder="CNH"
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
                value={userData.driverLicense}
                onChangeText={(text) =>
                  setUserData((state) => ({ ...state, driverLicense: text }))
                }
                defaultValue={user.driver_license}
              />
            </S.Section>
          ) : (
            <S.Section>
              <PasswordInput iconName="lock" placeholder="Senha atual" />
              <PasswordInput iconName="lock" placeholder="Nova senha" />
              <PasswordInput iconName="lock" placeholder="Repetir senha" />
            </S.Section>
          )}

          <Button title="Salvar alterações" onPress={handleProfileUpdate} />
        </S.Content>
      </S.Container>
    </KeyboardWrapper>
  );
}
