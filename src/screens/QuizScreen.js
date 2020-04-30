import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

function QuizScreen({ deck, navigation }) {
  const [questions, setQuestions] = useState([]);
  const [viewQuestion, setviewQuestion] = useState(true);
  const [Score, setScore] = useState(0);

  useEffect(() => {
    setQuestions(deck.questions);
    clearLocalNotification().then(setLocalNotification);
  }, []);

  if (!deck.questions) {
    return <Text> There's No Questions in this Deck</Text>;
  }

  return (
    <View style={styles.takeFullSpace}>
      {questions.length === 0 ? (
        <View>
          <Text>Your score is {(Score / deck.questions.length) * 100} % </Text>
          <Button
            title='Restart Quiz!'
            onPress={() => {
              setScore(0);
              setviewQuestion(true);
              setQuestions(deck.questions);
              navigation.navigate('QuizScreen', { deck: deck.title });
            }}
          />
          <Button
            title='Go Back To Deck View'
            onPress={() =>
              navigation.navigate('DeckScreen', { name: deck.title })
            }
          />
        </View>
      ) : (
        <View style={styles.takeFullSpace}>
          <Text
            style={styles.counter}
          >{`${questions.length} / ${deck.questions.length} `}</Text>
          <View style={styles.innerContainer}>
            <View>
              {viewQuestion ? (
                <View>
                  <Text style={styles.questionText}>
                    {questions[0].question}
                  </Text>

                  <TouchableOpacity
                    onPress={() => setviewQuestion(!viewQuestion)}
                  >
                    <Text style={{ textAlign: 'center' }}>view Answer</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Text style={styles.questionText}>{questions[0].answer}</Text>
                  <TouchableOpacity
                    onPress={() => setviewQuestion(!viewQuestion)}
                  >
                    <Text>view Question</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={{ width: 150 }}>
              <Button
                title='Correct!'
                color='green'
                onPress={() => {
                  setScore(Score + 1);
                  setviewQuestion(true);
                  setQuestions(questions.slice(1));
                }}
              />
              <View style={{ margin: 5 }} />
              <Button
                color='red'
                title='Incorrect!'
                onPress={() => {
                  setviewQuestion(true);
                  setQuestions(questions.slice(1));
                }}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  takeFullSpace: {
    flex: 1,
  },
  counter: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  questionText: {
    textAlign: 'center',
    fontSize: 45,
  },
});

function mapStateToProps(state, props) {
  return {
    deck: state[props.route.params.deck],
  };
}

export default connect(mapStateToProps)(QuizScreen);
