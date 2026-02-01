import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

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
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 8,
  },
  text: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center'
  },
});
