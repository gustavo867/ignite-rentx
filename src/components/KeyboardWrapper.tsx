import React from "react";
import { ReactNode } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

interface Props {
  children: ReactNode;
}

export function KeyboardWrapper({ children }: Props) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior="position" enabled>
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
