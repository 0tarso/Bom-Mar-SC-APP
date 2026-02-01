
//React ================================================
import React from "react";
import { Modal, View, Text } from "react-native";

//Styles ================================================
import { styles } from "./styles";
import { COLORS } from "@/src/Theme/Colors";

//Components ================================================
import CustomButton from "../CustomButton";


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
  );
}