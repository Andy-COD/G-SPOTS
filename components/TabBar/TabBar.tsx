import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const TabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View
      style={{
        width: "100%",
        position: "absolute",
        bottom: 40,
        backgroundColor: "green",
        padding: 18,
        alignItems: "center",
        justifyContent: "center",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ justifyContent: "center", alignItems: "center" }}
              key={index}
            >
              <FontAwesome
                name={
                  route.name === "Home"
                    ? "home"
                    : route.name == "Categories"
                    ? "cubes"
                    : route.name === "Favourites"
                    ? "bookmark"
                    : route.name === "Profile"
                    ? "cog"
                    : undefined
                }
                size={20}
                color={isFocused ? "#fff" : "#ccc"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
