import CustomButton from "@/src/components/CustomButton"
import { fireEvent, render } from "@testing-library/react-native"


describe('Custom Button Component', () => {

  describe('Base render', () => {
    it('should be render button with Text Visitar', () => {
      const functionMock = jest.fn()

      const { getByText, getByTestId } = render(
        <CustomButton
          onPress={functionMock}
          title="Visitar"
          backgroundColor="#4085cb"
          titleColor="#fff"
        />
      )

      expect(getByText("Visitar")).toBeTruthy()
    })

    it('should be render button with BG=#4085cb and titleColor=#fff', () => {
      const functionMock = jest.fn()

      const { getByText, getByTestId } = render(
        <CustomButton
          onPress={functionMock}
          title="Visitar"
          backgroundColor="#4085cb"
          titleColor="#fff"
        />
      )

      const button = getByTestId('custom-button')
      const text = getByText('Visitar')

      expect(button).toHaveStyle({ backgroundColor: "#4085cb" })
      expect(text).toHaveStyle({ color: "#fff" })

    })
    it('should be render button with BG=#9985cb and titleColor=#99ffab', () => {
      const functionMock = jest.fn()

      const { getByText, getByTestId } = render(
        <CustomButton
          onPress={functionMock}
          title="Visitar"
          backgroundColor="#9985cb"
          titleColor="#99ffab"
        />
      )

      const button = getByTestId('custom-button')
      const text = getByText('Visitar')

      expect(button).toHaveStyle({ backgroundColor: "#9985cb" })
      expect(text).toHaveStyle({ color: "#99ffab" })

    })
  })

  describe('Function call', () => {
    it('should call onPress', () => {
      const functionMock = jest.fn()

      const { getByTestId } = render(
        <CustomButton
          onPress={functionMock}
          title="Visitar"
          backgroundColor="#4085cb"
          titleColor="#fff"
        />
      )

      fireEvent.press(getByTestId('custom-button'))

      expect(functionMock).toHaveBeenCalled()
    })
  })



})