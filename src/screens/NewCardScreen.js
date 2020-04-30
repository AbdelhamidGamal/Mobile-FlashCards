import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { saveCard } from '../utils/api';

function NewCardScreen({ dispatch, route, navigation }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  function submit() {
    if (!question || !answer) {
      return alert('Kindly Enter a Question and An Answer');
    }
    dispatch(addCard(route.params.deck, { question, answer }));
    saveCard(route.params.deck, { question, answer });
    setQuestion('');
    setAnswer('');
    navigation.pop();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Question</Text>
      <TextInput
        value={question}
        style={styles.input}
        onChangeText={(text) => setQuestion(text)}
      />
      <Text style={styles.text}>Answer</Text>
      <TextInput
        value={answer}
        style={styles.input}
        onChangeText={(text) => setAnswer(text)}
      />
      <View style={{ width: 150, marginTop: 20 }}>
        <Button title='Submit' onPress={submit} color='black' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 300,
    borderWidth: 2,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export default connect()(NewCardScreen);
