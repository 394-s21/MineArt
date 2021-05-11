import React, { useRef, useEffect, useState } from "react";
import { Layout, Text, Divider, Button } from "@ui-kitten/components";
import { SafeAreaView, View, Animated, Dimensions } from 'react-native';
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';

import { DUMMY_IMAGE_URLS, DUMMY_TITLE, DUMMY_DATE, DUMMY_ARTIST, DUMMY_DESCRIPTION } from "../../utils/mock";
import styles from "./styles";

const IOWScreen = ({ navigation }) => {
  const window = Dimensions.get('window');
  const [height, setHeight] = useState(window.height / 2);
  const [landscape, setLandscape] = useState(window.height < window.width);

  const opacity = useRef(new Animated.Value(0)).current;

  const onLoad = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  const onChange = ({ window }) => {
    setHeight(window.height / 2);
    window.height < window.width ? setLandscape(true) : setLandscape(false);
  }

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  },[]);

  const portraitMargin = { marginLeft: '15%', marginRight: '15%'};
  const landscapeMargin = { marginLeft: '25%', marginRight: '25%'};

  const Info = () => {
    return (
      <View style={{width:"100%"}}>
        <Head/>
        <Divider/>
        <Description/>
        <EditButton/>
      </View>
      
    );
  }
  
  const Head = () => {
    return (
      <View>
        <Text category='h3'>
          {DUMMY_TITLE}
        </Text>
        <Text 
          category='h5' 
          appearance='hint'
        >
          {`${DUMMY_ARTIST}, ${DUMMY_DATE}`}
        </Text>
      </View>
      
    );
  }
  
  const Description = () => {
    return (
      <Text 
        category='p1'
        style={{paddingTop: 10}}
      >
        {DUMMY_DESCRIPTION}
      </Text>
    );
  }
  
  const EditButton = () => {
    
  
    return (
      <View style={styles.buttonWrapper}>
        <Button 
          style={styles.button}
          onPress={() => {navigation.navigate("Editor Screen")}}
        >
          Modify
        </Button>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} >
      <ImageHeaderScrollView
        overlayColor="white"
        maxHeight={height}
        minHeight={0}
        minOverlayOpacity={0}
        maxOverlayOpacity={1}
        useNativeDriver={true}
        renderHeader={() => (
          <Animated.Image
            onLoad={onLoad}
            source={{uri: DUMMY_IMAGE_URLS[3]}}
            resizeMode="contain"
            style={[{
                      height: height, 
                      opacity: opacity,
                    }]}
          />  
        )}
      >
        <View>
          <TriggeringView>
            <Layout style={[
              styles.layout,
              landscape ? landscapeMargin : portraitMargin
              ]}>
              <Info/>
            </Layout>
          </TriggeringView>
        </View>
      </ImageHeaderScrollView>
    </SafeAreaView>
  );
};

export default IOWScreen;
