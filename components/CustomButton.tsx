import React from 'react';
import { Pressable, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  pressedStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && [styles.buttonPressed, pressedStyle],
      ]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#171616",
    fontSize: 30,
    textAlign: "center",
  },
  button: {
    width: 250,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    backgroundColor: "#91B3F9",
    marginTop: 15,
  },
  buttonPressed: {
    backgroundColor: "#C9DCFD",
  },
});
