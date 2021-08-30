import React from "react";

import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

interface Props {
  size?: "large" | "small";
  color?: string;
}

export function Load({ size = "large", color }: Props) {
  const theme = useTheme();

  return <ActivityIndicator size={size} color={color ?? theme.colors.main} />;
}
