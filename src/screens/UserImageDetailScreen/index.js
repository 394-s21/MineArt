import React, { useRef, useState, useEffect }  from 'react';
import { SafeAreaView, Animated } from 'react-native';
import { Text, Layout } from '@ui-kitten/components';
import styles from './styles';
import ImageTile from '../../components/ImageTile';
import TextBox from '../../components/TextBox';
import { useFirebaseContext } from '../../providers/firebaseProvider';

const UserImageDetailScreen = ({ route, navigation }) => {
  const { id, user, imageUrl } = route.params;
  const firebase = useFirebaseContext();
  const storage = firebase.storage();
  const db = firebase.firestore();

  const [descrip, setDescrip] = useState("");
  const [pieceURL, setPieceURL] = useState('');
  const opacity = useRef(new Animated.Value(0)).current;

  const onLoad = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  useEffect(() => {
    if (!id) return;
    db.collection("social-feed")
      .doc(id)
      .get()
      .then(async (doc) => {
        setDescrip(doc.get("description"))
        let url = await storage.ref(doc.get("image")).getDownloadURL();
        setPieceURL(url)
      })
  }, [id])

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Layout style={styles.layout}>
        <Animated.Image
          onLoad={onLoad}
          source={{ uri: pieceURL }}
          resizeMode="contain"
          style={[
            {
              height: "80%",
              width: "90%",
              opacity: opacity,
              marginTop: 10
            }
          ]}
        />
        <Text style={styles.textBoxTitle} category="h6">
          A peek into the creator's mind...
        </Text>
        {descrip ? <TextBox>{descrip}</TextBox> : null}
      </Layout>
    </SafeAreaView>
  );
};

export default UserImageDetailScreen;
