import { SET_BTC_STATE } from '../types/types';

const setBTCstate = payload => ({
    type: SET_BTC_STATE,
    payload
});

export default setBTCstate;
