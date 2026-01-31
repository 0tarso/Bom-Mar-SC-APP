import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'black',
  },
  stText: {
    color: COLORS.BLUE_ENABLE,
    fontSize: 20,
    letterSpacing: 3,
    // textAlign: 'left'
  },
  ndText: {
    color: COLORS.BLUE_ENABLE,
    fontSize: 40,
    fontWeight: "600"
  },
  rdText: {
    color: COLORS.BLUE_ENABLE,
    fontSize: 70,
    fontWeight: 'bold',
    letterSpacing: 5,
    marginLeft: -4,
    marginTop: -15,
    marginBottom: 150
  },
  animationContainer: {
    width: 350,
    position: 'absolute',
    top: 100,
    right: -50
  },
  animation: {
    width: "100%",
    height: 400,
    aspectRatio: 1
  }


})