import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { saveDeck } from '../utils/api';

function NewDeck({ dispatch, navigation }) {
  const [name, setName] = useState('');

  function submit() {
    const deckTitle = name;
    if (!name) {
      return alert('Please Enter a Name!');
    }
    dispatch(addDeck(deckTitle));
    saveDeck(deckTitle);
    setName('');
    navigation.navigate('DeckScreen', { name: deckTitle });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is the title of your new deck?</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <View style={{ width: 150, marginTop: 30 }}>
        <Button title='Submit' onPress={submit} color='black' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 30,
    borderWidth: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
  btn: {
    margin: 10,
    color: 'blue',
    width: 100,
  },
});

export default connect()(NewDeck);
