import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  infoButton: {
    position: 'absolute',
    zIndex: 50,
    right: 20,
    bottom: 0,
    padding: 5,
    elevation: 12,
    backgroundColor: "#fafafa",
    borderRadius: 50
  },
  container: {
    backgroundColor: COLORS.BLUE_PRIMARY,
    position: 'absolute',
    zIndex: 20,
    overflow: 'hidden',
    // top: 0,
    width: "100%",
    height: 130,
    // left: 20,
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
    // borderTopRightRadius: 30,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    elevation: 10
  },
  text: {
    fontSize: 16,
    color: COLORS.FULL_WHITE,
    zIndex: 50,
    fontFamily: "MontserratSemiBold"
  },
  title: {
    fontSize: 26,
    // fontWeight: "800",
    color: COLORS.FULL_WHITE,
    letterSpacing: 1.5,
    zIndex: 50,
    fontFamily: "MontserratBold"

  },



})