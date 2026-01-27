import { COLORS } from "@/src/Theme/Colors";
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

type Category = "proprias" | "improprias";

interface Props {
  value: Category;
  onChange: (value: Category) => void;
}

export function CategorySelector({ value, onChange }: Props) {
  const translateX = useRef(new Animated.Value(0)).current;

  const BUTTON_WIDTH = 170;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value === "proprias" ? 0 : BUTTON_WIDTH,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [value]);

  return (
    <View style={styles.container}>
      {/* Slider */}
      <Animated.View
        style={[
          styles.slider,
          {
            width: BUTTON_WIDTH,
            transform: [{ translateX }],
            backgroundColor:
              value === "proprias" ? COLORS.BLUE_ENABLE : COLORS.RED_CAUTION,
          },
        ]}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => onChange("proprias")}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.text,
            value === "proprias" && styles.activeText,
          ]}
        >
          próprias
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onChange("improprias")}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.text,
            value === "improprias" && styles.activeText,
          ]}
        >
          impróprias
        </Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // backgroundColor: "#fff",
    borderRadius: 24,
    padding: 4,
    alignItems: "center",
  },

  slider: {
    position: "absolute",
    left: 4,
    height: "100%",
    backgroundColor: "#3B82F6",
    borderRadius: 20,
    elevation: 5,
    zIndex: -10

  },

  button: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_GRAY,
    zIndex: 10
  },

  activeText: {
    color: COLORS.TEXT_WHITE,
  },
});