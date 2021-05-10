import React from "react";
import { ScrollView  } from "react-native";
import { Layout } from "@ui-kitten/components";
import ImageTile from "../../components/ImageTile";
import styles from "./styles";

const Gallery = ({imageUrls}) => {
  return (
    <ScrollView style={styles.scrollView}>
      <Layout style={styles.imageWrapper}>
          {imageUrls.map((url) => {
            return <ImageTile key={url} imageUrl={url}/>;
          })}
      </Layout>
    </ScrollView>
  );
};

export default Gallery;
