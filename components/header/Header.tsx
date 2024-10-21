import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import IoniconsGlyphs from "@expo/vector-icons/build/Ionicons";

type props = {
  leftIconName?: string;
  handleLeftBtnPress?: () => void;
  centerText?: string;
  rightIconName?: keyof typeof IoniconsGlyphs;
  handleRightBtnPress?: () => void;
};

const Header = ({
  leftIconName,
  centerText,
  rightIconName,
  handleRightBtnPress,
  handleLeftBtnPress,
}: props) => {
  return (
    <View style={{ width: "100%", paddingHorizontal: 10, display: "flex", flexDirection: "row" }}>
  {leftIconName && (
    <Pressable
      style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
      onPress={handleLeftBtnPress}
    >
      <Ionicons
        name={(leftIconName as keyof typeof Ionicons.glyphMap) ?? undefined}
        color={"#141414"}
        size={18}
      />
    </Pressable>
  )}
  {centerText && (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text style={{ fontSize: 22, fontFamily: "SpaceMono", color: "white" }}>
        {centerText}
      </Text>
    </View>
  )}
  {rightIconName && (
    <Pressable
      onPress={handleRightBtnPress}
      style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
    >
      <Ionicons
        name={(rightIconName as keyof typeof Ionicons.glyphMap) ?? undefined}
        color={"#141414"}
        size={18}
      />
    </Pressable>
  )}
</View>

  );
};

export default Header;
