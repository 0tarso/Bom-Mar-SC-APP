// tests/screens/HomeScreen.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import HomeScreen from "@/src/screens/Home";
import api from "@/src/api/api";
import { makeWeatherAlert } from "../factories/WeatherAlert";

// beforeAll(() => {
//   const HomeScreen = require("@/src/screens/Home").default;
//   console.log("HomeScreen:", HomeScreen);

//   const HomeHeader = require("@/src/components/HomeHeader").default;
//   console.log("HomeHeader:", HomeHeader);

//   const BeachList = require("@/src/components/BeachList").default;
//   console.log("BeachList:", BeachList);

//   const UpdateModal = require("@/src/components/UpdateModal").UpdateModal;
//   console.log("UpdateModal:", UpdateModal);

//   const AlertWeatherModal = require("@/src/components/AlertWeatherModal").default;
//   console.log("AlertWeatherModal:", AlertWeatherModal);

//   const NotFound = require("@/src/components/NotFound").default;
//   console.log("NotFound:", NotFound);
// });

// ─── Mocks de módulos externos ────────────────────────────────────────────────

jest.mock("toastify-react-native", () => ({
  Toast: { info: jest.fn(), error: jest.fn() },
}));

jest.mock("@expo/vector-icons/FontAwesome", () => {
  const { Text } = require("react-native");
  return ({ name }: { name: string }) => <Text>{name}</Text>;
});

jest.mock("react-native-modal", () => {
  const { View } = require("react-native");
  return ({ isVisible, children }: { isVisible: boolean; children: React.ReactNode }) =>
    isVisible ? <View>{children}</View> : null;
});

// Animações Lottie não funcionam em ambiente de teste
jest.mock("@/src/components/NotFound", () => {
  const { View } = require("react-native");
  return () => <View testID="not-found-animation" />;
});

jest.mock("@/src/utils/normalizeFontScalling", () => ({
  normalizeFontScale: (size: number) => size,
}));

// ─── Mocks de componentes filhos ──────────────────────────────────────────────
// Cada componente filho tem seus próprios testes — aqui só precisamos saber
// se foram ou não renderizados, não testar seu comportamento interno.

jest.mock("@/src/components/HomeHeader", () => ({
  __esModule: true,
  default: () => {
    const { View } = require("react-native");
    return <View testID="home-header" />;
  },
}));

jest.mock("@/src/components/BeachList", () => ({
  __esModule: true,
  default: () => {
    const { View } = require("react-native");
    return <View testID="beach-list" />;
  },
}));

jest.mock("@/src/components/AlertWeatherModal", () => ({
  __esModule: true,
  default: ({ props }: { props: { codigo: string } }) => {
    const { View } = require("react-native");
    return <View testID={`alert-modal-${props.codigo}`} />;
  },
}));

jest.mock("@/src/components/UpdateModal", () => ({
  __esModule: true,
  UpdateModal: ({ visible }: { visible: boolean }) => {
    const { View } = require("react-native");
    return visible ? <View testID="update-modal" /> : null;
  },
}));

jest.mock("@/src/components/NotFound", () => ({
  __esModule: true,
  default: () => {
    const { View } = require("react-native");
    return <View testID="not-found-animation" />;
  },
}));
// ─── Mocks de hooks e contextos ───────────────────────────────────────────────

const mockRefreshLocation = jest.fn();

jest.mock("@/src/hooks/useLocation", () => ({
  useLocation: jest.fn(() => ({
    refreshLocation: mockRefreshLocation,
    city: "Florianópolis",
    region: "SC",
    loading: false,
    location: { latitude: -27.5954, longitude: -48.548 },
  })),
}));

jest.mock("@/src/contexts/InternetProvider", () => ({
  useInternet: jest.fn(() => ({
    isConnected: true,
  })),
}));

jest.mock("@/src/contexts/UserBeachsContext", () => ({
  useUserBeachs: () => ({
    beachs: {},
    loadingBeachs: false,
    errorFetchBeach: null,
  }),
}));

jest.mock("@/src/contexts/AppVersionProvider", () => ({
  useAppVersion: () => ({
    versionData: null,
    isForceUpdate: false,
    isOptionalUpdate: false,
    currentVersion: "1.0.0",
  }),
}));

// ─── Mock da API ──────────────────────────────────────────────────────────────

jest.mock("@/src/api/api");
const mockedApi = api as jest.Mocked<typeof api>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Resposta padrão da API sem alertas — evita que testes não relacionados
// a alertas precisem configurar a API individualmente
function mockApiNoAlert() {
  mockedApi.get.mockResolvedValue({ data: {} });
}

function mockApiWithAlert(overrides = {}) {
  const alert = makeWeatherAlert(overrides);
  mockedApi.get.mockResolvedValue({ data: { dados: [alert] } });
  return alert;
}

// ─── Testes ──────────────────────────────────────────────────────────────────

