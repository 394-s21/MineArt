import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Layout } from '@ui-kitten/components';
import Gallery from '../../components/Gallery';
import { useFirebaseContext } from '../../providers/firebaseProvider';
import styles from './styles';

const SocialGalleryScreen = ({ route }) => {
  const firebase = useFirebaseContext();
  const db = firebase.firestore();
  const storage = firebase.storage();

  const [images, setImages] = useState([]);
  const [names, setNames] = useState([]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    db.collection('social-feed')
      .where("image", "!=", null)
      .get()
      .then(async (snapshot) => {
        const urlOps = snapshot.docs.map((doc) => {
          const url = doc.get("image");
          
          return storage.ref(url.replace(".", "-thumbnail.")).getDownloadURL();
        });
        const docKeys = snapshot.docs.map((doc) => doc.id);
        const docNames = snapshot.docs.map(doc => doc.get("creatorName"))
        const urls = await Promise.all(urlOps);
        
        console.log(docKeys);
        setKeys(docKeys);
        setImages(urls);
        setNames(docNames);
      });
    
  }, []);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Layout style={styles.layout}>
        <Gallery imageUrls={images} names={names} keys={keys} />
      </Layout>
    </SafeAreaView>
  );
};

export default SocialGalleryScreen;
