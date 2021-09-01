import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, BackHandler } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNetInfo } from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../../databases";
import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";

import { Car } from "../../components/Car";
import { Load } from "../../components/Load";

import * as S from "./styles";

import Logo from "../../assets/logo.svg";
import { Car as CarModel } from "../../databases/models/car";

export function Home() {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);
  const netInfo = useNetInfo();
  const [data, setData] = useState<CarModel[]>([]);

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );
        const { changes, latestVersion } = response.data;

        return {
          changes,
          timestamp: latestVersion,
        };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.user;

        await api.post("users/sync", user);
      },
    });
  }

  useEffect(() => {
    let mounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<CarModel>("cars");
        const cars = await carCollection.query().fetch();

        if (mounted) {
          setData(cars);
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
    if (!netInfo.isConnected) {
      // Alert.alert("Você está offline");
    } else {
      offlineSynchronize();

      // Alert.alert("Você está online");
    }
  }, [netInfo.isConnected]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, []);

  function handleCarDetails(data: CarModel) {
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
