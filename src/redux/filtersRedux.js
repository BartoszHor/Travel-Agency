/* SELECTORS */

export const getAllFilters = ({filters}) => filters;

/* ACTIONS */

// action name creator
const reducerName = 'filters';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const CHANGE_PHRASE = createActionName('CHANGE_PHRASE');
export const ADD_TAG = createActionName('ADD_TAG');
export const REMOVE_TAG = createActionName('REMOVE_TAG');
export const CHANGE_VALUE = createActionName('CHANGE_VALUE');

// action creators
export const changeSearchPhrase = payload => ({ payload, type: CHANGE_PHRASE });
export const addTag = payload => ({ payload, type: ADD_TAG });
export const removeTag = payload => ({ payload, type: REMOVE_TAG });
export const changeValue = payload => ({ payload, type: CHANGE_VALUE });

// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case CHANGE_PHRASE:
      return {
        ...statePart,
        searchPhrase: action.payload,
      };
    case ADD_TAG:
      return {
        ...statePart,
        tags: [...statePart.tags, action.payload],
      };
    case CHANGE_VALUE:{
      console.log(action.payload.from, action.payload.to);
      return {
        ...statePart,
        duration: action.payload,
      };
    }
    case REMOVE_TAG:
      return {
        ...statePart,
        tags: statePart.tags.filter(tag => tag != action.payload),
      };
    // TODO - handle other action types
    default:
      return statePart;
  }
}
