import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
  },
  header: {
    marginBottom: 10
  },
  contentWrapper: {
    marginVertical: 30,
    marginHorizontal: '20%'
  },
  profileImage: {
    borderRadius: 10,
    height: 140,
    width: 140,
    marginBottom: 10
  },
  section: {
    padding: 10
  },
  profileWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%'
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    padding: 15
  }
});

export default styles;
