import { CategorySelector } from "@/src/components/CategorySelector";
import { styles } from "@/src/components/CategorySelector/styles"
import { fireEvent, render } from "@testing-library/react-native";

describe('Category Selector component', () => {
  describe('Render base', () => {
    it('should render the component', () => {
      const onChangeMock = jest.fn()
      const { getByTestId, getByText } = render(
        <CategorySelector
          onChange={onChangeMock}
          value="PRÓPRIA"
        />
      )
      expect(getByTestId('category-select')).toBeTruthy()
    });


  })

  describe('Change category buttons', () => {

    it('should call onChange when selecting IMPRÓPRIA category', () => {
      const onChangeMock = jest.fn()
      const { getByTestId, getByText } = render(
        <CategorySelector
          onChange={onChangeMock}
          value="PRÓPRIA"
        />
      )
      fireEvent.press(getByText('impróprias'))
      expect(onChangeMock).toHaveBeenCalledWith('IMPRÓPRIA')
    });


    it('should call onChange when selecting PRÓPRIA category', () => {
      const onChangeMock = jest.fn()
      const { getByTestId, getByText } = render(
        <CategorySelector
          onChange={onChangeMock}
          value="IMPRÓPRIA"
        />
      )
      fireEvent.press(getByText('próprias'))
      expect(onChangeMock).toHaveBeenCalledWith('PRÓPRIA')
    });


    it('should highlight PRÓPRIA when selected', () => {
      const onChangeMock = jest.fn()
      const { getByText, getByTestId } = render(
        <CategorySelector
          onChange={onChangeMock}
          value="PRÓPRIA"
        />
      )

      const propriaText = getByText("próprias")
      expect(getByTestId('option-propria-selected')).toBeTruthy()
      expect(propriaText.props.style).toContainEqual(styles.activeText)
    })


    it('should highlight IMPRÓPRIA when selected', () => {
      const onChangeMock = jest.fn()
      const { getByText, getByTestId } = render(
        <CategorySelector
          onChange={onChangeMock}
          value="IMPRÓPRIA"
        />
      )

      const impropriasText = getByText("impróprias")
      expect(getByTestId('option-impropria-selected')).toBeTruthy()
      expect(impropriasText.props.style).toContainEqual(styles.activeText)
    })

  })

})