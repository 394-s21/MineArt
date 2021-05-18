import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import styles from './styles';

const TextBox = ({ children }) => {
  return (
    <Layout style={styles.layout}>
      <Text>{children}</Text>
    </Layout>
  );
};

export default TextBox;
