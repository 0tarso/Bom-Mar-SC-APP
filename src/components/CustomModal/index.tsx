import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { styles } from "./styles";
import CustomButton from "../CustomButton";
import { COLORS } from "@/src/Theme/Colors";
import { Portal } from "react-native-paper";


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
    <Portal>
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

            <View style={styles.buttonArea}>
              <CustomButton
                onPress={onClose}
                backgroundColor={COLORS.BUTTON_SECOND_BACKGROUND}
                title="Fechar"
                titleColor={COLORS.BUTTON_SECOND_TEXT}
              />

            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}