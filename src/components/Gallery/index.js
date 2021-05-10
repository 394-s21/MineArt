import React from "react";
import { ScrollView  } from "react-native";
import { Text, Layout } from "@ui-kitten/components";
import ImageTile from "../../components/ImageTile";
import styles from "./styles";

const Post = ({imageUrl, name}) => {
  return (
    <Layout>
      <ImageTile imageUrl={imageUrl}/>
      <Text style={styles.createdByText}>Created by {name}</Text>
    </Layout>
  );
};

const Gallery = ({imageUrls, names}) => {
  const displayName = names && names.length >= imageUrls.length;

  return (
    <ScrollView style={styles.scrollView}>
      <Layout style={styles.imageWrapper}>
          {imageUrls.map((imageUrl, i) => {
            return (
              displayName ? 
                <Post key={imageUrl} imageUrl={imageUrl} name={names[i]} /> :
                <ImageTile key={imageUrl} imageUrl={imageUrl}/>
            );
          })}
      </Layout>
    </ScrollView>
  );
};

export default Gallery;
