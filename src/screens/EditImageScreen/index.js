import { Text } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView } from "react-native";
import ImageTile from "../../components/ImageTile";
import { styles } from "./styles";
import { Button } from "@ui-kitten/components";
import { useFirebaseContext } from "../../providers/firebaseProvider";
import { useEffect } from "react";
import { DUMMY_EDITED_IMAGE, DUMMY_NAME } from "../../utils/mock";
import PhotoEditor from 'react-native-photo-editor';

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions'

const EditImageScreen = ({ navigation }) => {
  const firebase = useFirebaseContext();
  const db = firebase.firestore();

  useEffect(() => {

    let URI = downloadFile();
    console.log(URI)
    PhotoEditor.Edit({
      path: URI,
      onDone: () => {navigation.navigate("Social Gallery");},
      onCancel: () => {navigation.navigate("Museum Gallery");},
    })
  }, []);

  // Clear the test data on a refresh 
useEffect(() => {
    db.collection("social-feed").doc("test").update({
      images: firebase.firestore.FieldValue.arrayRemove(DUMMY_EDITED_IMAGE),
      names: firebase.firestore.FieldValue.arrayRemove(DUMMY_NAME)
    })
  }, [])
  
  // Upload test data
  const shareEdit = () => {
    db.collection("social-feed").doc("test").update({
      images: firebase.firestore.FieldValue.arrayUnion(DUMMY_EDITED_IMAGE),
      names: firebase.firestore.FieldValue.arrayUnion(DUMMY_NAME)
    })
    .then(() => {
      navigation.navigate("Social Gallery");
    })
    .catch(e => console.log(e))
  }
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.heading} category="h2">Put your own spin on the painting below! </Text>
      <ImageTile imageUrl={"https://images.metmuseum.org/CRDImages/ep/original/DP318843.jpg"}/>
      <Button style={styles.shareButton} onPress={shareEdit}> Share </Button>
    </SafeAreaView>
  )
}

let downloadFile = () => {
  const uri = "https://images.metmuseum.org/CRDImages/ep/original/DP318843.jpg"
  let fileUri = FileSystem.documentDirectory + "test.jpg";
  FileSystem.downloadAsync(uri, fileUri)
  .then(({ uri }) => {
      saveFile(uri);
    })
    .catch(error => {
      console.error(error);
    })
  return fileUri;
}

let saveFile = async (fileUri) => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri)
      await MediaLibrary.createAlbumAsync("Download", asset, false)
  }
}



export default EditImageScreen;