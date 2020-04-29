import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { saveDeck } from '../utils/api';

function NewDeck({ dispatch, navigation }) {
  const [name, setName] = useState('');

  function submit() {
    if (!name) {
      return alert('Please Enter a Name!');
    }
    dispatch(addDeck(name));
    saveDeck(name);

    navigation.navigate('DeckScreen', { name });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deck Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Button title='Submit' onPress={submit} />
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
    height: 40,
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  },
  btn: {
    margin: 10,
    color: 'blue',
    width: 100,
  },
});

export default connect()(NewDeck);
