
//React ================================================
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Modal from "react-native-modal"

//Styles ================================================
import { styles } from "./styles";
import { COLORS } from "@/src/Theme/Colors";

//Components ================================================
import CustomButton from "../CustomButton";
import { FontAwesome } from "@expo/vector-icons";


type Props = {
  visible: boolean;
  onClose: () => void;
  buttonTitle: string,
  onPressButton: () => void,
  title?: string;
  children?: React.ReactNode;
};

export function CustomModal({
  visible,
  onClose,
  buttonTitle,
  onPressButton,
  title,
  children,
}: Props) {
  return (
    <Modal
      isVisible={visible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      statusBarTranslucent
      onBackButtonPress={onClose}
      style={{ margin: 0 }}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>

          {title && (
            <View style={{
              backgroundColor: COLORS.BLUE_PRIMARY,
              // flex: 1,
              height: 115,
              justifyContent: "flex-end",
              // paddingTop: 50,
              paddingBottom: 10,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              elevation: 5
            }}>

              <Text style={styles.title}>{title}</Text>
            </View>
          )}

          <TouchableOpacity style={{
            position: 'absolute',
            right: 20,
            top: 50,
            zIndex: 20
          }}
            onPress={onClose}
            hitSlop={20}
          >
            <FontAwesome
              size={20}
              name="close"
              color={title ? COLORS.FULL_WHITE : COLORS.BLUE_PRIMARY} />
          </TouchableOpacity>

          <View style={styles.content}>
            {children}
          </View>

          {buttonTitle && (

            <View style={styles.buttonArea}>
              <CustomButton
                onPress={onPressButton}
                backgroundColor={COLORS.BUTTON_SECOND_BACKGROUND}
                title={buttonTitle}
                titleColor={COLORS.BUTTON_SECOND_TEXT}
              />

            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}