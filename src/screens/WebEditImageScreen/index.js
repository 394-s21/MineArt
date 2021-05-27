import React, { createRef, useLayoutEffect } from "react";
import { SafeAreaView } from "react-native";
import { Button, } from "@ui-kitten/components";
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import { useFirebaseContext } from '../../providers/firebaseProvider';
import { styles } from "./styles";

const WebEditImageScreen = ({ route, navigation }) => {
  const firebase = useFirebaseContext();
  const storage = firebase.storage();
  const db = firebase.firestore();
  const { id } = route.params;
  const imageEditorRef = createRef();

  const shareEdit = () => {
    const imageEditor = imageEditorRef.current.getInstance();
    const editedImageBase64 = imageEditor.toDataURL();
  }

  useLayoutEffect(() => {
    const imageEditor = imageEditorRef.current.getInstance();

    db.collection("museum-gallery").doc(id)
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          let data = doc.data();
          let url = await storage.ref(data.image).getDownloadURL();
          // Can replace with our own images if we configure CORS access in Firebase
          imageEditor.loadImageFromURL(
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/400px-Monet_-_Impression%2C_Sunrise.jpg",
            `artwork ${id}`
          );
        }
      })
  }, [])

  return (
    <SafeAreaView style={styles.root}>
      {/* <Text style={styles.heading} category="h2">Put your own spin on the painting below! </Text> */}
      <ImageEditor
        ref={imageEditorRef}
        includeUI={{
          loadImage: {
            path: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            name: 'blank',
          },
          menu: [
            'crop',
            'flip',
            'rotate',
            'draw',
            'shape',
            'icon',
            'text',
            'mask',
            'filter'
          ],
          initMenu: 'draw',
          uiSize: {
            width: '1000px',
            height: '1000px',
          },
          menuBarPosition: 'bottom',
        }}

        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={true}
      />

      <Button style={styles.shareButton} onPress={shareEdit}> Share </Button>
    </SafeAreaView>
  )
}

export default WebEditImageScreen;