import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: 300,
    flexDirection: "row",
    backgroundColor: COLORS.FULL_WHITE,
    paddingBottom: 20,
    paddingTop: 20,
    elevation: 2,
    zIndex: 20,
    borderRadius: 50,
    position: 'absolute',
    top: -80
  },
})