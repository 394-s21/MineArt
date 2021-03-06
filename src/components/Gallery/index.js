import React from 'react';
import { ScrollView } from 'react-native';
import { Text, Layout } from '@ui-kitten/components';
import ImageTile from '../../components/ImageTile';
import styles from './styles';

const Post = ({ id, imageUrl, name }) => {
  // this component is rendered for social gallery
  return (
    <Layout>
      <ImageTile testID="image-tile" id={id} imageUrl={imageUrl} navigateUserImageDetail={true} />
      <Text testID="creator-text" style={styles.createdByText}>Created by {name}</Text>
    </Layout>
  );
};

const Gallery = ({ imageUrls, names, keys }) => {
  // for museum gallery, displayName is false
  // for social gallery, displayName is true
  const displayName = names && names.length >= imageUrls.length;
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <Layout style={styles.imageWrapper}>
        {imageUrls &&
          imageUrls.map((imageUrl, i) => {
            return displayName ? (
              <Post
                key={imageUrl}
                id={keys[i]}
                imageUrl={imageUrl}
                name={names[i]}
              />
            ) : (
              <ImageTile testID="image-tile" key={imageUrl} id={keys[i]} imageUrl={imageUrl} />
            );
          })}
      </Layout>
    </ScrollView>
  );
};

export default Gallery;
