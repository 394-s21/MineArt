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
  buttonsWrapper: {
    flexDirection: "row",
    justifyContent:"center"
  },
  button: {
    marginVertical: 25,
    marginHorizontal: 15
  }
});

export default styles;
