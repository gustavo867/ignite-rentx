import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Splash } from "../screens/Splash";
import { SignIn } from "../screens/SignIn";
import { FirstStep } from "../screens/SignUp/FirstStep";
import { SecondStep } from "../screens/SignUp/SecondStep";
import { Success } from "../screens/Success";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={FirstStep} />
      <Screen name="SignUpSecondStep" component={SecondStep} />
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
