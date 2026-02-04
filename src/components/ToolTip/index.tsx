import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { COLORS } from '@/src/Theme/Colors';

interface CustomTooltipProps {
  text: string;
  children: React.ReactNode;
}

export default function CustomTooltip({
  text,
  children,
}: CustomTooltipProps) {

  useEffect(() => {
    setTimeout(() => {
      setVisible(false)
    }, 4000)
  }, [])

  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable onPress={() => setVisible(true)} hitSlop={15}>
        {children}
      </Pressable>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.tooltip}>
            <Text style={styles.text}>{text}</Text>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 150
  },
  tooltip: {
    maxWidth: '80%',
    backgroundColor: COLORS.GRAY_BACKGROUND,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.BLUE_DISABLE,
    elevation: 8
  },
  text: {
    color: COLORS.TEXT_GRAY,
    fontSize: 13,
    textAlign: 'center',
    fontFamily: "MontserratSemiBold"
  },
});
