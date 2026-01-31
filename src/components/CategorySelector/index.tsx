import { COLORS } from "@/src/Theme/Colors";
import { BeachSituation } from "@/src/types";
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { styles } from "./styles";


interface Props {
  value: BeachSituation;
  onChange: (value: BeachSituation) => void;
}

export function CategorySelector({ value, onChange }: Props) {
  const translateX = useRef(new Animated.Value(0)).current;

  const BUTTON_WIDTH = 170;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value === "PRÓPRIA" ? 0 : BUTTON_WIDTH,
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
              value === "PRÓPRIA" ? COLORS.BLUE_ENABLE : COLORS.RED_CAUTION,
          },
        ]}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => onChange("PRÓPRIA")}
        activeOpacity={0.8}
        hitSlop={10}
      >
        <Text
          style={[
            styles.text,
            value === "PRÓPRIA" && styles.activeText,
          ]}
        >
          próprias
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onChange("IMPRÓPRIA")}
        activeOpacity={0.8}
        hitSlop={15}
      >
        <Text
          style={[
            styles.text,
            { paddingLeft: 5 },
            value === "IMPRÓPRIA" && styles.activeText,
          ]}
        >
          impróprias
        </Text>
      </TouchableOpacity>
    </View>
  );
}
