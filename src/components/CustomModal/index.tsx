import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { styles } from "./styles";


type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
};

export function CustomModal({
  visible,
  onClose,
  title,
  children,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {title && <Text style={styles.title}>{title}</Text>}

          <View style={styles.content}>
            {children}
          </View>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}