import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Splash } from "../screens/Splash";

import { useAuth } from "../hooks/auth";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { Success } from "../screens/Success";

const { Navigator, Screen } = createStackNavigator();

export function Routes() {
  const { user } = useAuth();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {Boolean(user?.id) ? (
        <>
          <Screen name="Splash" component={Splash} />
          <Screen name="App" component={AppRoutes} />
        </>
      ) : (
        <Screen name="Auth" component={AuthRoutes} />
      )}
      <Screen
        name="Success"
        component={Success}
        initialParams={{
          title: "Successo",
          subTitle: "",
          nextScreen: "Home",
        }}
      />
    </Navigator>
  );
}
