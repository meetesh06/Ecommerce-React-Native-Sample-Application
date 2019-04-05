import { combineReducers } from 'redux';

const INITIAL_STATE = {

};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      new_data = {...state}
      new_data[action.payload._id] = action.payload;
      return { ...new_data }
    case 'REMOVE_ITEM':
      new_data = {...state}
      delete new_data[action.payload];
      return { ...new_data }
    case 'COMPLETE_PAYMENT':
      return { }
    case 'LOGOUT':
      return { }
    default:
      return state
  }
};

export default combineReducers({
  cart: cartReducer,
});