import React, { createRef, useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Button } from '@ui-kitten/components';
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import { useFirebaseContext } from '../../providers/firebaseProvider';
import { styles } from './styles';

const WebEditImageScreen = ({ route, navigation }) => {
  const firebase = useFirebaseContext();
  const storage = firebase.storage();
  const db = firebase.firestore();
  const { id } = route.params;
  const imageEditorRef = createRef();

  const shareEdit = () => {
    // get dataUrl using imageEditor API
    const imageEditor = imageEditorRef.current.getInstance();
    const dataUrl = imageEditor.toDataURL();
    const blobbed = dataURLtoBlob(dataUrl);
    // one way to get a unique id in javascript without using uuid
    const imageId = Date.now();
    // upload what's currently on canvas to firebase storage as a BLOB
    storage
      .ref('test')
      .child(`social-feed/${imageId}.jpeg`)
      .put(blobbed)
      .then((snapshot) => {
        // once data is uploaded to storage, store information to firestore social-feed collection
        const newFileData = {
          artist: '',
          creatorName: 'Jeff Y.',
          description: 'This is a great piece of art',
          id: id,
          image: `test/social-feed/${imageId}.jpeg`,
          original: '',
          title: ''
        };

        db.collection('social-feed').add(newFileData);
      });
  };

  // function to convert dataURL to BLOB object
  const dataURLtoBlob = (dataUrl) => {
    let arr = dataUrl.split(','),
      // always fix mimetype to image/jpeg
      mime = 'image/jpeg',
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  useLayoutEffect(() => {
    const imageEditor = imageEditorRef.current.getInstance();

    db.collection('museum-gallery')
      .doc(id)
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          let data = doc.data();
          let url = await storage.ref(data.image).getDownloadURL();
          // Can replace with our own images if we configure CORS access in Firebase
          imageEditor.loadImageFromURL(
            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/400px-Monet_-_Impression%2C_Sunrise.jpg',
            `artwork ${id}`
          );
        }
      });
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      {/* <Text style={styles.heading} category="h2">Put your own spin on the painting below! </Text> */}
      <ImageEditor
        ref={imageEditorRef}
        includeUI={{
          loadImage: {
            path:
              'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            name: 'blank'
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
            height: '1000px'
          },
          menuBarPosition: 'bottom'
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70
        }}
        usageStatistics={true}
      />

      <Button style={styles.shareButton} onPress={shareEdit}>
        {' '}
        Share{' '}
      </Button>
    </SafeAreaView>
  );
};

export default WebEditImageScreen;