describe("HomeScreen", () => {

  beforeEach(() => {
    jest.clearAllMocks();
    mockApiNoAlert();
  });

  // ── Renderização base ──────────────────────────────────────────────────────

  describe("renderização base", () => {
    it("renderiza o header", async () => {
      render(<HomeScreen />);
      await waitFor(() => {
        expect(screen.getByTestId("home-header")).toBeTruthy();
      });
    });

    it("renderiza a BeachList quando há conexão", async () => {
      render(<HomeScreen />);
      await waitFor(() => {
        expect(screen.getByTestId("beach-list")).toBeTruthy();
      });
    });
  });

  // ── Conexão com internet ───────────────────────────────────────────────────

  describe("conexão com internet", () => {
    it("exibe BeachList quando está conectado", async () => {
      render(<HomeScreen />);
      await waitFor(() => {
        expect(screen.getByTestId("beach-list")).toBeTruthy();
        expect(screen.queryByTestId("not-found-animation")).toBeNull();
      });
    });

    it("exibe animação e mensagem 'Sem conexão' quando não está conectado", async () => {
      jest.mock("@/src/contexts/InternetProvider", () => ({
        useInternet: () => ({ isConnected: false }),
      }));

      // Como o mock de módulo não pode ser sobrescrito por teste,
      // re-renderizamos com o módulo mockado diretamente no componente
      const { rerender } = render(<HomeScreen />);

      // Força o estado de sem conexão via mock inline
      jest.spyOn(
        require("@/src/contexts/InternetProvider"),
        "useInternet"
      ).mockReturnValue({ isConnected: false });

      rerender(<HomeScreen />);

      await waitFor(() => {
        expect(screen.getByTestId("not-found-animation")).toBeTruthy();
        expect(screen.getByText("Sem conexão")).toBeTruthy();
        expect(screen.queryByTestId("beach-list")).toBeNull();
      });
    });
  });

  // ── Localização ───────────────────────────────────────────────────────────

  describe("localização", () => {
    const { useLocation } = require("@/src/hooks/useLocation");
    const { useInternet } = require("@/src/contexts/InternetProvider");

    // Restaura os mocks para os valores padrão antes de cada teste
    beforeEach(() => {
      useLocation.mockReturnValue({
        refreshLocation: mockRefreshLocation,
        city: "Florianópolis",
        region: "SC",
        loading: false,
        location: { latitude: -27.5954, longitude: -48.548 },
      });
      useInternet.mockReturnValue({ isConnected: true });
    });

    it("exibe cidade e estado após carregar", async () => {
      render(<HomeScreen />);
      await waitFor(() => {
        expect(screen.getByText("Florianópolis - SC")).toBeTruthy();
      });
    });

    it("exibe 'Localizando' enquanto loading é true", async () => {
      useLocation.mockReturnValue({
        refreshLocation: mockRefreshLocation,
        city: "",
        region: "",
        loading: true,
        location: null,
      });

      render(<HomeScreen />);
      expect(screen.getByText("Localizando")).toBeTruthy();
    });

    it("chama refreshLocation ao pressionar o botão de atualizar", async () => {
      render(<HomeScreen />);

      await waitFor(() => {
        fireEvent.press(screen.getByText("refresh"));
      });

      expect(mockRefreshLocation).toHaveBeenCalled();
    });
  });

  // ── Alerta meteorológico ───────────────────────────────────────────────────

  describe("alerta meteorológico", () => {
    it("renderiza AlertWeatherModal quando há alerta com codigo", async () => {
      mockApiWithAlert({ codigo: "AL-001" });
      render(<HomeScreen />);

      await waitFor(() => {
        expect(screen.getByTestId("alert-modal-AL-001")).toBeTruthy();
      });
    });

    it("não renderiza AlertWeatherModal quando não há alerta", async () => {
      mockApiNoAlert();
      render(<HomeScreen />);

      await waitFor(() => {
        expect(screen.queryByTestId(/alert-modal/)).toBeNull();
      });
    });

    it("chama Toast.error se a requisição de alertas falhar", async () => {
      const { Toast } = require("toastify-react-native");
      mockedApi.get.mockRejectedValue(new Error("Network error"));

      render(<HomeScreen />);

      await waitFor(() => {
        expect(Toast.error).toHaveBeenCalledWith("Erro ao obter alertas.");
      });
    });
  });

  // ── Modal de atualização ───────────────────────────────────────────────────

  describe("modal de atualização", () => {
    it("não exibe o modal quando não há atualização pendente", async () => {
      render(<HomeScreen />);
      await waitFor(() => {
        expect(screen.queryByTestId("update-modal")).toBeNull();
      });
    });

    it("exibe o modal quando isForceUpdate é true", async () => {
      jest.spyOn(
        require("@/src/contexts/AppVersionProvider"),
        "useAppVersion"
      ).mockReturnValue({
        versionData: null,
        isForceUpdate: true,
        isOptionalUpdate: false,
      });

      render(<HomeScreen />);
      await waitFor(() => {
        expect(screen.getByTestId("update-modal")).toBeTruthy();
      });
    });

    it("exibe o modal quando isOptionalUpdate é true", async () => {
      jest.spyOn(
        require("@/src/contexts/AppVersionProvider"),
        "useAppVersion"
      ).mockReturnValue({
        versionData: null,
        isForceUpdate: false,
        isOptionalUpdate: true,
      });

      render(<HomeScreen />);
      await waitFor(() => {
        expect(screen.getByTestId("update-modal")).toBeTruthy();
      });
    });
  });
});

// it("diagnóstico — identifica componente undefined", () => {
//   const mods = {
//     HomeScreen: require("@/src/screens/Home").default,
//     HomeHeader: require("@/src/components/HomeHeader").default,
//     BeachList: require("@/src/components/BeachList").default,
//     UpdateModal: require("@/src/components/UpdateModal").UpdateModal,
//     AlertWeatherModal: require("@/src/components/AlertWeatherModal").default,
//     NotFound: require("@/src/components/NotFound").default,
//   };

//   Object.entries(mods).forEach(([name, mod]) => {
//     console.log(`${name}:`, mod ? "OK" : "UNDEFINED");
//   });
// });