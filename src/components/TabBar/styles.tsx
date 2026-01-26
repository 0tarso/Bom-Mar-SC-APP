import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLORS.FULL_WHITE,
    paddingBottom: 60,
    paddingTop: 20,
    elevation: 40,
    zIndex: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
})