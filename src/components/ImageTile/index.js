import React, { useRef } from "react";
import { Pressable, Animated } from "react-native";
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const ImageTile = ({imageUrl}) => {
  const navigation = useNavigation();
  const opacity = useRef(new Animated.Value(0)).current;

  const onLoad = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  const onPress = (imageUrl) => {
    // Only one image clickable for now
    if (imageUrl.indexOf("test-3") != -1) {
      navigation.navigate("Image Details")
    }
  }

  return (
    <Pressable onPress={() => onPress(imageUrl)}>
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
    </Pressable>
  );
};

export default ImageTile;
