import { AsyncStorage } from 'react-native';

const STORAGE_KEY = 'AbdoMobileFlashcards';

export const getDecks = async () => {
  try {
    const decks = await AsyncStorage.getItem(STORAGE_KEY);
    if (decks !== null) {
      return JSON.parse(decks);
    } else {
      return {};
    }
  } catch (e) {
    alert('Failed to fetch the data from storage', e);
  }
};

export const saveDeck = async (deckTitle) => {
  try {
    const decks = await getDecks();
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...decks, [deckTitle]: { title: deckTitle } })
    );
  } catch (e) {
    alert('Failed to save the data to the storage', e);
  }
};

export const saveCard = async (deck, card) => {
  try {
    const decks = await getDecks();

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...decks,
        [deck]: {
          title: deck,
          questions: decks[deck].questions
            ? [...decks[deck].questions, card]
            : [card],
        },
      })
    );
  } catch (e) {
    alert('Failed to add a new card to the storage!', e);
  }
};
