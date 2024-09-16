import { combineReducers } from 'redux';
import { SET_BALANCE, SET_TRANSACTIONS } from './actions';

const balanceReducer = (state = 0, action: any) => {
    switch (action.type) {
        case SET_BALANCE:
            return action.payload;
        default:
            return state;
    }
};

const transactionsReducer = (state = [], action: any) => {
    switch (action.type) {
        case SET_TRANSACTIONS:
            return action.payload;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    balance: balanceReducer,
    transactions: transactionsReducer,
});

export default rootReducer;
