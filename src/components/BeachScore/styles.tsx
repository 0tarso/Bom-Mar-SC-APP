import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  container: {
    flexDirection: 'column',
    alignItems: "center",
    // columnGap: 20,
    backgroundColor: COLORS.FULL_WHITE,
    padding: 15,
    elevation: 2,
    borderRadius: 15,
    marginBottom: 25,
    width: "30%"
  },
  textValue: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: "MontserratBold",
    color: COLORS.BLUE_PRIMARY,
    textAlign: 'center'

  },
  textLabel: {
    fontSize: 12,
    fontFamily: "MontserratSemiBold",
    color: "#afafaf",
    textAlign: 'center',
    // marginTop: 10
  },
  cardContainerTitle: {
    fontFamily: "MontserratSemiBold",
    fontSize: 20,
    // letterSpacing: 1,
    color: COLORS.BLUE_ENABLE
  },

})