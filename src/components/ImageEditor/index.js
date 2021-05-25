import React from "react";
import PhotoEditor from 'react-native-photo-editor';

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions'

export const Editor = ({id, imageURL}) => {
    let downloadFile = () => {
        let fileUri = FileSystem.documentDirectory + "";
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
      
      PhotoEditor.Edit({
        path: URI,
        onDone: () => {navigation.navigate("Social Gallery");},
        onCancel: () => {navigation.navigate("Museum Gallery");},
      })

    return <></>;
}

PhotoEditor.Edit({
    path: URI,
    onDone: () => {navigation.navigate("Social Gallery");},
    onCancel: () => {navigation.navigate("Museum Gallery");},
  })