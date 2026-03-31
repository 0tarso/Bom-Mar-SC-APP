export function mockExpo() {
  jest.mock("@expo/vector-icons", () => {
    const { Text } = require("react-native")

    return {
      FontAwesome: ({ name }: any) => <Text>{name}</Text>,
      AntDesign: ({ name }: any) => <Text>{name}</Text>,
      MaterialIcons: ({ name }: any) => <Text>{name}</Text>,
      Ionicons: ({ name }: any) => <Text>{name}</Text>,
    }
  })

  jest.mock("expo-font", () => ({
    loadAsync: jest.fn(),
  }))

  jest.mock("expo-asset", () => ({
    Asset: {},
  }))
}