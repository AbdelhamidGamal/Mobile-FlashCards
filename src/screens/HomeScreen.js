import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import { reciveData } from '../actions';
import { getDecks, RemoveData } from '../utils/api';
import { setLocalNotification } from '../utils/helpers';

function Home({ navigation, decks, dispatch }) {
  useEffect(() => {
    setLocalNotification();
    handleGetData();
  }, []);

  async function handleGetData() {
    const res = await getDecks();
    dispatch(reciveData(res));
  }

  const removeAllData = () => {
    RemoveData();
    dispatch(reciveData({}));
  };

  return (
    <ScrollView>
      <Text style={styles.title}>Deck List</Text>
      {Object.keys(decks).map((deck) => (
        <View style={styles.smallcard} key={deck}>
          <TouchableOpacity
            onPress={() => navigation.navigate('DeckScreen', { name: deck })}
          >
            <Text style={{ fontSize: 40 }}>{decks[deck].title}</Text>
          </TouchableOpacity>
          <Text>{`${
            decks[deck].questions ? decks[deck].questions.length : 0
          } cards`}</Text>
        </View>
      ))}
      {Object.keys(decks).length > 0 ? (
        <Button title='Clear Storage' onPress={removeAllData} />
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallcard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: 'red',
    fontStyle: 'italic',
  },
});

const mapStateToProps = (state) => {
  return {
    decks: state,
  };
};

export default connect(mapStateToProps)(Home);
