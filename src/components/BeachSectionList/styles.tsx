import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  sectionHeaderContainer: {
    backgroundColor: "#f3f3f3",
    flexDirection: 'row',
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 10
  },
  headerTitle: {
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: "900",
    color: COLORS.BLUE_PRIMARY,
    // paddingTop: 20,
    // paddingBottom: 10
  },
  mapButtonContainer: {
    backgroundColor: COLORS.BLUE_PRIMARY,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8
  },
  mapButtonText: {
    fontWeight: '600',
    color: "#e2e2e2"
  },
  sectionFooterText: {
    textAlign: 'right',
    color: COLORS.TEXT_GRAY,
    paddingRight: 5
  }

})