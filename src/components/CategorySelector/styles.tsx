import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // container: {
  //   flexDirection: "row",
  //   // backgroundColor: "#fff",
  //   borderRadius: 24,
  //   padding: 4,
  //   alignItems: "center",
  //   // backgroundColor: 'black'
  // },

  // slider: {
  //   position: "absolute",
  //   left: 5,
  //   height: "100%",
  //   backgroundColor: "#3B82F6",
  //   borderRadius: 20,
  //   // zIndex: -10

  // },

  // button: {
  //   flex: 1,
  //   paddingVertical: 10,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   zIndex: 10,
  // },

  text: {
    fontSize: 14,
    // fontWeight: "600",
    fontFamily: "MontserratSemiBold",
    color: COLORS.TEXT_GRAY,
    zIndex: 10
  },

  activeText: {
    color: COLORS.TEXT_WHITE,
  },
  container: {
    flexDirection: "row",
    borderRadius: 999,
    overflow: "hidden",
  },

  button: {
    // flex: 1,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },

  slider: {
    position: "absolute",
    height: "100%",
    borderRadius: 50,
  },

})