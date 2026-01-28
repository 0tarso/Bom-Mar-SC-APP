import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // backgroundColor: "#fff",
    borderRadius: 24,
    padding: 4,
    alignItems: "center",
    // backgroundColor: 'black'
  },

  slider: {
    position: "absolute",
    left: 4,
    height: "100%",
    backgroundColor: "#3B82F6",
    borderRadius: 20,
    zIndex: -10

  },

  button: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_GRAY,
    zIndex: 10
  },

  activeText: {
    color: COLORS.TEXT_WHITE,
  },

})