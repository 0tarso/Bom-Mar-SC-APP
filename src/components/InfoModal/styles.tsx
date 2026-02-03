import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.FULL_WHITE,
    padding: 15,
    borderRadius: 20,
    elevation: 2,
    marginBottom: 20
  },
  title: {
    fontWeight: "800",
    width: "100%",
    color: COLORS.CARD_TEXT_PRIMARY,
    textAlign: 'left',
    fontSize: 16
  },
  text: {
    fontWeight: "600",
    color: COLORS.CARD_TEXT_PRIMARY,
    textAlign: 'left'
  }
})