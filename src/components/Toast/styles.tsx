import { COLORS } from "@/src/Theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: '95%',
    padding: 16,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconAndTitle: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 8,
    flexShrink: 1,
  },
  title: {
    fontWeight: "700",
    fontSize: 14,
    color: COLORS.TEXT_GRAY,
    flexShrink: 1,
  },
  text: {
    color: COLORS.TEXT_GRAY,
    fontSize: 12,
    marginTop: 4,
  },
  progressContainer: {
    width: '100%',
    height: 2,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
  },
})