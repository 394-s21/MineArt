import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'white'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  heading: {
    marginVertical: 30,
    textAlign: 'center'
  },
  shareButton: {
    marginTop: 20,
    marginBottom: 20
  }
});
