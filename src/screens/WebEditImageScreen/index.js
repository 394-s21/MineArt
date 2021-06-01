import React, { createRef, useLayoutEffect, useState, useEffect } from 'react';
import { SafeAreaView, Dimensions } from 'react-native';
import { Button, Card, Input, Text, Modal, Spinner, Layout } from '@ui-kitten/components';
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import { useFirebaseContext } from '../../providers/firebaseProvider';
import { styles } from './styles';
import {v4 as uuidv4} from 'uuid';

const WebEditImageScreen = ({ route, navigation }) => {
  const firebase = useFirebaseContext();
  const storage = firebase.storage();
  const db = firebase.firestore();
  const { id, pieceURL } = route.params;
  const imageEditorRef = createRef();
  
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [dims, setDims] = useState({width: Dimensions.get('window').width, height: Dimensions.get('window').height });
  // const onChange = ({ window }) => {
  //   console.log(window);
  //   setDims({
  //     width: window.width,
  //     height: dims.height,
  //   });
  // };

  // useEffect(() => {
  //   Dimensions.addEventListener('change', onChange);
  //   return () => {
  //     Dimensions.removeEventListener('change', onChange);
  //   };
  // }, []);

  const shareEdit = async () => {
    setIsLoading(true);
    setShowModal(false);
    // get dataUrl using imageEditor API
    const imageEditor = imageEditorRef.current.getInstance();
    const dataUrl = imageEditor.toDataURL();
    const blobbed = dataURLtoBlob(dataUrl);
    // one way to get a unique id in javascript without using uuid
    const imageId = Date.now();
    // upload what's currently on canvas to firebase storage as a BLOB

    let uuid = uuidv4();
    // once data is uploaded to storage, store information to firestore social-feed collection
    const newFileData = {
      artist: '',
      creatorName: nameValue,
      description: descriptionValue,
      id: uuid,
      image: `test/social-feed/${imageId}.jpg`,
      original: id,
      title: '',
      date: firebase.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('social-feed').doc(uuid).set(newFileData)
    await storage
        .ref('test')
        .child(`social-feed/${imageId}.jpg`)
        .put(blobbed)

      await db.collection('museum-gallery').doc(id)
        .update({modifications: firebase.firestore.FieldValue.arrayUnion(uuid)})

      setIsLoading(false);
      navigation.navigate('Social Gallery', {id: id});
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

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useLayoutEffect(() => {
    if (!isLoading) {
      const wait = async () => {
        const imageEditor = imageEditorRef.current.getInstance();
        while (imageEditor._invoker._isLocked) {
          await sleep(100);
        }
        imageEditor.loadImageFromURL(pieceURL, `artwork ${id}`);
      }
      wait();
    }
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      {isLoading && (
        <Layout style={styles.loadingBackground}>
          <Spinner  />
          <Text style={styles.spinnerText}>Please wait, uploading image...</Text>
        </ Layout>
      )}
      {!isLoading && (
        <>
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
                width: `${dims.width}px`,
                height: `${dims.height}px`
              },
              menuBarPosition: 'bottom'
            }}
            cssMaxHeight={dims.height * 0.6}
            cssMaxWidth={dims.width}
            selectionStyle={{
              cornerSize: 20,
              rotatingPointOffset: 70
            }}
            usageStatistics={true}
          />

          <Button style={styles.shareButton} onPress={() => {setShowModal(true);}}>
            {' '}
            Share{' '}
          </Button>
        </>
      )}
      {showModal && (
        <Modal
        visible={showModal}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => {setShowModal(false);}}
        >
          <Card disabled={true}>
            <Text
              style={{ fontSize: 18, marginBottom: 30, alignSelf: "center" }}
            >
              Share your creation
            </Text>
            <Input
              style={{ marginBottom: 20 }}
              onChangeText={(nextValue) => {
                setNameValue(nextValue);
              }}
              label="Creator name"
            />
            <Input
              style={{ marginBottom: 20 }}
              onChangeText={(nextValue) => {
                setDescriptionValue(nextValue);
              }}
              label="Thoughts or commentary"
              multiline={true}
            />
            <Button style={styles.joinButtonStyle} onPress={shareEdit}>
              Share
            </Button>
          </Card>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default WebEditImageScreen;
