import { Text } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView } from "react-native";
import ImageTile from "../../components/ImageTile";
import { styles } from "./styles";
import { Button } from "@ui-kitten/components";
import { useFirebaseContext } from "../../providers/firebaseProvider";
import { useEffect } from "react";
import { DUMMY_EDITED_IMAGE, DUMMY_NAME } from "../../utils/mock";

const EditImageScreen = ({ navigation }) => {
  const firebase = useFirebaseContext();
  const db = firebase.firestore();


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
      <Text style={styles.heading} category="h2"> Edit the painting of the week below! </Text>
      <ImageTile imageUrl={"https://images.metmuseum.org/CRDImages/ep/original/DP318843.jpg"}/>
      <Button onPress={shareEdit}> Share </Button>
    </SafeAreaView>
  )
}

export default EditImageScreen;