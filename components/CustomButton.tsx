import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

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
    color: "#002437",
    fontSize: 22,
    textAlign: "center",
  },
  button: {
    width: 270,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#009ae9",
    marginTop: 35,
  },
  buttonPressed: {
    backgroundColor: "#C9DCFD",
  },
});
