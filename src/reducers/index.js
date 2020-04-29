import { RECIVE_DATA, ADD_DECK, ADD_CARD } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case RECIVE_DATA:
      return { ...state, ...action.payload };
    case ADD_DECK:
      return { ...state, [action.payload]: { title: action.payload } };
    case ADD_CARD:
      return {
        ...state,
        [action.payload.deck]: {
          title: action.payload.deck,
          questions: state[action.payload.deck].questions
            ? [...state[action.payload.deck].questions, action.payload.card]
            : [action.payload.card],
        },
      };
    default:
      return state;
  }
}
