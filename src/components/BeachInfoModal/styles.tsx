import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  praia: {
    fontFamily: "MontserratBold",
    fontSize: 20,
    color: COLORS.BLUE_PRIMARY
  },
  distancia: {
    fontFamily: "MontserratSemiBold",
    color: COLORS.BLUE_ENABLE,
    fontSize: 16
  },
  complemento: {
    fontFamily: "MontserratSemiBold",
    color: "#afafaf",
  },
  cardContainerTitle: {
    marginTop: 20,
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    letterSpacing: 1,
    color: COLORS.BLUE_ENABLE
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
    // backgroundColor: 'red'
  },
  card: {
    width: "48%",
    // borderWidth: 1,
    backgroundColor: "#ffff",
    elevation: 2,
    borderRadius: 10,
    borderColor: COLORS.BLUE_DISABLE,
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 20,
  },
  textValue: {
    marginTop: 10,
    fontSize: 24,
    fontFamily: "MontserratBold",
    color: COLORS.BLUE_PRIMARY,
    textAlign: 'center'

  },
  textLabel: {
    fontSize: 12,
    fontFamily: "MontserratSemiBold",
    color: "#afafaf",
    textAlign: 'center',
    marginTop: -5
  },
})