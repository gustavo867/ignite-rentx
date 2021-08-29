import React from "react";
import { Feather } from "@expo/vector-icons";
import {
  Calendar as CustomCalendar,
  LocaleConfig,
} from "react-native-calendars";
import {
  dayNames,
  dayNamesShort,
  monthNames,
  monthNamesShort,
} from "./locales";
import { useTheme } from "styled-components";

interface Props {}

LocaleConfig.locales["pt-Br"] = {
  monthNames: monthNames,
  monthNamesShort: monthNamesShort,
  dayNames: dayNames,
  dayNamesShort: dayNamesShort,
  today: "Hoje",
};
LocaleConfig.defaultLocale = "pt-Br";

export function Calendar({}: Props) {
  const theme = useTheme();

  return (
    <CustomCalendar
      renderArrow={(direction) => (
        <Feather
          name={`chevron-${direction}`}
          color={theme.colors.text}
          size={24}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontSize: 20,
        textMonthFontFamily: theme.fonts.secondary_500,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      minDate={new Date()}
    />
  );
}
