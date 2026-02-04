import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  container: {
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  logoImage: {
    marginTop: 100, width: 330, resizeMode: 'contain'
  },

  animationContainer: {
    position: 'relative', width: '100%', height: 150
  },
  animation: {
    width: "100%",
    height: 100,
    position: 'absolute',
    zIndex: 20,
    top: -20
  }
})