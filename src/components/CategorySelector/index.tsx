//React ================================================
import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";


//Styles ================================================
import { COLORS } from "@/src/Theme/Colors";
import { styles } from "./styles";

//Types ================================================
import { BeachSituation } from "@/src/types";


interface Props {
  value: BeachSituation;
  onChange: (value: BeachSituation) => void;
}

export function CategorySelector({ value, onChange }: Props) {
  const translateX = useRef(new Animated.Value(0)).current;

  const [containerWidth, setContainerWidth] = useState(0);

  const buttonWidth = containerWidth / 2;

  useEffect(() => {
    if (!containerWidth) return;

    Animated.timing(translateX, {
      toValue: value === "PRÓPRIA" ? 0 : buttonWidth,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [value, containerWidth]);

  return (
    <View
      style={styles.container}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      {/* Slider */}
      <Animated.View
        style={[
          styles.slider,
          {
            width: buttonWidth,
            transform: [{ translateX }],
            backgroundColor:
              value === "PRÓPRIA"
                ? COLORS.BLUE_ENABLE
                : COLORS.RED_CAUTION,
          },
        ]}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => onChange("PRÓPRIA")}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.text,
            value === "PRÓPRIA" && styles.activeText,
          ]}
        >próprias</Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onChange("IMPRÓPRIA")}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.text,
            value === "IMPRÓPRIA" && styles.activeText,
          ]}
        >impróprias</Text>
      </TouchableOpacity>
    </View>
  );
}
