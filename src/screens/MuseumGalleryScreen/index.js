import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Layout } from '@ui-kitten/components';
import Gallery from '../../components/Gallery';
import { useFirebaseContext } from '../../providers/firebaseProvider';
import styles from './styles';

const MuseumGalleryScreen = () => {
  const firebase = useFirebaseContext();
  const storage = firebase.storage();
  const db = firebase.firestore();
  const [museumUrls, setMuseumUrls] = useState([]);
  const [keys, setKeys] = useState([])
  useEffect(() => {
    db.collection("museum-gallery")
      .where("image", "!=", null)
      .get()
      .then(async (snapshot) => {
        const urlOps = snapshot.docs.map((doc) => {
          const url = doc.get("image");
          
          return storage.ref(url.replace(".", "-thumbnail.")).getDownloadURL();
        });
        const docKeys = snapshot.docs.map((doc) => {
          return doc.id
        });
        const urls = await Promise.all(urlOps);
        setMuseumUrls(urls.reverse());
        setKeys(docKeys.reverse())
      });
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Layout style={styles.layout}>
        <Gallery keys={keys} imageUrls={museumUrls} />
      </Layout>
    </SafeAreaView>
  );
};

export default MuseumGalleryScreen;