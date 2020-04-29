import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';

function QuizScreen({ deck, navigation }) {
  const [questions, setQuestions] = useState([]);
  const [viewQuestion, setviewQuestion] = useState(true);
  const [Score, setScore] = useState(0);

  useEffect(() => {
    setQuestions(deck.questions);
  }, []);

  if (!deck.questions) {
    return <Text> There's No Questions in this Deck</Text>;
  }

  return (
    <View>
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
        <View>
          <Text>{`${questions.length} of ${deck.questions.length} Remaining!`}</Text>
          {viewQuestion ? (
            <View>
              <Text>{questions[0].question}</Text>
              <Button
                title='view Answer'
                onPress={() => setviewQuestion(!viewQuestion)}
              />
            </View>
          ) : (
            <View>
              <Text>{questions[0].answer}</Text>
              <Button
                title='view Question'
                onPress={() => setviewQuestion(!viewQuestion)}
              />
            </View>
          )}
          <Button
            title='Correct!'
            onPress={() => {
              setScore(Score + 1);
              setviewQuestion(true);
              setQuestions(questions.slice(1));
            }}
          />
          <Button
            title='Incorrect!'
            onPress={() => {
              setviewQuestion(true);
              setQuestions(questions.slice(1));
            }}
          />
        </View>
      )}
    </View>
  );
}

function mapStateToProps(state, props) {
  return {
    deck: state[props.route.params.deck],
  };
}

export default connect(mapStateToProps)(QuizScreen);
