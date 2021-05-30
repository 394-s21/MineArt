import React, { useRef, useEffect, useState, Component } from 'react';
import { Layout, Text, Divider, Button } from '@ui-kitten/components';
import {
  Platform,
  SafeAreaView,
  View,
  Animated,
  Dimensions
} from 'react-native';
import {
  ImageHeaderScrollView,
  TriggeringView
} from 'react-native-image-header-scroll-view';
import { useFirebaseContext } from '../../providers/firebaseProvider';

import Card from '../../components/FlipCards/Card';
import ImageEditor from '../../components/ImageEditor';

import {
  leftPrompt,
  leftExplanation,
  leftAction,
  leftSource,
  centerPrompt,
  centerExplanation,
  centerAction,
  centerSource,
  rightPrompt,
  rightExplanation,
  rightAction,
  rightSource
} from '../../utils/mock';

import styles from './styles';

const ImageScreen = ({ route, navigation }) => {
  const firebase = useFirebaseContext();
  const storage = firebase.storage();
  const db = firebase.firestore();

  const { id } = route.params;
  const window = Dimensions.get('window');
  const opacity = useRef(new Animated.Value(0)).current;

  const [height, setHeight] = useState(window.height / 2);
  const [landscape, setLandscape] = useState(window.height < window.width);
  const [piece, setPiece] = useState({});
  const [pieceURL, setPieceURL] = useState('');

  const onLoad = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  const onChange = ({ window }) => {
    setHeight(window.height / 2);
    window.height < window.width ? setLandscape(true) : setLandscape(false);
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);

  useEffect(() => {
    db.collection('museum-gallery')
      .doc(id)
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          let data = doc.data();
          setPiece(data);
          let url = await storage.ref(data.image).getDownloadURL();
          setPieceURL(url);
        }
      });
  }, []);

  const portraitMargin = { marginLeft: '15%', marginRight: '15%' };
  const landscapeMargin = { marginLeft: '25%', marginRight: '25%' };

  const Info = () => {
    return (
      <View style={{ minWidth: '100%' }}>
        <Head />
        <Divider />
        <View style={styles.buttonsWrapper}>
          <EditButton />
          <SocialGalleryButton />
        </View>
        <View style={{ width: '100%' }}></View>
      </View>
    );
  };

  const Head = () => {
    return (
      <Layout style={{ display: 'flex', maxWidth: 'fit-content', padding: 20 }}>
        <Text category="h3">{piece.title}</Text>
        <Text category="h5" appearance="hint">
          {piece.artist}
        </Text>
      </Layout>
    );
  };

  const SocialGalleryButton = () => {
    return (
      <Button
        style={styles.button}
        onPress={() => {
          navigation.navigate('Social Gallery', {id: id});
        }}
      >
        View Creations
      </Button>
    );
  };

  const onPressEditButton = () => {
    if (Platform.OS == 'web') {
      navigation.navigate('Edit Image', { id: id, pieceURL: pieceURL });
    } else {
      ImageEditor(id, pieceURL);
    }
  };

  const EditButton = () => {
    return (
      <Button style={styles.button} onPress={onPressEditButton}>
        Create
      </Button>
    );
  };

  const Prompts = () => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.indCard}>
          <Card
            question={leftPrompt}
            explanation={leftExplanation}
            action={leftAction}
            source={leftSource}
          />
        </View>
        <View style={styles.indCard}>
          <Card
            question={centerPrompt}
            explanation={centerExplanation}
            action={centerAction}
            source={centerSource}
          />
        </View>
        <View style={styles.indCard}>
          <Card
            question={rightPrompt}
            explanation={rightExplanation}
            action={rightAction}
            source={rightSource}
          />
        </View>
      </View>
    );
  };

  var isMonet
  if (piece.title === "Impression, Sunrise"){
    isMonet = true
  }else{
    isMonet = false
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageHeaderScrollView
        overlayColor="white"
        maxHeight={height}
        minHeight={0}
        minWidth={100}
        minOverlayOpacity={0}
        maxOverlayOpacity={1}
        useNativeDriver={true}
        style={{ width: Dimensions.get('window').width }}
        contentContainerStyle={{ flexGrow: 1 }}
        renderHeader={() =>
          !pieceURL ? null : (
            <Animated.Image
              onLoad={onLoad}
              source={{ uri: pieceURL }}
              resizeMode="contain"
              style={[
                {
                  height: height,
                  opacity: opacity,
                  marginTop: 10
                }
              ]}
            />
          )
        }
      >
        <View>
          <TriggeringView>
            <Layout
              style={[
                styles.layout,
                landscape ? landscapeMargin : portraitMargin
              ]}
            >
              <Info />
            </Layout>
          </TriggeringView>
        </View>
        {isMonet?<Prompts/>:null}
      </ImageHeaderScrollView>
    </SafeAreaView>
  );
};

export default ImageScreen;
