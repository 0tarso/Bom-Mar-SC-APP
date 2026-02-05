//React ================================================
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from 'lottie-react-native'
import { NavigationRoute, ParamListBase } from "@react-navigation/native";


//Styles ================================================
import { COLORS } from "@/src/Theme/Colors"

//Assets ================================================
import praia_icon from "@/assets/animations/praias_icon.json"
import favorites_icon from "@/assets/animations/favorites_icon.json"
import map_icon from "@/assets/animations/map_icon.json"


interface TabItemProps {
  state: BottomTabBarProps["state"];
  descriptors: BottomTabBarProps["descriptors"];
  navigation: BottomTabBarProps["navigation"];
  route: NavigationRoute<ParamListBase, string>;
  index: number;
}


export default function TabItem({
  state,
  descriptors,
  navigation,
  route,
  index,
}: TabItemProps) {
  const { options } = descriptors[route.key];
  const label = options.tabBarLabel ?? options.title ?? route.name;

  const lottieIcon = {
    home: praia_icon,
    favorites: favorites_icon,
    map: map_icon
  }[route.name];

  const isFocused = state.index === index;

  const scale = useRef(new Animated.Value(isFocused ? 1.2 : 1)).current;
  const labelOpacity = useRef(new Animated.Value(0)).current;
  const labelHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: isFocused ? 1.2 : 1,
      useNativeDriver: true,
    }).start();

    if (isFocused) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(labelOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(labelHeight, {
            toValue: 16,
            duration: 200,
            useNativeDriver: false,
          }),
        ]),
        Animated.delay(1200),
        Animated.parallel([
          Animated.timing(labelOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(labelHeight, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]),
      ]).start();
    } else {
      labelOpacity.setValue(0);
      labelHeight.setValue(0);
    }
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
      hitSlop={15}
    >
      <Animated.View
        style={{
          alignItems: "center",
          transform: [{ scale }],
        }}
      >
        <LottieView
          source={lottieIcon}
          autoPlay={isFocused}
          loop={isFocused ? true : false}
          speed={0.7}
          style={[
            { width: 60, height: 60 },
            route.name === 'map' && { transform: [{ scale: 2.5 }] },
            isFocused ? { opacity: 1 } : { opacity: 0.4 },
          ]}
        />

        <Animated.View
          style={{
            height: labelHeight,
            overflow: "hidden",
          }}
        >
          <Animated.Text
            style={{
              opacity: labelOpacity,
              color: isFocused
                ? COLORS.BLUE_ENABLE
                : COLORS.BLUE_DISABLE,
              fontSize: 12,
              fontWeight: isFocused ? "800" : "400",
            }}
          >
            {label as string}
          </Animated.Text>
        </Animated.View>
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