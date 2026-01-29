import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.FULL_WHITE,
    borderColor: COLORS.BLUE_PRIMARY,
    borderWidth: 1.5,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,

  },

  buttonContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    // backgroundColor: "black",
    padding: 10,
    zIndex: 9
  },
  praia: {
    color: COLORS.BLUE_PRIMARY,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1
  },
  complemento: {
    color: COLORS.BLUE_PRIMARY,
    letterSpacing: -0.2,
    maxWidth: 250,
    fontSize: 12,
    fontWeight: "600"
  },
  dataColeta: {
    color: COLORS.BLUE_PRIMARY,
    fontWeight: "700",
    marginTop: 10
  }

})