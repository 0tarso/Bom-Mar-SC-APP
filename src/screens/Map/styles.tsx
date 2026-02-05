import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  subtitleContainer: {
    position: 'absolute',
    bottom: 125,
    right: 5,
    zIndex: 50,
    width: 150,
    // height: 100,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'column',
    elevation: 5,
  },
  subTitle: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5
  },
  subTitleText: {
    color: COLORS.TEXT_GRAY,
    fontFamily: 'MontserratBold',
    marginLeft: 5
  }

})