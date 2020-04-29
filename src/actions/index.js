export const RECIVE_DATA = 'RECIVE_DATA';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

export function reciveData(data) {
  return {
    type: RECIVE_DATA,
    payload: data,
  };
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    payload: title,
  };
}

export function addCard(deck, card) {
  return {
    type: ADD_CARD,
    payload: { deck, card },
  };
}
