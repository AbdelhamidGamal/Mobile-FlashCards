import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Button } from 'react-native';
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
    <Animated.View style={{ opacity: fadeAnim }}>
      <Text>{deck.title}</Text>
      <Text>{deck.questions ? deck.questions.length : 0} cards</Text>

      <Button
        title='Add A Card'
        onPress={() =>
          navigation.navigate('NewCardScreen', { deck: deck.title })
        }
      />
      <Button
        title='Start Quiz'
        onPress={() => navigation.navigate('QuizScreen', { deck: deck.title })}
      />
    </Animated.View>
  );
}

function mapStateToProps(state, props) {
  return {
    deck: state[props.route.params.name],
  };
}

export default connect(mapStateToProps)(DeckScreen);
