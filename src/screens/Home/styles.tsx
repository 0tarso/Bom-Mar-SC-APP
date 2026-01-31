import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red'
  },

  homeHeroContainer: {
    height: 100
  },

  locationContainer: {
    flexDirection: 'row',
    marginTop: 30
  },

  locationText: {
    fontWeight: "600",
    color: COLORS.BLUE_PRIMARY
  },

  locationUpdateButton: {
    marginLeft: 10
  }

})