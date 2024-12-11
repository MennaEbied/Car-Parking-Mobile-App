import React from "react";
import {
  Image,
  StyleSheet,
  useWindowDimensions,
  StyleProp,
  ImageStyle,
  ImageSourcePropType,
} from "react-native";
interface CustomImageProps {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
}

export const CustomImage: React.FC<CustomImageProps> = ({ source, style }) => {
  const { width } = useWindowDimensions();
  const imageSize = Math.min(width, 500);
  return (
    <Image
      source={source}
      style={[styles.image, { width: imageSize, height: imageSize }, style]}
    />
  );
};
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});
