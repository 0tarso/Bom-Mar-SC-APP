import { useAppVersion } from "@/src/contexts/AppVersionProvider";
import { COLORS } from "@/src/Theme/Colors";
import { Modal, View, Text, TouchableOpacity, Linking } from "react-native";

export const UpdateModal = ({
  visible,
  force,
  onClose,
}: {
  visible: boolean;
  force: boolean;
  onClose: () => void;
}) => {
  const { versionData } = useAppVersion();

  const handleUpdate = () => {
    Linking.openURL(versionData.url!);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.7)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "80%",
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Atualização disponível
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Versão: {versionData.latest}
          </Text>


          <Text style={{ marginBottom: 20 }}>
            {force
              ? "Você precisa atualizar o app para continuar usando."
              : "Matenha seu app atualizado. Isso corrige bugs de versões anteriores e melhora a sua experiência"}
          </Text>
          <Text style={{ marginBottom: 10 }}>
            O botão irá leva-lô para a página de download oficial do aplicativo
          </Text>


          <TouchableOpacity
            onPress={handleUpdate}
            style={{
              backgroundColor: COLORS.BLUE_PRIMARY,
              padding: 12,
              borderRadius: 8,
              marginBottom: !force ? 10 : 0,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Atualizar
            </Text>
          </TouchableOpacity>

          {!force && (
            <TouchableOpacity onPress={onClose}>
              <Text style={{ textAlign: "center", color: "#666" }}>
                Agora não
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};