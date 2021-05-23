import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    card: {
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
  });

export default styles;