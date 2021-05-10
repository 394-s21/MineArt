import React from "react";
import { SafeAreaView } from 'react-native';
import Gallery from "../../components/Gallery";
import { DUMMY_EDITED_IMAGE_URLS } from "../../utils/mock";
import { DUMMY_NAMES } from "../../utils/mock";
import styles from "./styles";

const SocialGalleryScreen = () => {
  return (
    <SafeAreaView style={styles.layout}>
      <Gallery imageUrls={DUMMY_EDITED_IMAGE_URLS} names={DUMMY_NAMES}/>
    </SafeAreaView>
  );
};

export default SocialGalleryScreen;
