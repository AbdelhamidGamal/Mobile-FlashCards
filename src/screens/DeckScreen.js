import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Button,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

function DeckScreen({ deck, navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeIn();
  }, []);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
    }).start();
  };

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.smallText}>
          {deck.questions ? deck.questions.length : 0} cards
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('NewCardScreen', { deck: deck.title })
          }
        >
          <Text style={styles.btn}>Add A Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('QuizScreen', { deck: deck.title })
          }
        >
          <Text style={styles.btn2}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  smallText: {
    fontSize: 20,
    color: 'gray',
    marginBottom: 100,
  },
  btn: {
    margin: 5,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 2,
    width: 150,
    textAlign: 'center',
  },

  btn2: {
    margin: 5,
    backgroundColor: 'black',
    color: 'white',
    padding: 10,
    borderRadius: 2,
    width: 150,
    textAlign: 'center',
  },
});

function mapStateToProps(state, props) {
  return {
    deck: state[props.route.params.name],
  };
}

export default connect(mapStateToProps)(DeckScreen);
