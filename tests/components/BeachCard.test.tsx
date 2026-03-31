
// ____Mocks
jest.mock("@expo/vector-icons", () => {
  const { Text } = require("react-native")
  return {
    FontAwesome: ({ name }: any) => <Text>{name}</Text>,
  }
})

jest.mock("@/src/services/shareText", () => ({
  shareText: jest.fn(),
}))


//______Imports
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { makeBeach } from "../factories";
import BeachCard from "@/src/components/BeachCard";
import { shareText } from "@/src/services/shareText";


//_________Factories
const beach = makeBeach({
  praia: "Praia dos Ingleses", latitude: "-27.4385", longitude: "-48.3917"
})


//___________Tests
describe('BeachCard Component', () => {

  describe('Render base', () => {

    it('Should render the component', () => {
      const { getByTestId } = render(
        <BeachCard
          beach={beach}
          onPressFavorite={() => { }}
          onPressShowDetail={() => { }}
        />
      )

      expect(getByTestId('beach-card')).toBeTruthy()
    });
    it('Should render beach name and complement from props', () => {
      const { getByText, getByTestId } = render(
        <BeachCard
          beach={beach}
          onPressFavorite={() => { }}
          onPressShowDetail={() => { }}
        />
      )

      expect(getByText(beach.praia)).toBeTruthy()
      expect(getByText(beach.complemento)).toBeTruthy()
    });
  })

  describe('Share Button', () => {
    it('should render Share button and call onPress with shareText fn', async () => {

      const { getByTestId } = render(
        <BeachCard
          beach={beach}
          onPressFavorite={() => { }}
          onPressShowDetail={() => { }}
        />
      )

      expect(getByTestId('share-button')).toBeTruthy()

      fireEvent.press(getByTestId("share-button"))

      await waitFor(() => {
        expect(shareText).toHaveBeenCalledWith(
          beach,
          beach.situacao
        )

      })
    });
  })

  describe('Beach Details Button', () => {
    it('should render Visualizar button and call onPress ', () => {
      const fnMock = jest.fn()

      const { getByTestId } = render(
        <BeachCard
          beach={beach}
          onPressFavorite={() => { }}
          onPressShowDetail={fnMock}
        />
      )

      const button = getByTestId('beach-details-button')

      expect(button).toBeTruthy()

      fireEvent.press(button)

      expect(fnMock).toHaveBeenCalled()
    });

  })

  describe('Favorite Button', () => {
    it('should render Favorite button and call onPress ', async () => {
      const fnMock = jest.fn()

      const { getByTestId } = render(
        <BeachCard
          beach={beach}
          onPressFavorite={fnMock}
          onPressShowDetail={() => { }}
        />
      )

      const button = getByTestId('favorite-button')

      expect(button).toBeTruthy()

      fireEvent.press(button)

      await waitFor(() => {
        expect(fnMock).toHaveBeenCalled()
      })
    });

  })
})