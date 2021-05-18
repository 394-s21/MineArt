import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  layout: {
    flex: 1
  },
  imageWrapper: {
    flex: 1,
    //marginTop: '5%',
    marginBottom: '5%',
    marginLeft: '15%',
    marginRight: '15%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  scrollView: {
    backgroundColor: 'white',
    flex: 1,
    height: '100%'
  },
  createdByText: {
    marginBottom: 10,
    color: '#7d7d7d',
    fontSize: 14,
    fontWeight: '300',
    alignSelf: 'center'
  }
});

export default styles;
