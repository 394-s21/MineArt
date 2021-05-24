import { StyleSheet } from "react-native";

const cardWidth= 320;
const cardHeight= 320;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    cardContainer: {
      width: cardWidth,
      height: cardHeight,
    },
    card: {
      width: cardWidth,
      height: cardHeight,
      backgroundColor: '#FE474C',
      borderRadius: 7,
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.5,
      alignItems: "center",
      justifyContent: 'center',
      paddingHorizontal: 3
    },
    card1: {
      backgroundColor: '#FE474C',
    },
    card2: {
      backgroundColor: '#FEB12C',
    },
    label: {
      lineHeight: 50,
      textAlign: 'center',
      fontSize: 40,
      fontWeight:"bold",
      fontFamily: 'System',
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
    explanation: {
     
        textAlign: 'center',
        fontSize: 18,
        fontWeight:"bold",
        fontFamily: 'System',
        color: '#ffffff',
        backgroundColor: 'transparent',
        textShadowRadius: 2,
        textShadowColor: "#ff0000"
      },
    action: {
        paddingTop:"12%",
        textAlign: 'center',
        fontSize: 18,
        fontWeight:"bold",
        fontFamily: 'System',
        color: '#ffffff',
        backgroundColor: 'transparent',
        textShadowRadius: 2,
        textShadowColor: "#ff0000"
      },
    source: {
        position:"absolute",
        bottom:0, 
        fontSize:9,
        color: '#ffffff',
        backgroundColor: 'transparent',
        textAlign: 'center',
    }
  });

export default styles;