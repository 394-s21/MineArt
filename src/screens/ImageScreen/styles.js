import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // container: {
  //   height:"100%",
  //   flex:1 
  // },
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    minWidth:"100%"
  },
  cardContainer: {
    flex:1,
    flexDirection:"row",
    width: "100%",
    height: "100%",
    justifyContent:"center"
  },
  indCard: {
    margin:'2%',
  },
  flipContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  card1: {
    backgroundColor: '#FE474C',
  },
  card2: {
    backgroundColor: '#FEB12C',
  },
  label: {
    lineHeight: 470,
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  frontStyle: {
    width: 300,
    height: 500,
    backgroundColor: '#f00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  backStyle: {
    width: 300,
    height: 500,
    backgroundColor: '#f0f',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  }
  
});

export default styles;
