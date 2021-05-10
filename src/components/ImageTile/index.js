import React, { useRef } from "react";
import { Animated } from "react-native";
import styles from './styles';

const ImageTile = ({imageUrl}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  const onLoad = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Animated.Image 
      onLoad={onLoad}
      style={[
        styles.image,
        {
          opacity: opacity,
        }
      ]}
      source={{
        uri: imageUrl
      }}
    />
  );
};

export default ImageTile;
