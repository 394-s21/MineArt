import React, { useRef, useEffect, useState, Component } from "react";
import { SafeAreaView, View, Animated, Dimensions, TouchableOpacity, StatusBar, Text } from 'react-native';
import CardFlip from "react-native-card-flip";
import styles from "./styles";

const Card = (props) => {
    const flipcard = useRef()
      return (
        <View style={styles.flipContainer}>
        <CardFlip style={styles.cardContainer} ref={flipcard}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.card, styles.card1]}
            onPress={() => flipcard.current.flip()}>
            <Text style={styles.label}>{props.question}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.card, styles.card2]}
            onPress={() => flipcard.current.flip()}>
            <Text style={styles.explanation}>{props.explanation}</Text>
            <Text style={styles.action}>{props.action}</Text>
            <Text style={styles.source}>{props.source}</Text>
          </TouchableOpacity>
        </CardFlip>
      </View>
    );}

export default Card;