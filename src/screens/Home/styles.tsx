import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red'
  },

  homeHeaderContainer: {
    height: 100
  },

  locationArea: {
    paddingLeft: 20,
    paddingVertical: 10,
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