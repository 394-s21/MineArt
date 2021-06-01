import React, { useState, useEffect }  from 'react';
import { SafeAreaView } from 'react-native';
import { Text, Layout } from '@ui-kitten/components';
import styles from './styles';
import ImageTile from '../../components/ImageTile';
import TextBox from '../../components/TextBox';
import { useFirebaseContext } from '../../providers/firebaseProvider';

const UserImageDetailScreen = ({ route, navigation }) => {
  const { id, user, imageUrl } = route.params;
  const [descrip, setDescrip] = useState("");
  const firebase = useFirebaseContext();
  const db = firebase.firestore();
  useEffect(() => {
    if (!id) return;
    db.collection("social-feed")
      .doc(id)
      .get()
      .then(doc => {
        setDescrip(doc.get("description"))
      })
  }, [id])

  console.log(id);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Layout style={styles.layout}>
        <ImageTile
          imageUrl={imageUrl}
          disableOnPress={true}
          imgWidth={330}
          imgHeight={330}
        />
        <Text style={styles.textBoxTitle} category="h6">
          A peek into the creator's mind...
        </Text>
        <TextBox>
          {descrip}
        </TextBox>
      </Layout>
    </SafeAreaView>
  );
};

export default UserImageDetailScreen;
