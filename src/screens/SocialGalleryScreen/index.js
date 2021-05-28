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
  const [modifications, setModifications] = useState([]);

  useEffect(() => {
    let unsubscribe = db
      .collection('museum-gallery')
      .doc(id)
      .onSnapshot((doc) => {
        setModifications(doc.get('modifications'));
      });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (modifications.length === 0) {
      return;
    }
    db.collection('social-feed')
      .where('id', 'in', modifications)
      .get()
      .then(async (snapshot) => {
        const urlOps = snapshot.docs.map((doc) => {
          const url = doc.get('image');
          return storage.ref(url.replace('.', '-thumbnail.')).getDownloadURL();
        });
        const docKeys = snapshot.docs.map((doc) => doc.id);
        const docNames = snapshot.docs.map((doc) => doc.get('creatorName'));
        const urls = await Promise.all(urlOps);
        setKeys(docKeys);
        setImages(urls);
        setNames(docNames);
      });
  }, [modifications]);

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
