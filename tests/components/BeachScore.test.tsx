jest.mock("react-native-progress-wheel", () => {
  const { View } = require("react-native")
  return () => <View testID="progress-wheel" />
})

jest.mock("@expo/vector-icons", () => {
  const { Text } = require("react-native")

  return {
    FontAwesome: ({ name }: any) => <Text>{name}</Text>,
  }
})

jest.mock("@/src/components/ToolTip", () => {
  const { View } = require("react-native")
  return () => <View testID="tooltip" />
})


import AnimatedProgressWheel from "react-native-progress-wheel"
import CustomTooltip from "@/src/components/ToolTip"
import { FontAwesome } from "@expo/vector-icons"
import { fireEvent, render } from "@testing-library/react-native"
import BeachScore from "@/src/components/BeachScore"
import { makeBeachScore, makeBeachScoreImpropia } from "../factories/BeachScore"


const beachScore = makeBeachScore({
  score: {
    adulto: {
      label: "Bom",
      score: 72
    },
    crianca: {
      label: "Atenção",
      score: 42,

    },
    surf: {
      label: "Clássico",
      score: 74
    }
  }
})
const badBeachScore = makeBeachScoreImpropia()

function renderBeachScore() {
  return render(
    <BeachScore
      resultado_e_coli={beachScore.resultado_e_coli}
      score={beachScore.score}
      situacao={beachScore.situacao}
      ultima_analise={beachScore.ultima_analise}
    />
  )
}

function renderBadBeachScore() {
  return render(
    <BeachScore
      resultado_e_coli={badBeachScore.resultado_e_coli}
      score={badBeachScore.score}
      situacao={badBeachScore.situacao}
      ultima_analise={badBeachScore.ultima_analise}
    />
  )
}

describe('Beach Score Component =======', () => {

  describe('Base Render', () => {
    it('should render component', () => {
      const { getByTestId } = renderBeachScore()

      expect(getByTestId('beach-score')).toBeTruthy()
    })
  })

  describe('PROPRIA beach situation render', () => {
    it('should render card title "Tipos de banho"', () => {
      const { getByText } = renderBeachScore()

      expect(getByText('Tipos de banho')).toBeTruthy()
    });

    it('should render the three Progress Wheel', () => {
      const { getAllByTestId } = renderBeachScore()

      expect(getAllByTestId("progress-wheel")).toHaveLength(3)
    })
    it('should render the three score labels: Adulto, Infantil, Surf', () => {
      const { getByText } = renderBeachScore()

      expect(getByText('Adulto')).toBeTruthy()
      expect(getByText('Infantil')).toBeTruthy()
      expect(getByText('Surf')).toBeTruthy()
    })
    it('should render the three score props text', () => {
      const { getByText } = renderBeachScore()

      expect(getByText(beachScore.score.adulto.label)).toBeTruthy()
      expect(getByText(beachScore.score.crianca.label)).toBeTruthy()
      expect(getByText(beachScore.score.surf.label)).toBeTruthy()
    })

  })


  describe('IMPRÓPRIA beach situation render', () => {
    it('should render the CustomTooltip', () => {
      const { getByTestId, getByText } = renderBadBeachScore()

      expect(getByTestId('tooltip')).toBeTruthy()

    });
    it('should render only one Progress Wheel', () => {
      const { getAllByTestId } = renderBadBeachScore()

      expect(getAllByTestId("progress-wheel")).toHaveLength(1)
    })
    it('should render the E.COLI level', () => {
      const { getByText } = renderBadBeachScore()

      expect(getByText(badBeachScore.resultado_e_coli)).toBeTruthy()
    })


  })

})