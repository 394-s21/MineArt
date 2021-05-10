import React from "react";
import { SafeAreaView } from 'react-native';
import { Layout, } from "@ui-kitten/components";
import Gallery from "../../components/Gallery";
import { DUMMY_IMAGE_URLS } from "../../utils/mock";
import styles from "./styles";

const MuseumGalleryScreen = () => {
  return (
    <SafeAreaView style={styles.layout}>
      <Gallery imageUrls={DUMMY_IMAGE_URLS} />
    </SafeAreaView>
  );
};

export default MuseumGalleryScreen;
