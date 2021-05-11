import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height:"100%", 
  },
  layout: {
    flex: 1,
    marginTop: '5%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    height:"100%"
  }, 
  buttonWrapper: {
    flex:1,
    flexDirection: "row-reverse"
  },
  button: {
    marginTop: 25,
    width: 100,
  }
});

export default styles;
