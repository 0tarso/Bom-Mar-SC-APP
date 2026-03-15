import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#bacdff',
    paddingHorizontal: 12,
    flex: 1
  },
  titleHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.BLUE_PRIMARY,
    marginBottom: 10,
    marginTop: 10
  },
  searchModalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    columnGap: 8,
    marginTop: 40
  },
  searchInput: {
    flex: 1,
    fontFamily: 'MontserratBold',
    fontSize: 14,
    color: COLORS.TEXT_GRAY,
  },
  searchModalButton: {
    position: 'absolute',
    zIndex: 40,
    top: -100,
    right: 20,
    elevation: 2,
    backgroundColor: COLORS.GRAY_BACKGROUND,
    padding: 7,
    borderRadius: 15
  }

})