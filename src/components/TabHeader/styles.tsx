import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    paddingTop: 60,
    backgroundColor: COLORS.BLUE_PRIMARY,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
    // elevation: 3
  },
  text: {
    color: COLORS.FULL_WHITE,
    // fontWeight: "700",
    fontSize: 16,
    fontFamily: "MontserratSemiBold"
  }


})