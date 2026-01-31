import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.FULL_WHITE,
    borderColor: COLORS.GRAY_BACKGROUND,
    borderWidth: 0.8,
    borderRadius: 18,
    padding: 15,
    marginBottom: 10,
  },

  navigationMapButtonContainer: {
    // width: "40%",
    alignItems: 'flex-start',
    // borderWidth: 1,
    // borderColor: "#fabcdd",
    backgroundColor: COLORS.BLUE_PRIMARY,
    paddingVertical: 6,
    paddingHorizontal: 12,
    // padding: 10,
    borderRadius: 8,
    marginTop: 10
    // position: 'absolute',
    // right: 10,
    // bottom: 10
  },

  navigationButtonText: {
    fontWeight: '600',
    fontSize: 12,
    color: COLORS.FULL_WHITE
  },

  favoriteButtonContainer: {
    position: 'absolute',
    right: 16,
    top: 6,
    // backgroundColor: "black",
    padding: 10,
    zIndex: 9
  },
  praia: {
    color: COLORS.BLUE_PRIMARY,
    fontSize: 14,
    fontFamily: "MontserratBold",
    // fontWeight: "700",
    letterSpacing: 0.5,
    width: "80%"
  },
  complemento: {
    color: COLORS.BLUE_PRIMARY,
    letterSpacing: -0.2,
    fontFamily: "MontserratRegular",
    maxWidth: 250,
    fontSize: 13,
    // fontWeight: "600"
  },
  dataColeta: {
    color: COLORS.BLUE_PRIMARY,
    fontFamily: "MontserratRegular",
    // marginTop: 15,
    fontSize: 13
  }

})