import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import LottieView from 'lottie-react-native'

import { NavigationRoute, ParamListBase } from "@react-navigation/native";
import { COLORS } from "@/src/Theme/Colors"
import praia_icon from "@/assets/animations/praias_icon.json"
import favorites_icon from "@/assets/animations/favorites_icon.json"

interface TabItemProps {
  state: BottomTabBarProps["state"];
  descriptors: BottomTabBarProps["descriptors"];
  navigation: BottomTabBarProps["navigation"];
  route: NavigationRoute<ParamListBase, string>;
  index: number;
}


export default function TabItem({ state, descriptors, navigation, route, index }: TabItemProps) {
  const { options } = descriptors[route.key];
  const label = options.tabBarLabel ?? options.title ?? route.name;

  const lottieIcon = {
    home: praia_icon,
    favorites: favorites_icon,
  }[route.name];

  const isFocused = state.index === index;

  const scale = useRef(new Animated.Value(isFocused ? 1.2 : 1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: isFocused ? 1.2 : 1,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  const onPress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      onPress={onPress}
      style={styles.tab}
      activeOpacity={0.8}
    >



      <Animated.View style={
        { alignItems: "center", transform: [{ scale }] }}>
        <LottieView
          source={lottieIcon}
          autoPlay={isFocused}
          loop={false}
          speed={0.7}
          style={[
            { width: 50, height: 50, aspectRatio: 1 },
            isFocused ? { opacity: 1 } : { opacity: 0.5 }
          ]}
        />

        <Text
          style={{
            color: (isFocused) ? COLORS.BLUE_ENABLE : COLORS.BLUE_DISABLE,
            fontSize: 12,
            fontWeight: (isFocused) ? "800" : "400"
          }}
        >
          {label as string}
        </Text>
      </Animated.View>



    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
  },

})