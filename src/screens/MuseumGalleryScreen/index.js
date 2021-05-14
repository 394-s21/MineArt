import React, { useEffect, useState } from "react";
import { SafeAreaView } from 'react-native';
import Gallery from "../../components/Gallery";
import { DUMMY_IMAGE_URLS } from "../../utils/mock";
import { useFirebaseContext } from "../../providers/firebaseProvider";
import styles from "./styles";


const MuseumGalleryScreen = () => {
  const firebase = useFirebaseContext();
  const storage = firebase.storage();
  const db = firebase.firestore();
  const [museumUrls, setMuseumUrls] = useState([])

  useEffect(() => {
    db.collection("museum-gallery").doc("test").get()
      .then(data => {
        return data.get("images")
      })
      .then(async images => {
        const urlOps = images.map((url) => {
          return storage.ref(url).getDownloadURL()
        })
        const urls = await Promise.all(urlOps);
        setMuseumUrls(urls)
      })
  }, [])
  return (
    <SafeAreaView style={styles.layout}>
      <Gallery imageUrls={museumUrls} />
    </SafeAreaView>
  );
};

export default MuseumGalleryScreen;
