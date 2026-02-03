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
    marginBottom: 20
  },
  cardContainerTitle: {
    fontFamily: "MontserratSemiBold",
    fontSize: 20,
    // letterSpacing: 1,
    color: COLORS.BLUE_ENABLE
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
    justifyContent: 'space-between',
    // marginTop: 20,
    marginBottom: 20,
    // backgroundColor: 'red',
    padding: 5
  },
  card: {
    width: "30%",
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
    fontSize: 18,
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
  table: {
    padding: 5,
    backgroundColor: COLORS.FULL_WHITE,
    marginTop: 10,
    marginBottom: 10,
    // borderBottomWidth: 2,
    // borderColor: '#d0d0d0',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2
  },

  row: {
    flexDirection: 'row',
  },
  header: {
    width: "25%",
    textAlign: 'center',
    paddingTop: 10,
    fontFamily: "MontserratSemiBold",
    color: COLORS.TEXT_GRAY
  },
  cell: {
    flex: 1,
    paddingVertical: 10,
    // paddingHorizontal: -4,
    borderBottomWidth: 0.2,
    borderColor: '#d0d0d0',
    textAlign: 'center',
    fontSize: 14,
    // justifyContent: 'center',
    alignItems: "center",
    alignSelf: "center",
    fontFamily: 'MontserratSemiBold',
    color: COLORS.BLUE_PRIMARY
  },
  sideHeader: {
    // backgroundColor: COLORS.BLUE_DISABLE,
    // fontWeight: '600',
    fontFamily: "MontserratBold",
    color: COLORS.BLUE_PRIMARY,
    textAlign: 'center',

    fontSize: 12,
    paddingHorizontal: 0,
    borderBottomWidth: 0
  },
})