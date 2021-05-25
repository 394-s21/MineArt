import React from "react";
import { SafeAreaView } from "react-native";
import { ImageEditor } from "@toast-ui/react-image-editor";
import { Button, Text } from "@ui-kitten/components";

import ImageTile from "../../components/ImageTile";
import { styles } from "./styles";

const WebEditImageScreen = ({ navigation }) => {
  const shareEdit = () => {
    console.log("share");
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.heading} category="h2">Put your own spin on the painting below! </Text>
      <ImageEditor usageStatistics={false} />
      {/* <ImageTile imageUrl={"https://images.metmuseum.org/CRDImages/ep/original/DP318843.jpg"}/> */}
      <Button style={styles.shareButton} onPress={shareEdit}> Share </Button>
    </SafeAreaView>
  )
}



export default WebEditImageScreen;