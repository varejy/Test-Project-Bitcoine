import { SET_PRICE } from '../types/types';

const setPrice = payload => ({
    type: SET_PRICE,
    payload
});

export default setPrice;
