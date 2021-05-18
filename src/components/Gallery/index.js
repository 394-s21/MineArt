import React from 'react';
import { ScrollView } from 'react-native';
import { Text, Layout } from '@ui-kitten/components';
import ImageTile from '../../components/ImageTile';
import styles from './styles';

const Post = ({ imageUrl, name }) => {
  // this component is rendered for social gallery
  return (
    <Layout>
      <ImageTile imageUrl={imageUrl} navigateUserImageDetail={true} />
      <Text style={styles.createdByText}>Created by {name}</Text>
    </Layout>
  );
};

const Gallery = ({ imageUrls, names }) => {
  // for museum gallery, displayName is false
  // for social gallery, displayName is true
  const displayName = names && names.length >= imageUrls.length;

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <Layout style={styles.imageWrapper}>
        {imageUrls.map((imageUrl, i) => {
          return displayName ? (
            <Post key={imageUrl} imageUrl={imageUrl} name={names[i]} />
          ) : (
            <ImageTile key={imageUrl} imageUrl={imageUrl} />
          );
        })}
      </Layout>
    </ScrollView>
  );
};

export default Gallery;
