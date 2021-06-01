import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import Gallery from '../../components/Gallery';
import { useFirebaseContext } from '../../providers/firebaseProvider';
import styles from './styles';

const SocialGalleryScreen = ({ route }) => {
  const firebase = useFirebaseContext();
  const db = firebase.firestore();
  const storage = firebase.storage();
  const { id } = route.params;

  const [images, setImages] = useState([]);
  const [names, setNames] = useState([]);
  const [keys, setKeys] = useState([]);


  useEffect(() => {
    db.collection('social-feed')
      .orderBy("date", "desc")
      .where('original', '==', id)
      .get()
      .then(async (snapshot) => {
        const docKeys = [];
        const docNames = [];
        const urlOps = [];
        for (let doc of snapshot.docs) {
          const url = doc.get('thumbnailImage') || "";
          if (!url) continue;
          docKeys.push(doc.id);
          docNames.push(doc.get("creatorName"))
          urlOps.push(storage.ref(url).getDownloadURL()
             .catch(() => undefined));
        }
        const urls = await Promise.all(urlOps);
        setKeys(docKeys);
        setImages(urls);
        setNames(docNames);
      });
  }, []);


  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Layout style={styles.layout}>
        {images.length ? (
          <Gallery imageUrls={images} names={names} keys={keys} />
        ) : (
          <Text category="h6">No Images to Display</Text>
        )}
      </Layout>
    </SafeAreaView>
  );
};

export default SocialGalleryScreen;
