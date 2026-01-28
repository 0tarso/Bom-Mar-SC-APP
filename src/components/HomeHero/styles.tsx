import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.FULL_WHITE,
    position: 'absolute',
    zIndex: 20,
    bottom: 10,
    left: 20,
    padding: 20,
    borderTopRightRadius: 30,
    borderRadius: 10,
    elevation: 10
  },
  text: {
    fontSize: 16,
    color: COLORS.BLUE_PRIMARY
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.BLUE_PRIMARY,
    letterSpacing: 1.5
  },

  imageContainer: {
    position: 'absolute',
    right: 10,
    top: -30,
    width: 80,
    height: "auto",
    zIndex: 20
  },
  image: {
    aspectRatio: 1,
    width: '100%',
    height: "100%",
    resizeMode: 'contain'
  }



})