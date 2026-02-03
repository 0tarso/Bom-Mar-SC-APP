import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    // borderColor: 'red'
  },
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#f9f9f9",
    // padding: 20,
    // paddingTop: 50,
    // elevation: 5,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
  },
  title: {
    fontFamily: "MontserratBold",
    fontSize: 22,
    color: COLORS.FULL_WHITE,
    // fontWeight: "600",
    // marginBottom: 12,
    textAlign: "left",
    width: "90%",
    paddingHorizontal: 20
  },
  content: {
    // marginBottom: 10,
    // borderWidth: 3,
    // borderColor: 'red',
    position: "relative",
    // padding: 20
  },
  buttonArea: {
    // backgroundColor: "red",
    // position: 'absolute',
    // bottom: 0,
    // width: "100%",
    // alignSelf: 'center',
  },
  button: {
    backgroundColor: COLORS.BLUE_ENABLE,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
