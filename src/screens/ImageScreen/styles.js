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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  cardContainer: {
    width: 320,
    height: 470,
  },
  baraja: {
    width: 320,
    height: 470,
    backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
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
