import { SessionContext, SessionProvider } from "@/context/SessionContext";
import { useFonts } from "expo-font";
import { router, Slot, SplashScreen } from "expo-router";
import React, { useContext, useEffect } from "react";
import { setStatusBarStyle } from "expo-status-bar";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    BubbleGum: require("@/assets/fonts/Bubblegum.ttf"),
  });

  const sessionContext = useContext(SessionContext);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    setTimeout(() => {
      colorScheme === "light"
        ? setStatusBarStyle("dark")
        : setStatusBarStyle("light");
    }, 0);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    setTimeout(() => {
      if (!sessionContext?.user) {
        router.push("/(auth)/login");
      } else {
        router.push("/(tabs)/Home");
      }
    }, 5000);
  }, [loaded]);
  return (
    <SessionProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Slot />
      </ThemeProvider>
    </SessionProvider>
  );
}
