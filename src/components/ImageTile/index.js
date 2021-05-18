import React, { useRef } from 'react';
import { Pressable, Animated } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const ImageTile = ({
  imageUrl,
  navigateUserImageDetail,
  disableOnPress,
  imgWidth,
  imgHeight
}) => {
  const navigation = useNavigation();
  const opacity = useRef(new Animated.Value(0)).current;

  const onLoad = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  const onPress = (imageUrl) => {
    // ImageTile components rendered on user detail screen should not be pressable
    if (disableOnPress) return;
    // navigateUserImageDetail is true if ImageTile is rendered in social gallery
    // navigateUserImageDetail is false if ImageTile is rendered in museum gallery
    if (navigateUserImageDetail) {
      // https://reactnavigation.org/docs/params/ : for info on how the code below works
      navigation.navigate('User Image Details', {
        user: null, // TODO: fill this in with actual user later on
        imageUrl: imageUrl
      });
    } else if (imageUrl.indexOf('test-3') != -1) {
      // Only one image clickable for now
      navigation.navigate('Image Details');
    }
  };

  return (
    <Pressable onPress={() => onPress(imageUrl)}>
      <Animated.Image
        onLoad={onLoad}
        style={[
          styles.image,
          {
            opacity: opacity,
            height: imgHeight || 250, // default to 250
            width: imgWidth || 250 // default to 250
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
