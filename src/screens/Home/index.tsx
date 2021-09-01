import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";

import { Car } from "../../components/Car";
import { Load } from "../../components/Load";

import * as S from "./styles";

import Logo from "../../assets/logo.svg";

export function Home() {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CarDTO[]>([]);

  useEffect(() => {
    let mounted = true;

    async function fetchCars() {
      try {
        const response = await api.get("cars");

        if (mounted) {
          setData(response.data);
          setLoading(false);
        }
      } catch (e) {
        console.log("Error", e.request);
      }
    }

    fetchCars();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, []);

  function handleCarDetails(data: CarDTO) {
    navigate("CarDetails", { data });
  }

  return (
    <S.Container>
      <S.Header>
        <Logo width={RFValue(108)} height={RFValue(12)} />
        <S.TotalCars>Total de {data.length} carros</S.TotalCars>
      </S.Header>
      {loading ? (
        <S.LoadContainer>
          <Load />
        </S.LoadContainer>
      ) : (
        <>
          <S.CarList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <Car data={item} onPress={handleCarDetails} />
            )}
          />
        </>
      )}
    </S.Container>
  );
}
