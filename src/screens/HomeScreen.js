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
      {Object.keys(decks).map((deck) => (
        <View style={styles.smallcard} key={deck}>
          <TouchableOpacity
            onPress={() => navigation.navigate('DeckScreen', { name: deck })}
          >
            <Text style={styles.titles}>{decks[deck].title}</Text>
          </TouchableOpacity>
          <Text style={styles.smallText}>{`${
            decks[deck].questions ? decks[deck].questions.length : 0
          } cards`}</Text>
        </View>
      ))}
      {Object.keys(decks).length > 0 ? (
        <Button color='gray' title='Clear Storage' onPress={removeAllData} />
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
    borderBottomWidth: 2,
    padding: 10,
    paddingBottom: 20,
    margin: 10,
  },
  titles: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 15,
    color: 'gray',
  },
});

const mapStateToProps = (state) => {
  return {
    decks: state,
  };
};

export default connect(mapStateToProps)(Home);
