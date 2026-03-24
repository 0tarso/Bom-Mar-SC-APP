import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    zIndex: 20,
    // top: height - 100,
    left: 12
  },
  button: {
    columnGap: 5,
    flexDirection: "row",
    alignItems: 'center',
    elevation: 3,
    padding: 8,
    borderRadius: 8,
    backgroundColor: COLORS.RED_CAUTION
  },
  complemento: {
    fontFamily: "MontserratSemiBold",
    color: "#afafaf",
  },
  title: {
    fontFamily: "MontserratBold",
    fontSize: 20,
    // letterSpacing: 1,
    color: COLORS.BLUE_ENABLE
  },
  alertPeriod: {
    textAlign: 'center',
    fontFamily: 'MontserratSemiBold',
    fontSize: 14,
    color: COLORS.TEXT_GRAY
  },
  alertDate: {

    fontSize: 16,
    fontFamily: "MontserratBold",
    color: COLORS.BLUE_ENABLE
  },
  infoContainer: {
    // borderColor: COLORS.BLUE_PRIMARY,
    // borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 10,
    borderRadius: 20,
    elevation: 2,
    marginTop: 20,
    backgroundColor: '#fff'
  }



})