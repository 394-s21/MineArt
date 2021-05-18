import React from 'react';
import { SafeAreaView } from 'react-native';
import { Text, Layout } from '@ui-kitten/components';
import styles from './styles';
import ImageTile from '../../components/ImageTile';
import TextBox from '../../components/TextBox';

const UserImageDetailScreen = ({ route, navigation }) => {
  const { user, imageUrl } = route.params;
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Layout style={styles.layout}>
        <ImageTile
          imageUrl={imageUrl}
          disableOnPress={true}
          imgWidth={330}
          imgHeight={330}
        />
        <Text style={styles.textBoxTitle} category="h6">
          A peek into the creator's mind...
        </Text>
        <TextBox>
          I created this modified version, wondering what visual effects
          changing the background would have on the overall image. The
          background color has a very significant effect on the feeling of this
          artpiece.
        </TextBox>
      </Layout>
    </SafeAreaView>
  );
};

export default UserImageDetailScreen;
