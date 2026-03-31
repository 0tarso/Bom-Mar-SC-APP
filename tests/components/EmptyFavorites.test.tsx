import EmptyFavorites from "@/src/components/EmptyFavorites"
import { NavigationContainer } from "@react-navigation/native"
import { fireEvent, render } from "@testing-library/react-native"

const mockNavigate = jest.fn()

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}))

describe('Empty Favorites Component', () => {

  describe('Base render', () => {

    it('should be render layout texts and a button navigation', () => {

      const { getByText, getByTestId } = render(
        <EmptyFavorites />
      )

      const button = getByTestId('go-home-button')
      expect(button).toBeTruthy()

      expect(getByText("Cadê suas")).toBeTruthy()
      expect(getByText("FAVORITAS")).toBeTruthy()
      expect(getByText("HEIN!?")).toBeTruthy()
      expect(getByText("Adicionar favorita")).toBeTruthy()

    })
  })

  describe('Button navigation', () => {
    it('should navigate to Home when buttons is pressed', () => {
      const { getByTestId } = render(<EmptyFavorites />)

      fireEvent.press(getByTestId('go-home-button'))

      expect(mockNavigate).toHaveBeenCalledWith("home")

    })
  })




})