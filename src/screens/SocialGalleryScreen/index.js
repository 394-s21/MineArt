import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Layout } from '@ui-kitten/components';
import Gallery from '../../components/Gallery';
import { useFirebaseContext } from '../../providers/firebaseProvider';
import styles from './styles';

const SocialGalleryScreen = () => {
  const firebase = useFirebaseContext();
  const db = firebase.firestore();
  const storage = firebase.storage();

  const [images, setImages] = useState([]);
  const [names, setNames] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('social-feed')
      .doc('test')
      .onSnapshot(async (doc) => {
        setNames(doc.get('names').reverse());
        const images = doc.get('images');

        const urlOps = images.map((url) => {
          return storage.ref(url).getDownloadURL();
        });
        const urls = await Promise.all(urlOps);
        setImages(urls.reverse());
      });

    return () => unsubscribe();
  }, []);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Layout style={styles.layout}>
        <Gallery imageUrls={images} names={names} />
      </Layout>
    </SafeAreaView>
  );
};

export default SocialGalleryScreen;
