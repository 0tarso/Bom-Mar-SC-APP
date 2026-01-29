import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  infoButton: {
    position: 'absolute',
    zIndex: 50,
    right: 16,
    top: 10,
    padding: 5,
    // elevation: 2,
    backgroundColor: "#fafafa",
    borderRadius: 50
  },
  container: {
    backgroundColor: COLORS.FULL_WHITE,
    position: 'absolute',
    zIndex: 20,
    // top: 0,
    width: "100%",
    // left: 20,
    padding: 20,
    paddingTop: 0,
    paddingBottom: 30,
    // borderTopRightRadius: 30,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    // elevation: 10
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