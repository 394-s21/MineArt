import React from 'react';
import { SafeAreaView } from 'react-native';
import { Text, Layout } from '@ui-kitten/components';
import styles from './styles';
import ImageTile from '../../components/ImageTile';

const UserImageDetailScreen = ({ route, navigation }) => {
  const { user, imageUrl } = route.params;
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Layout style={styles.layout}>
        <ImageTile
          imageUrl={imageUrl}
          disableOnPress={true}
          imgWidth={'100%'}
          imgHeight={'80%'}
        />
      </Layout>
    </SafeAreaView>
  );
};

export default UserImageDetailScreen;
