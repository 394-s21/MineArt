import PhotoEditor from 'react-native-photo-editor';
import * as FileSystem from 'expo-file-system';

export const ImageEditor = (id, imageUrl) => {
    // download the file
    let fileUri = FileSystem.documentDirectory + `${id}.jpg`;
    FileSystem.downloadAsync(imageUrl, fileUri)
        .then((download) => {
            PhotoEditor.Edit({
                path: download.uri,
                onDone: () => {},
            })  
        })
        .catch(e => {
            console.error(e);
        })           
}

export default ImageEditor;