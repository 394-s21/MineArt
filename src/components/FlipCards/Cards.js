import React, { useRef, useEffect, useState, Component } from "react";
import { SafeAreaView, View, Animated, Dimensions, TouchableOpacity, StatusBar, Text } from 'react-native';
import CardFlip from "react-native-card-flip";
import styles from "./styles";

//ref={(card) => (this.card = card)}

const Cards = (props) => {

    const flipcard = useRef()

      return (
        <View style={styles.flipContainer}>
        <CardFlip style={styles.cardContainer} ref={flipcard}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.card, styles.card1]}
            onPress={() => flipcard.current.flip()}>
            <Text style={styles.label}>AB</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.card, styles.card2]}
            onPress={() => flipcard.current.flip()}>
            <Text style={styles.label}>CD</Text>
          </TouchableOpacity>
        </CardFlip>
      </View>
    );}

export default Cards;