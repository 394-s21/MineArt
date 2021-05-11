import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { SafeAreaView } from 'react-native';
import Gallery from "../../components/Gallery";
import { useFirebaseContext } from "../../providers/firebaseProvider";
import styles from "./styles";

const SocialGalleryScreen = () => {
  const firebase = useFirebaseContext();
  const db = firebase.firestore();
  const [images, setImages] = useState([]);
  const [names, setNames] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection("social-feed").doc("test")
      .onSnapshot((doc) => {
        setImages(doc.get("images"))
        setNames(doc.get("names"))
      })
      return () => unsubscribe();
  }, [])
  return (
    <SafeAreaView style={styles.layout}>
      <Gallery imageUrls={images} names={names}/>
    </SafeAreaView>
  );
};

export default SocialGalleryScreen;
